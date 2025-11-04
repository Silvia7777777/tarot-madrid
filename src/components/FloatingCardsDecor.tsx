import { motion } from "framer-motion";
import heroCard1 from "@/assets/hero-tarot-1.png";
import heroCard2 from "@/assets/hero-tarot-2.png";
import heroCard3 from "@/assets/hero-tarot-3.png";

const FloatingCardsDecor = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="flex justify-center items-center gap-3 md:gap-6">
        {[
          { src: heroCard1, delay: 0.2 },
          { src: heroCard2, delay: 0.4 },
          { src: heroCard3, delay: 0.6 },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: card.delay, 
              duration: 0.8,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, index === 1 ? 1 : index === 0 ? -1 : 1, 0],
              }}
              transition={{
                duration: 2.5 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={card.src}
                alt=""
                className="w-12 h-20 md:w-16 md:h-28 lg:w-20 lg:h-32 object-cover rounded-md shadow-lg opacity-60"
                style={{
                  boxShadow: "0 0 20px rgba(255, 215, 128, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3)",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-md"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(255, 215, 128, 0.1)",
                    "0 0 25px rgba(255, 215, 128, 0.3)",
                    "0 0 10px rgba(255, 215, 128, 0.1)",
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
    </section>
  );
};

export default FloatingCardsDecor;
