import React from "react";
import { motion } from "framer-motion";

export default function EyeScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-50"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {/* Eye container with eyelid animation */}
      <motion.div
        className="relative w-12 h-8 bg-primary/10 border-2 border-primary rounded-full overflow-hidden"
        animate={{ scaleY: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {/* Pupil moving up/down */}
        <motion.div
          className="absolute bg-primary w-3 h-3 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
