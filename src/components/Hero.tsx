import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import mysticalBg from "@/assets/mystical-background.jpg";

const Hero = () => {
  const scrollToReading = () => {
    document.getElementById("tarot-reading")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={mysticalBg}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Floating stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-16 h-16 mx-auto text-accent animate-glow" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Tarot Madrid
          </h1>

          <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-body">
            Lecturas evolutivas y sanación energética
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              onClick={scrollToReading}
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[var(--glow-gold)] text-lg px-8 py-6 rounded-full font-body transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Haz tu tirada gratuita
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-muted-foreground text-sm font-body"
          >
            Descubre lo que el universo tiene para ti
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
