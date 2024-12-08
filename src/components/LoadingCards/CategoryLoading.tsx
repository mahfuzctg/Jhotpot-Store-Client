const CategoryLoading = () => {
  return (
    <div className="flex justify-center items-center space-x-4 py-8">
      <div className="flex flex-col items-center relative">
        {/* Image Skeleton */}
        <div className="w-[235px] h-[235px] bg-gray-700 animate-pulse rounded-lg" />

        {/* Text Skeleton */}
        <div className="absolute w-[185px] h-8 bg-gray-800 animate-pulse rounded-full -bottom-6" />
      </div>
      {/* Divider Skeleton */}
      <div className="border-l-2 border-dotted border-gray-700 h-48 hidden md:block" />
    </div>
  );
};

export default CategoryLoading;
