"use client";

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center md:h-[550px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.postimg.cc/xdnsFcb0/New-Arrival-2.png')`, // Replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Button Section at the Bottom */}
      <div className="absolute bottom-5 w-full text-center z-10">
        <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-[#1A706E] text-[#1A706E] before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#1A706E] uppercase font-bold px-3">
          Buy now 🛍️
        </button>
      </div>
    </div>
  );
};

export default Banner;
