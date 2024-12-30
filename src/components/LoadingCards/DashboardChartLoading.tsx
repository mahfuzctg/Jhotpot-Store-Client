/* eslint-disable react/self-closing-comp */
const DashboardChartLoading = () => {
    return (
      <div className="shadow-md rounded-lg p-5 w-[85%] mx-auto animate-pulse bg-gray-800">
        <div className="text-xl font-bold mb-4 text-center bg-gray-700 h-6 w-1/2 mx-auto rounded"></div>
        <div className="flex flex-col">
          <div className="h-48 bg-gray-700 rounded-lg w-full mb-4"></div>
          <div className="flex justify-between">
            <div className="bg-gray-700 h-4 w-16 rounded"></div>
            <div className="bg-gray-700 h-4 w-16 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardChartLoading;