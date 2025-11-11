import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Función para crear JWT para Google Calendar API
async function createJWT(serviceAccountEmail: string, privateKey: string): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encoder = new TextEncoder();
  const base64Header = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const base64Payload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const unsignedToken = `${base64Header}.${base64Payload}`;

  // Limpiar la clave privada
  const cleanedKey = privateKey
    .replace(/\\n/g, '\n')
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');

  const binaryKey = Uint8Array.from(atob(cleanedKey), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(unsignedToken)
  );

  const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${unsignedToken}.${base64Signature}`;
}

// Función para obtener access token de Google
async function getAccessToken(serviceAccountEmail: string, privateKey: string): Promise<string> {
  const jwt = await createJWT(serviceAccountEmail, privateKey);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json();
  return data.access_token;
}

// Función para crear evento en Google Calendar
async function createCalendarEvent(
  customerEmail: string,
  customerName: string,
  sessionType: string,
  appointmentDate: string,
  appointmentTime: string
) {
  console.log('Creating calendar event for:', { customerEmail, customerName, sessionType, appointmentDate, appointmentTime });

  const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');
  const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID');

  if (!serviceAccountEmail || !privateKey || !calendarId) {
    throw new Error('Missing Google Calendar credentials');
  }

  // Obtener access token
  const accessToken = await getAccessToken(serviceAccountEmail, privateKey);

  // Parsear la fecha y hora
  const [year, month, day] = appointmentDate.split('-').map(Number);
  const [hours, minutes] = appointmentTime.includes('PM')
    ? [appointmentTime === '12:00 PM' ? 12 : parseInt(appointmentTime) + 12, 0]
    : [appointmentTime === '12:00 AM' ? 0 : parseInt(appointmentTime), 0];

  const startDateTime = new Date(Date.UTC(year, month - 1, day, hours - 2, minutes)); // -2 para convertir a UTC desde Europe/Madrid
  const durationMinutes = sessionType === '30-min' ? 30 : 50;
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

  // Crear el evento
  const event = {
    summary: `🔮 Lectura de Tarot - ${customerName}`,
    description: `Tipo de sesión: ${sessionType === '30-min' ? '30 minutos (Lectura enfocada)' : '50 minutos (Lectura profunda)'}\n\nCliente: ${customerName}\nEmail: ${customerEmail}\n\nPago confirmado ✅`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/Madrid',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/Madrid',
    },
    attendees: [
      { email: customerEmail }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 día antes
        { method: 'popup', minutes: 60 }, // 1 hora antes
      ],
    },
  };

  console.log('Event to create:', event);

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google Calendar API error:', errorText);
    throw new Error(`Failed to create calendar event: ${errorText}`);
  }

  const createdEvent = await response.json();
  console.log('Calendar event created successfully:', createdEvent.id);
  return createdEvent;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!signature || !webhookSecret) {
      console.error('Missing signature or webhook secret');
      return new Response('Missing signature', { status: 400, headers: corsHeaders });
    }

    const body = await req.text();
    
    // Verificar la firma del webhook
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400, headers: corsHeaders });
    }

    console.log('Webhook event received:', event.type);

    // Procesar el evento de checkout completado
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Processing checkout session:', session.id);
      console.log('Customer email:', session.customer_email);
      console.log('Metadata:', session.metadata);

      // Extraer información de la reserva del metadata
      const { sessionType, appointmentDate, appointmentTime } = session.metadata || {};
      const customerEmail = session.customer_email || session.customer_details?.email;
      const customerName = session.metadata?.customerName || session.customer_details?.name;

      if (!customerEmail || !customerName || !sessionType || !appointmentDate || !appointmentTime) {
        console.error('Missing required data in session metadata');
        return new Response('Missing required data', { status: 400, headers: corsHeaders });
      }

      // Crear evento en Google Calendar
      try {
        await createCalendarEvent(
          customerEmail,
          customerName,
          sessionType,
          appointmentDate,
          appointmentTime
        );
        console.log('Calendar event created successfully for session:', session.id);
      } catch (calendarError) {
        console.error('Error creating calendar event:', calendarError);
        // No fallar el webhook si falla Calendar, pero loguearlo
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
