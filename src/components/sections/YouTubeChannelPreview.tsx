import { motion } from "framer-motion";
import { Youtube, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/socialLinks";

const YouTubeChannelPreview = () => {
  // Posiciones para los destellos flotantes
  const sparklePositions = [
    { x: "-40px", y: "-20px" },
    { x: "calc(100% + 20px)", y: "-30px" },
    { x: "-50px", y: "50%" },
    { x: "calc(100% + 30px)", y: "50%" },
    { x: "-30px", y: "calc(100% + 10px)" },
    { x: "calc(100% + 10px)", y: "calc(100% + 20px)" },
    { x: "20%", y: "-40px" },
    { x: "80%", y: "calc(100% + 30px)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      {/* Botón con Destellos */}
      <div className="relative inline-block w-full flex justify-center">
        {/* Destellos Flotantes Animados */}
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-0"
            style={{ top: pos.y, left: pos.x }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-6 h-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
          </motion.div>
        ))}

        {/* Botón Principal */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="
            relative z-10
            px-8 md:px-12 
            py-4 md:py-6
            text-lg md:text-xl lg:text-2xl
            font-display font-bold
            bg-secondary text-accent
            border-4 border-accent
            rounded-2xl
            shadow-[0_0_40px_hsl(var(--accent)_/_0.4),_0_0_20px_hsl(var(--secondary)_/_0.3)]
            hover:shadow-[0_0_80px_hsl(var(--accent)_/_0.9),_0_0_40px_hsl(var(--secondary)_/_0.6)]
            hover:brightness-125
            transition-all duration-500
            group
            will-change-transform
          "
          onClick={() => window.open(SOCIAL_LINKS.youtube.url, "_blank")}
          aria-label="Visitar canal de YouTube de Tarot Madrid"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 relative z-10">
            <Youtube className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
            <span className="leading-tight">
              Visita mi Canal de YouTube
            </span>
          </div>

          {/* Efecto Shimmer - Brillo que atraviesa el botón */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent rounded-2xl"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Glow interno pulsante */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        </motion.button>
      </div>

      {/* Texto místico debajo */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6 text-sm md:text-base text-muted-foreground font-body italic"
      >
        ✨ Descubre lecturas de tarot, consejos místicos y más ✨
      </motion.p>
    </motion.div>
  );
};

export default YouTubeChannelPreview;
