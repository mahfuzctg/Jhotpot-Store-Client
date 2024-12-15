import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DashboardSectionTitle = ({ heading }: { heading: string }) => {
  // Create a ref for the element to be observed
  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-bold mt-3 text-primary"
      >
        {heading}
      </motion.h1>
    </motion.div>
  );
};

export default DashboardSectionTitle;