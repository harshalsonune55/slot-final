import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DOT_SIZE = 10;
const RING_SIZE = 36;

function centered(value, size) {
  return useTransform(value, (v) => v - size / 2);
}

export default function CursorDot() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotXRaw = useSpring(mouseX, { stiffness: 700, damping: 40, mass: 0.3 });
  const dotYRaw = useSpring(mouseY, { stiffness: 700, damping: 40, mass: 0.3 });

  const ringXRaw = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.6 });
  const ringYRaw = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.6 });

  const dotX = centered(dotXRaw, DOT_SIZE);
  const dotY = centered(dotYRaw, DOT_SIZE);
  const ringX = centered(ringXRaw, RING_SIZE);
  const ringY = centered(ringYRaw, RING_SIZE);

  useEffect(() => {
    function handleMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-green-500/50"
        style={{ width: RING_SIZE, height: RING_SIZE, x: ringX, y: ringY }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-green-500"
        style={{ width: DOT_SIZE, height: DOT_SIZE, x: dotX, y: dotY }}
      />
    </div>
  );
}
