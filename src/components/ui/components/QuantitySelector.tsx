"use client";

import { FaCartArrowDown } from "react-icons/fa6";

interface QuantitySelectorProps {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  inStock: number;
}

const QuantitySelector = ({
  quantity,
  increment,
  decrement,
  inStock,
}: QuantitySelectorProps) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <button
          onClick={decrement}
          disabled={quantity <= 0}
          type="button"
          id="decrement-button"
          data-input-counter-decrement="bedrooms-input"
          className="bg-[#82C408] hover:bg-[#72982c] rounded-s-lg p-3 h-11  focus:ring-[#82C408] focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <div className="border-x-0 h-11 font-medium text-center text-sm  block w-full pb-6 pt-1 bg-[#ffffff] border-[#82C408] placeholder-[#82C408] text-[#82C408] focus:ring-blue-500 focus:border-blue-500">
          {quantity}
        </div>
        <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs font-bold text-[#82C408] space-x-1 rtl:space-x-reverse">
          <FaCartArrowDown className="text-[#82C408]" />
          <span>Products</span>
        </div>
        <button
          type="button"
          onClick={increment}
          disabled={inStock <= 0}
          id="increment-button"
          data-input-counter-increment="bedrooms-input"
          className="bg-[#82C408] hover:bg-[#72982c]    rounded-e-lg p-3 h-11 focus:ring-[#82C408] focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
