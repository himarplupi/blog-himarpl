"use client";

import { motion } from "framer-motion";

export function ComingSoon() {
  return (
    <motion.div className="mt-6 flex flex-col items-center justify-center">
      <motion.h2
        className="mt-2 scroll-m-20 pb-2 text-center font-serif text-4xl font-bold tracking-wide sm:text-6xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 5, type: "spring" }}
      >
        Segera Hadir
      </motion.h2>
      <motion.p
        className="text-md mt-2 text-center font-medium leading-7 text-muted-foreground"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 7, duration: 3, type: "spring" }}
      >
        Halaman ini masih dalam tahap pengembangan
      </motion.p>
    </motion.div>
  );
}
