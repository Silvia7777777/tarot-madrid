import { motion } from "framer-motion";
import { Mail, User, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import SaturdayTimePicker from "@/components/SaturdayTimePicker";
import { SESSION_OPTIONS } from "@/constants/sessionOptions";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";

const BookingForm = () => {
  const { formData, updateFormData, validateForm } = useBookingForm();
  const { createCheckoutSession, isProcessing } = useStripeCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    await createCheckoutSession({
      name: formData.name,
      email: formData.email,
      sessionType: formData.sessionType,
      selectedDate: formData.selectedDate!,
      selectedTime: formData.selectedTime,
    });
  };

  return (
    <section id="booking" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-background" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-accent" />
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
              Reserva tu Sesión
            </h2>
            <p className="text-muted-foreground text-lg font-body">
              Comienza tu viaje de transformación y autodescubrimiento
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-secondary font-body">
                  <User className="inline w-4 h-4 mr-2" />
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-secondary font-body">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-secondary font-body text-base">
                  Tipo de sesión
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SESSION_OPTIONS.map((session) => (
                    <motion.div
                      key={session.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.sessionType === session.id
                          ? "border-accent bg-accent/10 shadow-[var(--glow-gold)]"
                          : "border-border/50 hover:border-accent/50 hover:bg-accent/5"
                      }`}
                      onClick={() => updateFormData("sessionType", session.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <session.icon className="w-10 h-10 text-accent mb-3" />
                          <h3 className="text-xl font-semibold text-secondary mb-1">
                            {session.title}
                          </h3>
                          <p className="text-muted-foreground text-sm font-body">
                            {session.description}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-3xl font-bold text-accent mb-2">
                            {session.price}
                          </p>
                          {formData.sessionType === session.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <CheckCircle className="w-6 h-6 text-accent" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <SaturdayTimePicker
                selectedDate={formData.selectedDate}
                selectedTime={formData.selectedTime}
                onDateChange={(date) => updateFormData("selectedDate", date || null)}
                onTimeChange={(time) => updateFormData("selectedTime", time)}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[var(--glow-gold)] transition-all duration-300 hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Reservar y Pagar
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center font-body">
                Al reservar, serás redirigido a un pago seguro con Stripe
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
