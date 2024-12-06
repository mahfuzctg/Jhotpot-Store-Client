"use client";

import Countdown from "react-countdown";
import { MdDiscount } from "react-icons/md";

const DealOffer = () => {
  const targetDate = new Date("2024-12-31T23:59:59");

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div className="grid  grid-cols-2 md:grid-cols-4 justify-center lg:justify-start text-center text-white gap-5 md:gap-2 items-center">
        <div className="p-4 rounded-full w-24 h-24 shadow-lg border border-primary">
          <span className="block text-3xl md:text-4xl font-bold">{days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="p-4 rounded-full w-24 h-24 shadow-lg border border-primary">
          <span className="block text-3xl md:text-4xl font-bold">{hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="p-4 rounded-full w-24 h-24 shadow-lg border border-primary">
          <span className="block text-3xl md:text-4xl font-bold">
            {minutes}
          </span>
          <span className="text-sm">Min</span>
        </div>
        <div className="p-4 rounded-full w-24 h-24 shadow-lg border border-primary">
          <span className="block text-3xl md:text-4xl font-bold">
            {seconds}
          </span>
          <span className="text-sm">Sec</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-14 px-8">
      <div className="text-white py-10 px-6 rounded-lg shadow-md max-w-6xl mx-auto flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6 border border-primary">
        <div className="flex-1 text-center lg:text-left px-10">
          <div className="flex justify-center lg:justify-start items-center gap-2">
            <MdDiscount className="text-primary text-lg" />
            <div className="font-medium text-gray-400 mb-2">
              Deal of the Week
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold">
            Hurry Up! Offer ends in. Get{" "}
            <span className="text-primary">UP TO 70% OFF</span>
          </h1>
          <div className="mt-6">
            <Countdown date={targetDate} renderer={renderer} />
          </div>
          <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 mt-6">
            Shop Now
          </button>
        </div>

        <div className="flex-1 xl:relative">
          <img
            src="https://html.pixelfit.agency/pesco/assets/images/banner/deal-1.png"
            alt="Shopping Offer"
            className="rounded-lg shadow-lg w-full max-w-md mx-auto xl:-top-[142px] xl:absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default DealOffer;
