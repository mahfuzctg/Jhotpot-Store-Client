
/* eslint-disable react/self-closing-comp */
import { motion } from "framer-motion";
const VendorProfileLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden rounded-lg shadow-lg bg-[#fdfdff] p-2 my-16"
    >
      <div className="p-2 sm:w-1/2">
        <div className="bg-gray-100 animate-pulse rounded sm:h-80 object-contain border-2 border-dashed border-primary px-3"></div>
      </div>
      <div className="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
        <div>
          <div className="bg-gray-100 animate-pulse block sm:mt-2 h-8 w-1/3 rounded"></div>
          <div className="mt-2 bg-gray-100 animate-pulse h-4 w-2/3 rounded"></div>
          <div className="flex flex-wrap items-center justify-between my-6">
            <div className="space-y-1">
              <div className="bg-gray-100 animate-pulse h-4 w-16 rounded"></div>
              <div className="bg-gray-100 animate-pulse h-6 w-24 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="bg-gray-100 animate-pulse h-4 w-16 rounded"></div>
              <div className="bg-gray-100 animate-pulse h-6 w-24 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="bg-gray-100 animate-pulse h-4 w-16 rounded"></div>
              <div className="bg-gray-100 animate-pulse h-6 w-24 rounded"></div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <div className="bg-gray-100 animate-pulse relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary px-3"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorProfileLoading;
