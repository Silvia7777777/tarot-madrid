import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Add sparkle trail
      const newTrail = { id: Date.now(), x: position.x, y: position.y };
      setTrails((prev) => [...prev, newTrail]);
      
      // Remove trail after animation
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 1000);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position.x, position.y]);

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="relative w-full h-full">
          <div
            className={`absolute inset-0 rounded-full bg-accent blur-xl transition-all duration-300 ${
              isClicking ? "opacity-100 scale-150" : "opacity-50 scale-100"
            }`}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-secondary to-accent animate-glow" />
        </div>
      </motion.div>

      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed w-2 h-2 rounded-full bg-accent pointer-events-none z-[9998]"
          initial={{
            x: trail.x,
            y: trail.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            boxShadow: "0 0 20px hsl(var(--accent))",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
