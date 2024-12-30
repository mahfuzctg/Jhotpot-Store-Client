/* eslint-disable react/self-closing-comp */
const CustomerProfileLoading = () => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg animate-pulse mt-20">
        {/* Image Skeleton */}
        <div className="lg:order-2 w-full lg:w-1/3 flex justify-center">
          <div className="h-48 w-48 lg:h-80 lg:w-full bg-gray-100 rounded-lg"></div>
        </div>
  
        {/* Text Skeleton */}
        <div className="lg:order-1 w-full lg:w-2/3 mt-6 lg:mt-0 lg:mr-8 space-y-4">
          {/* Name Skeleton */}
          <div className="h-8 w-1/3 bg-gray-100 rounded"></div>
  
          {/* Divider Skeleton */}
          <div className="h-1 w-1/2 bg-gray-100 rounded"></div>
  
          {/* Role Skeleton */}
          <div className="h-6 w-1/4 bg-gray-100 rounded"></div>
  
          {/* Email Skeleton */}
          <div className="h-5 w-2/3 bg-gray-100 rounded"></div>
  
          {/* Address Skeleton */}
          <div className="h-5 w-3/4 bg-gray-100 rounded"></div>
  
          {/* Phone Skeleton */}
          <div className="h-5 w-1/2 bg-gray-100 rounded"></div>
  
          {/* Button Skeleton */}
          <div className="h-10 w-40 bg-gray-100 rounded-full"></div>
  
          {/* Social Media Skeleton */}
          <div className="flex space-x-4 mt-6">
            <div className="h-6 w-6 bg-gray-100 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-100 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-100 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerProfileLoading;