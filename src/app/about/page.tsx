const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Banner Section */}
      <div className="relative">
        <img
          src="https://i.postimg.cc/xdnsFcb0/New-Arrival-2.png" // Replace with your banner image URL
          alt="Banner"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Welcome to Our Platform
          </h1>
          <p className="text-gray-300 mt-4 text-center text-lg md:text-xl">
            Discover amazing features and offerings tailored just for you.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Us
          </h2>
          <p className="text-gray-600 mt-4 text-lg md:text-xl">
            We are committed to providing you with the best services to meet
            your needs. Our platform is designed to offer a seamless experience
            while exploring our features. Whether you're here to shop, learn, or
            connect, we strive to exceed your expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
