import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const GridBeam = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden bg-white", className)}>
      <div className="absolute inset-0 z-0">
        <svg
          className="h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-beam-pattern"
              width="40"
              height="40"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-beam-pattern)" />
          
          {/* Animated Beams */}
          <motion.rect
            width="1"
            height="100%"
            fill="url(#beam-gradient)"
            initial={{ x: "0%", y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
            className="absolute left-[20%]"
          />
          <motion.rect
            width="1"
            height="100%"
            fill="url(#beam-gradient)"
            initial={{ x: "0%", y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute left-[40%]"
          />
          <motion.rect
             width="100%"
             height="1"
             fill="url(#beam-gradient-h)"
             initial={{ x: "-100%", y: "0%" }}
             animate={{ x: "100%" }}
             transition={{
               duration: 6,
               repeat: Infinity,
               ease: "linear",
               delay: 2,
             }}
             className="absolute top-[30%]"
          />

          <defs>
            <linearGradient id="beam-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#580A2D" stopOpacity="0" />
              <stop stopColor="#580A2D" />
              <stop offset="1" stopColor="#580A2D" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-gradient-h" x1="0" x2="1" y1="0" y2="0">
              <stop stopColor="#580A2D" stopOpacity="0" />
              <stop stopColor="#580A2D" />
              <stop offset="1" stopColor="#580A2D" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
