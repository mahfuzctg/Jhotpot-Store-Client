"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PiStarFourFill } from "react-icons/pi";

const Title = ({ sub, heading }: { sub: string; heading: string }) => {
  const ref = useRef(null);

  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
        className="flex items-center gap-2 uppercase justify-center md:justify-start"
      >
        <PiStarFourFill className="text-primary" />
        <span className="font-medium text-primary">{sub}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="mt-2 text-4xl font-bold text-white text-center md:text-left"
      >
        {heading}
      </motion.h1>
    </motion.div>
  );
};

export default Title;
