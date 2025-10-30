import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sessionType: "",
    preferredDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.sessionType || !formData.preferredDate) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with Stripe
    toast({
      title: "¡Reserva recibida! ✨",
      description: "Te contactaremos pronto para confirmar tu sesión",
    });

    // Reset form
    setFormData({ name: "", email: "", sessionType: "", preferredDate: "" });
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionType" className="text-secondary font-body">
                  Tipo de sesión
                </Label>
                <Select
                  value={formData.sessionType}
                  onValueChange={(value) => setFormData({ ...formData, sessionType: value })}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-card">Lectura 1 Carta - €20</SelectItem>
                    <SelectItem value="3-cards">Lectura 3 Cartas - €45</SelectItem>
                    <SelectItem value="full-reading">Lectura Completa - €85</SelectItem>
                    <SelectItem value="healing">Sanación Energética - €100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-secondary font-body">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Fecha preferida
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-accent transition-colors"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[var(--glow-gold)] transition-all duration-300 hover:scale-105 text-lg"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Agendar cita
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
