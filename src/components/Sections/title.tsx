"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MdShoppingCart } from "react-icons/md"; // Example icon
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
      className="text-center"
    >
      {/* Subtitle with Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
        className="flex justify-center items-center gap-2 text-teal-500 text-2xl font-extrabold tracking-wider"
      >
        <PiStarFourFill className="text-teal-500" />
        {sub}
        <PiStarFourFill className="text-teal-500" />
      </motion.div>

      {/* Heading with Emoji */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="mt-2 text-gray-800 text-lg font-medium flex justify-center items-center gap-2"
      >
        <MdShoppingCart className="text-teal-500" />
        {heading}
        <span>🛒</span> {/* Emoji added */}
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: "easeInOut" }}
        className="mt-4 mx-auto w-20 h-1 bg-teal-400 rounded-full"
      />
    </motion.div>
  );
};

export default Title;
