import { useState } from "react";
import { motion } from "framer-motion";
import heroCard1 from "@/assets/hero-tarot-1.png";
import heroCard2 from "@/assets/hero-tarot-2.png";
import heroCard3 from "@/assets/hero-tarot-3.png";
import legacyEmpress from "@/assets/legacy-empress.png";
import { ANIMATION_SCHEMES, type AnimationVariant } from "@/constants/animationSchemes";

interface FloatingCardsDecorProps {
  variant?: AnimationVariant;
  size?: "small" | "medium" | "large" | "xlarge";
  spacing?: "none" | "normal";
  showEmpress?: boolean;
}

const FloatingCardsDecor = ({ 
  variant = "default",
  size = "medium",
  spacing = "normal",
  showEmpress = false
}: FloatingCardsDecorProps) => {
  const [empressClicked, setEmpressClicked] = useState(false);
  const [showHeartSparkles, setShowHeartSparkles] = useState(false);
  
  const handleEmpressClick = () => {
    if (!showEmpress || empressClicked) return;
    
    setEmpressClicked(true);
    setShowHeartSparkles(true);
    
    setTimeout(() => {
      setEmpressClicked(false);
      setShowHeartSparkles(false);
    }, 3000);
  };
  
  const sizeClasses = {
    small: "w-8 h-14",
    medium: "w-12 h-20 md:w-16 md:h-28 lg:w-20 lg:h-32",
    large: "w-16 h-28",
    xlarge: "w-20 h-32 md:w-24 md:h-40 lg:w-28 lg:h-44"
  };

  const gapClasses = {
    small: "gap-2",
    medium: "gap-3 md:gap-6",
    large: "gap-4 md:gap-8"
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

  const currentScheme = ANIMATION_SCHEMES[variant];
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
            {/* Animación especial para La Emperatriz (carta del medio cuando showEmpress=true) */}
            {index === 1 && showEmpress ? (
              <motion.div
                className="relative group cursor-pointer"
                onClick={handleEmpressClick}
                whileHover={{ scale: 1.15 }}
                animate={empressClicked ? {
                  x: 0,
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 1, ease: "easeInOut" }
                } : {}}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={card.src}
                  alt="La Emperatriz"
                  className={`${sizeClasses[size]} object-cover rounded-md shadow-lg`}
                  whileHover={{
                    y: [-2, 2, -2],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: currentScheme.glow,
                    filter: currentScheme.filter,
                  }}
                />
                {/* Resplandor extra en hover */}
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-b from-accent/30 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Partículas doradas al hacer hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-accent rounded-full"
                      style={{
                        top: `${20 + i * 10}%`,
                        left: `${10 + (i % 3) * 30}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Corazones morado-dorados al hacer CLIC */}
                {showHeartSparkles && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {/* Corazones grandes morados */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 360) / 12;
                      const distance = 60;
                      return (
                        <motion.div
                          key={`heart-${i}`}
                          className="absolute top-1/2 left-1/2"
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0, 
                            opacity: 0 
                          }}
                          animate={{
                            x: Math.cos(angle * Math.PI / 180) * distance,
                            y: Math.sin(angle * Math.PI / 180) * distance,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none"
                          >
                            <defs>
                              <linearGradient id={`heartGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="50%" stopColor="#c084fc" />
                                <stop offset="100%" stopColor="#ffd700" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              fill={`url(#heartGradient-${i})`}
                              filter="drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))"
                            />
                          </svg>
                        </motion.div>
                      );
                    })}
                    
                    {/* Destellos dorados adicionales */}
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                        style={{
                          background: i % 2 === 0 
                            ? "linear-gradient(45deg, #a855f7, #ffd700)" 
                            : "linear-gradient(45deg, #ffd700, #a855f7)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          x: (Math.random() - 0.5) * 100,
                          y: (Math.random() - 0.5) * 100,
                          scale: [0, 2, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                animate={empressClicked ? {
                  x: index === 0 ? 100 : index === 2 ? -100 : 0,
                  rotate: index === 0 ? 15 : index === 2 ? -15 : 0,
                  scale: index === 1 ? 1.2 : 0.9,
                  transition: { duration: 1, ease: "easeInOut" }
                } : isStatic ? {} : {
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
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FloatingCardsDecor;
