import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface NodeCardProps {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay?: number;
  color: "blue" | "purple" | "green";
}

const colorStyles = {
  blue: {
    bg: "bg-white hover:bg-blue-50",
    border: "border-blue-200 hover:border-blue-400",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  purple: {
    bg: "bg-white hover:bg-purple-50",
    border: "border-purple-200 hover:border-purple-400",
    icon: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  green: {
    bg: "bg-white hover:bg-green-50",
    border: "border-green-200 hover:border-green-400",
    icon: "text-green-600",
    iconBg: "bg-green-100",
  },
};

export function NodeCard({
  label,
  icon: Icon,
  description,
  isHovered,
  onHover,
  onLeave,
  delay = 0,
  color,
}: NodeCardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -4 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className={`
        relative group cursor-pointer
        ${styles.bg} 
        border-2 ${styles.border}
        rounded-xl p-4 
        transition-all duration-300 
        shadow-sm hover:shadow-xl
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`${styles.iconBg} p-3 rounded-lg`}
        >
          <Icon className={`w-6 h-6 ${styles.icon}`} />
        </motion.div>
        
        <div className="text-center">
          <h3 className="text-slate-900 mb-1">{label}</h3>
        </div>
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          pointerEvents: isHovered ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 w-64"
      >
        <div className="bg-slate-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl">
          <p>{description}</p>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900" />
        </div>
      </motion.div>
    </motion.div>
  );
}
