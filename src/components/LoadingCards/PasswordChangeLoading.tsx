/* eslint-disable react/self-closing-comp */
const PasswordChangeLoading = () => {
    return (
      <div className="w-full p-6 rounded-lg shadow md:mt-5 sm:max-w-2xl sm:p-8 animate-pulse">
        <div className="py-5">
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
        <div className="pb-5">
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
        <div className="pb-8">
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
        <div className="flex justify-center items-center mb-10">
          <div className="h-10 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    );
  };
  
  export default PasswordChangeLoading;