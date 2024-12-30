const ProductLoading = () => {
  return (
    <div className="relative max-w-[350px] space-y-4 rounded-lg p-4 shadow-lg md:w-[312px] bg-[#fefeff] animate-pulse">
      {/* Image Section Skeleton */}
      <div className="relative h-[268px] w-[278px] overflow-hidden rounded-lg bg-gray-100" />

      {/* Details Section Skeleton */}
      <div className="grid gap-2">
        {/* Title Skeleton */}
        <div className="h-6 w-3/4 rounded bg-gray-100" />

        {/* Price and Button Skeleton */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-6 w-1/3 rounded bg-gray-100" />
          <div className="relative h-12 w-28 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
