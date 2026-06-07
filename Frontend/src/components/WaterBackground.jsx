import { motion } from "framer-motion";

const blobs = [
  {
    className: "w-[34rem] h-[34rem] bg-green-400/15 dark:bg-green-500/20 -top-40 -left-32",
    animate: {
      x: [0, 80, -40, 0],
      y: [0, 60, 100, 0],
      borderRadius: ["42% 58% 65% 35% / 45% 45% 55% 55%", "60% 40% 35% 65% / 55% 60% 40% 45%", "42% 58% 65% 35% / 45% 45% 55% 55%"],
    },
    duration: 22,
  },
  {
    className: "w-[28rem] h-[28rem] bg-emerald-300/15 dark:bg-emerald-400/15 top-1/3 -right-40",
    animate: {
      x: [0, -60, 30, 0],
      y: [0, 80, -50, 0],
      borderRadius: ["50% 50% 40% 60% / 60% 40% 60% 40%", "35% 65% 55% 45% / 45% 55% 45% 55%", "50% 50% 40% 60% / 60% 40% 60% 40%"],
    },
    duration: 26,
  },
  {
    className: "w-[26rem] h-[26rem] bg-teal-300/12 dark:bg-teal-500/15 bottom-[-8rem] left-1/4",
    animate: {
      x: [0, 50, -70, 0],
      y: [0, -40, 30, 0],
      borderRadius: ["55% 45% 60% 40% / 40% 55% 45% 60%", "45% 55% 35% 65% / 60% 45% 55% 40%", "55% 45% 60% 40% / 40% 55% 45% 60%"],
    },
    duration: 30,
  },
];

export default function WaterBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
