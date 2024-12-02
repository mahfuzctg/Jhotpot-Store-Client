import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaSadTear } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black text-center px-5">
      <div className="flex flex-col items-center gap-4 text-white">
        <div className="text-red-500 text-8xl">
          <FaSadTear />
        </div>
        <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">
          404
        </h1>
        <h2 className="text-4xl font-bold">Oops! Page not found.</h2>
        <p className="text-gray-300 text-lg max-w-lg">
          It seems like the page you are looking for doesn't exist or has been
          moved. Don’t worry, let’s get you back on track!
        </p>
      </div>
      <div className="mt-6">
        <Link href="/">
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center gap-2 hover:from-blue-500 hover:to-green-500"
          >
            <FiHome />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
