/* eslint-disable react/self-closing-comp */
const DashboardCategoryLoading = () => {
    return (
      <div className="bg-[#18181B] text-white rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full h-48 bg-gray-800 animate-pulse"></div>
        <div className="p-4">
          <div className="w-3/4 h-6 bg-gray-700 animate-pulse mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-700 animate-pulse"></div>
        </div>
        <div className="flex justify-between p-4">
          <div className="w-24 h-10 bg-gray-700 animate-pulse rounded-md"></div>
          <div className="w-24 h-10 bg-gray-700 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default DashboardCategoryLoading;