import Lottie from "lottie-react";
import loading from "@/src/assets/cartLoading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[350px] -mt-40">
        <Lottie animationData={loading} loop={true} />
        <p className="text-4xl font-semibold text-center mt-3 text-white">
          Loading.....
        </p>
      </div>
    </div>
  );
};

export default Loading;