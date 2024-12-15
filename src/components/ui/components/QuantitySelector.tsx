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
          className="bg-gray-700 hover:bg-gray-600 border-gray-600  border rounded-s-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
        <div className="border-x-0 h-11 font-medium text-center text-sm  block w-full pb-6 pt-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          {quantity}
        </div>
        <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
          <FaCartArrowDown className="text-gray-400" />
          <span>Products</span>
        </div>
        <button
          type="button"
          onClick={increment}
          disabled={inStock <= 0}
          id="increment-button"
          data-input-counter-increment="bedrooms-input"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600  border rounded-e-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
