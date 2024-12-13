
/* eslint-disable react/self-closing-comp */
const DashboardProductLoading = () => {
    return (
      <div className="w-11/12 mx-auto md:w-full h-[300px] bg-gray-800 animate-pulse rounded-lg overflow-hidden relative">
        {/* Header Section */}
        <div className="absolute z-10 top-2 left-2 w-24 h-6 bg-gray-700 rounded-md"></div>
  
        {/* Image Placeholder */}
        <div className="w-full h-full bg-gray-700 scale-125 -translate-y-6 object-cover"></div>
  
        {/* Footer Section */}
        <div className="absolute bottom-0 w-full bg-gray-800/80 border-t-1 border-gray-700 p-4 flex justify-between items-center">
          <div>
            <div className="w-32 h-4 bg-gray-700 rounded-md mb-2"></div>
            <div className="w-20 h-4 bg-gray-700 rounded-md"></div>
          </div>
          <div className="w-16 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default DashboardProductLoading;
  