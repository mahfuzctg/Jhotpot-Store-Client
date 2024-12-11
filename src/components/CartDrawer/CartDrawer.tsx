import { FaCircleXmark } from "react-icons/fa6";

interface CartDrawerProps {
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-1/5 h-full bg-white/70 backdrop-blur-lg text-gray-800 shadow-lg transform transition-transform duration-300 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#82C408] to-green-600 text-white rounded-t-lg">
        <h1 className="text-xl font-semibold">Your Cart</h1>
        <FaCircleXmark
          className="text-2xl cursor-pointer hover:text-gray-200 transition duration-300"
          onClick={onClose}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
        <p className="text-lg mb-4">
          Oops! It looks like your cart is empty for now.
        </p>
        <button
          className="bg-gradient-to-r from-[#82C408] to-green-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105 transition duration-300"
          onClick={onClose}
        >
          Browse Products
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-500 text-center">
        <p>
          Don’t forget to check out our latest collections for exciting deals!
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
