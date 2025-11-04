import { motion } from "framer-motion";
import heroCard1 from "@/assets/hero-tarot-1.png";
import heroCard2 from "@/assets/hero-tarot-2.png";
import heroCard3 from "@/assets/hero-tarot-3.png";
import legacyEmpress from "@/assets/legacy-empress.png";

interface FloatingCardsDecorProps {
  variant?: "default" | "love" | "money" | "static";
  size?: "small" | "medium" | "large";
  spacing?: "none" | "normal";
  showEmpress?: boolean;
}

const FloatingCardsDecor = ({ 
  variant = "default",
  size = "medium",
  spacing = "normal",
  showEmpress = false
}: FloatingCardsDecorProps) => {
  
  const sizeClasses = {
    small: "w-8 h-14",
    medium: "w-12 h-20 md:w-16 md:h-28 lg:w-20 lg:h-32",
    large: "w-16 h-28"
  };

  const gapClasses = {
    small: "gap-2",
    medium: "gap-3 md:gap-6",
    large: "gap-4 md:gap-8"
  };

  const colorSchemes = {
    default: {
      filter: "brightness(1.1) saturate(1.2)",
      glow: "0 0 20px rgba(255, 215, 128, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3)",
      glowPulse: [
        "0 0 10px rgba(255, 215, 128, 0.1)",
        "0 0 25px rgba(255, 215, 128, 0.3)",
        "0 0 10px rgba(255, 215, 128, 0.1)",
      ]
    },
    love: {
      filter: "sepia(1) saturate(3) hue-rotate(250deg) brightness(0.6)",
      glow: "0 0 20px rgba(168, 85, 247, 0.4), 0 5px 20px rgba(0, 0, 0, 0.3)",
      glowPulse: [
        "0 0 10px rgba(168, 85, 247, 0.2)",
        "0 0 25px rgba(168, 85, 247, 0.5)",
        "0 0 10px rgba(168, 85, 247, 0.2)",
      ]
    },
    money: {
      filter: "sepia(1) saturate(2) hue-rotate(30deg) brightness(1.3)",
      glow: "0 0 20px rgba(255, 215, 0, 0.4), 0 5px 20px rgba(0, 0, 0, 0.3)",
      glowPulse: [
        "0 0 10px rgba(255, 215, 0, 0.2)",
        "0 0 25px rgba(255, 215, 0, 0.5)",
        "0 0 10px rgba(255, 215, 0, 0.2)",
      ]
    },
    static: {
      filter: "brightness(1.1) saturate(1.2)",
      glow: "0 0 20px rgba(255, 215, 128, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3)",
      glowPulse: [
        "0 0 10px rgba(255, 215, 128, 0.1)",
        "0 0 25px rgba(255, 215, 128, 0.3)",
        "0 0 10px rgba(255, 215, 128, 0.1)",
      ]
    }
  };

  const cards = showEmpress 
    ? [
        { src: heroCard1, delay: 0.2 },
        { src: legacyEmpress, delay: 0.4 },
        { src: heroCard3, delay: 0.6 },
      ]
    : [
        { src: heroCard1, delay: 0.2 },
        { src: heroCard2, delay: 0.4 },
        { src: heroCard3, delay: 0.6 },
      ];

  const currentScheme = colorSchemes[variant];
  const isStatic = variant === "static";

  return (
    <section className={`relative ${spacing === "normal" ? "py-12" : "py-0"} overflow-hidden`}>
      <div className={`flex justify-center items-center ${gapClasses[size]}`}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: isStatic ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: card.delay, 
              duration: 0.8,
            }}
            className="relative"
          >
            <motion.div
              animate={isStatic ? {} : {
                y: [0, -8, 0],
                rotate: [0, index === 1 ? 1 : index === 0 ? -1 : 1, 0],
              }}
              transition={isStatic ? {} : {
                duration: 2.5 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={card.src}
                alt=""
                className={`${sizeClasses[size]} object-cover rounded-md shadow-lg opacity-60`}
                style={{
                  boxShadow: currentScheme.glow,
                  filter: currentScheme.filter,
                }}
              />
              {!isStatic && (
                <motion.div
                  className="absolute inset-0 rounded-md"
                  animate={{
                    boxShadow: currentScheme.glowPulse,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FloatingCardsDecor;
