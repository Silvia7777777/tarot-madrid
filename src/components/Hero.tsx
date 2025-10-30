import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import mysticalBg from "@/assets/mystical-background.jpg";
import heroCard1 from "@/assets/hero-tarot-1.png";
import heroCard2 from "@/assets/hero-tarot-2.png";
import heroCard3 from "@/assets/hero-tarot-3.png";

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

          <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Tarot Madrid
          </h1>

          {/* Three Mystical Tarot Cards */}
          <div className="flex justify-center items-center gap-4 md:gap-8 my-8 md:my-12">
            {[
              { src: heroCard1, delay: 0.3 },
              { src: heroCard2, delay: 0.5 },
              { src: heroCard3, delay: 0.7 },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                }}
                transition={{ 
                  delay: card.delay, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, index === 1 ? 2 : index === 0 ? -2 : 2, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <img
                    src={card.src}
                    alt=""
                    className="w-20 h-32 md:w-28 md:h-44 lg:w-32 lg:h-52 object-cover rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      boxShadow: "0 0 30px rgba(255, 215, 128, 0.3), 0 10px 40px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  {/* Golden glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Pulsating glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255, 215, 128, 0.2)",
                        "0 0 40px rgba(255, 215, 128, 0.4)",
                        "0 0 20px rgba(255, 215, 128, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

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
