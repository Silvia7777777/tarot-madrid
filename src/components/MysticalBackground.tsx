import { motion } from "framer-motion";
import { Sun, Moon, Star, Sparkles } from "lucide-react";

const MysticalBackground = () => {
  // Generar posiciones aleatorias para las estrellas/cruces
  const generateStars = (count: number) => {
    return [...Array(count)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
  };

  const stars = generateStars(50); // 50 cruces/estrellas pequeñas

  // Iconos místicos con posiciones fijas pero animadas
  const mysticIcons = [
    { Icon: Sun, x: 15, y: 20, size: 24, color: "text-accent", delay: 0 },
    { Icon: Moon, x: 85, y: 30, size: 20, color: "text-secondary", delay: 0.5 },
    { Icon: Star, x: 25, y: 70, size: 18, color: "text-accent/60", delay: 1 },
    { Icon: Sparkles, x: 75, y: 65, size: 22, color: "text-secondary/70", delay: 1.5 },
    { Icon: Sun, x: 50, y: 85, size: 16, color: "text-accent/40", delay: 2 },
    { Icon: Moon, x: 10, y: 50, size: 18, color: "text-secondary/50", delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cruces/estrellas pequeñas titilantes (estilo de la referencia) */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          {/* Cruz dorada pequeña */}
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 w-full h-0.5 bg-accent/40 top-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 h-full w-0.5 bg-accent/40 left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>
      ))}

      {/* Iconos místicos flotantes más grandes */}
      {mysticIcons.map((item, i) => {
        const { Icon, x, y, size, color, delay } = item;
        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.1, 0.8],
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Icon className={`${color}`} size={size} />
            {/* Glow sutil */}
            <motion.div
              className="absolute inset-0 blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Icon className={`${color}`} size={size} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Símbolos del zodiaco como texto Unicode pequeño */}
      {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((symbol, i) => (
        <motion.div
          key={`zodiac-${i}`}
          className="absolute text-accent/30 text-xs font-display"
          style={{
            left: `${5 + i * 8}%`,
            top: `${40 + (i % 3) * 20}%`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Símbolos de planetas */}
      {["☿", "♀", "♂", "♃", "♄", "♅", "♆"].map((planet, i) => (
        <motion.div
          key={`planet-${i}`}
          className="absolute text-secondary/25 text-sm font-display"
          style={{
            left: `${10 + i * 13}%`,
            top: `${15 + (i % 2) * 60}%`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        >
          {planet}
        </motion.div>
      ))}

      {/* Gradiente sutil desde arriba para integrar mejor */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
};

export default MysticalBackground;
