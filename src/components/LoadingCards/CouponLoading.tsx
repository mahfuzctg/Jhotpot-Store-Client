const CouponLoading = () => {
    return (
      <div className="container border border-primary text-black p-5 rounded-lg shadow-lg max-w-md mx-auto animate-pulse">
        <div className="text-lg mb-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mt-2" />
        </div>
        <div className="text-base mb-4">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-2">
          <div className="h-6 bg-gray-100 rounded" />
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded mt-3 w-20">
          <div className="h-4 bg-gray-100 rounded" />
        </div>
        <div className="text-sm mt-3">
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-3/4 mt-2" />
        </div>
      </div>
    );
  };
  
  export default CouponLoading;