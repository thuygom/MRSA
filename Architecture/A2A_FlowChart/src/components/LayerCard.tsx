import { ReactNode } from "react";
import { motion } from "motion/react";

interface LayerCardProps {
  title: string;
  children: ReactNode;
  color: "blue" | "purple" | "green";
  delay?: number;
}

const colorStyles = {
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50/50",
    title: "text-blue-900",
    badge: "bg-blue-100 text-blue-700",
  },
  purple: {
    border: "border-purple-200",
    bg: "bg-purple-50/50",
    title: "text-purple-900",
    badge: "bg-purple-100 text-purple-700",
  },
  green: {
    border: "border-green-200",
    bg: "bg-green-50/50",
    title: "text-green-900",
    badge: "bg-green-100 text-green-700",
  },
};

export function LayerCard({ title, children, color, delay = 0 }: LayerCardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`border-2 ${styles.border} ${styles.bg} rounded-2xl p-8 backdrop-blur-sm shadow-lg`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-4 py-1.5 ${styles.badge} rounded-full text-sm tracking-wide`}>
          {title}
        </span>
      </div>
      {children}
    </motion.div>
  );
}
