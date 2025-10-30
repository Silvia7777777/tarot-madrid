import { motion } from "framer-motion";
import { Youtube, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Moon className="w-16 h-16 text-secondary" />
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6">
              Sobre Tarot Madrid
            </h2>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-lg text-foreground/90 leading-relaxed font-body">
              Bienvenido a un espacio de <span className="text-accent font-semibold">luz, sanación y transformación</span>. 
              En Tarot Madrid, las cartas son más que símbolos: son puertas hacia tu sabiduría interior 
              y guías en tu camino evolutivo.
            </p>

            <p className="text-lg text-foreground/90 leading-relaxed font-body">
              Cada lectura es una <span className="text-secondary font-semibold">experiencia única y personalizada</span>, 
              diseñada para conectar con tu energía y revelar las respuestas que tu alma busca. 
              Ya sea amor, abundancia, propósito o sanación, el universo tiene un mensaje para ti.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 hover:shadow-[var(--glow-gold)] transition-all duration-300"
                onClick={() => window.open("https://youtube.com/@Tarot_Madrid", "_blank")}
              >
                <Youtube className="mr-2 w-5 h-5" />
                Visita mi canal de YouTube
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-12 flex items-center justify-center gap-2 text-muted-foreground"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="font-body italic">
                "El tarot no predice el futuro, ilumina el presente"
              </p>
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
