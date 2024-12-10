"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Title = ({ sub, heading }: { sub: string; heading: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative  sm:py-24  bg-[#fff] text-[#82C408] overflow-hidden"
    >
      {/* Bird-Shaped Background */}
      <div className="absolute inset-0  flex justify-center items-center">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 0.2 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          src="https://i.postimg.cc/CKmJLqMP/31009.png"
          alt="Bird Shape"
          className="absolute w-[100%] h-[20%] "
        />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight"
      >
        {heading}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
        className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide"
      >
        {sub}
      </motion.p>

    
    </motion.div>
  );
};

export default Title;
