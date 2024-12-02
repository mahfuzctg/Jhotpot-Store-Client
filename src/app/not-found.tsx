import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="relative h-screen">
      <Image
        src={
          "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt="background"
        fill
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative bg-gray-900 bg-opacity-75 h-full">
        <div className="flex flex-col justify-center items-center h-full max-w-2xl mx-auto">
          <h1 className="mb-5 text-6xl md:text-8xl font-bold text-white text-center">
            404
          </h1>
          <h1 className="mb-5 text-4xl md:text-6xl font-bold text-white text-center">
            Page Not Found
          </h1>
          <div className="divider w-80 mx-auto text-white" />
          <p className="mb-5 md:text-lg text-white text-center mx-5">
            Sorry but we couldn&apos;t find the page you are looking for. Please
            check to make sure you&apos;ve typed the URL correctly.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
