import { motion } from 'motion/react';
import { Flower } from 'lucide-react';

export default function PetalBackground() {
  const petals = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200/50"
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20,
          }}
        >
          <Flower size={48} />
        </motion.div>
      ))}
    </div>
  );
}
