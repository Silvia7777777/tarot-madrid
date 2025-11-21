import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { STRIPE_PRICES } from "@/constants/stripeConfig";

/**
 * Custom hook for Stripe checkout session management
 */

interface CheckoutData {
  name: string;
  email: string;
  sessionType: string;
  selectedDate: Date;
  selectedTime: string;
}

export const useStripeCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const createCheckoutSession = async (data: CheckoutData) => {
    try {
      setIsProcessing(true);

      const priceId = STRIPE_PRICES[data.sessionType as keyof typeof STRIPE_PRICES];
      const appointmentDateTime = `${format(data.selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las ${data.selectedTime}`;

      const { data: responseData, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: priceId,
          customerEmail: data.email,
          customerName: data.name,
          metadata: {
            sessionType: data.sessionType,
            appointmentDate: format(data.selectedDate, "yyyy-MM-dd"),
            appointmentTime: data.selectedTime,
            appointmentDateTime: appointmentDateTime,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!responseData?.url) {
        throw new Error('No se recibió URL de Stripe');
      }

      // Redirect to Stripe Checkout
      window.location.href = responseData.url;

    } catch (error) {
      toast({
        title: "Error en el pago",
        description: "No pudimos procesar tu reserva. Por favor intenta de nuevo.",
        variant: "destructive",
      });
      setIsProcessing(false);
      throw error;
    }
  };

  return {
    createCheckoutSession,
    isProcessing,
  };
};
