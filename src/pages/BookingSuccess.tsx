import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="p-12 text-center bg-card/50 backdrop-blur border-border/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-accent mx-auto" />
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            ¡Reserva Confirmada! ✨
          </h1>
          
          <p className="text-muted-foreground text-lg font-body mb-8">
            Tu pago ha sido procesado exitosamente. Recibirás un email de confirmación 
            con los detalles de tu sesión de tarot.
          </p>
          
          <div className="bg-accent/10 rounded-lg p-6 mb-8">
            <p className="text-secondary font-body">
              Te contactaremos en las próximas 24 horas para confirmar 
              la fecha y hora de tu lectura.
            </p>
          </div>
          
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[var(--glow-gold)]"
          >
            <Sparkles className="mr-2 w-4 h-4" />
            Volver al inicio
          </Button>
          
          {sessionId && (
            <p className="text-xs text-muted-foreground mt-4 font-body">
              ID de sesión: {sessionId}
            </p>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
