import React from "react";
import { FaCircleXmark } from "react-icons/fa6";
import {
  removeProduct,
  updateQuantity,
} from "@/src/lib/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  const { products, quantities, subtotal } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const increment = (id: string) => {
    const selectedProduct = products.find((item) => item.id === id);
    if (selectedProduct) {
      const currentQuantity = quantities[id] || 0;
      if (currentQuantity < selectedProduct.inStock) {
        dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
      } else {
        toast.error("Cannot add more than available stock.");
      }
    }
  };

  const decrement = (id: string) => {
    const currentQuantity = quantities[id];
    if (currentQuantity && currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      toast.error("Minimum quantity is 1.");
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeProduct(id));
    toast.success("Product removed from Cart!");
  };

  return (
    <div
      className="fixed top-0 right-0 w-full sm:w-2/5 md:w-1/4 h-full bg-white/70 backdrop-blur-lg text-gray-800 shadow-lg transform transition-transform duration-300 z-50 flex flex-col"
      aria-label="Cart Drawer"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#82C408] to-green-600 text-white rounded-t-lg">
        <h1 className="text-xl font-semibold">Your Cart</h1>
        <FaCircleXmark
          className="text-2xl cursor-pointer hover:text-gray-200 transition duration-300"
          onClick={onClose}
          aria-label="Close Cart"
        />
      </div>

      {/* Content with Scrolling */}
      <div className="flex-1 overflow-y-scroll p-6">
        {products?.length > 0 ? (
          <div className="w-full">
            {/* Cart Items */}
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-4 border-b"
              >
                <img
                  src={product.image || "/placeholder-image.png"}
                  className="w-16 h-16 object-contain rounded-lg"
                  alt={product.name}
                />
                <div className="ml-4 w-2/3">
                  <h2 className="text-sm font-semibold">{product.name}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2 border border-gray-400 rounded px-2">
                      <button
                        onClick={() => decrement(product.id)}
                        className="text-lg font-semibold text-gray-700 hover:text-green-600"
                        aria-label={`Decrease quantity for ${product.name}`}
                      >
                        -
                      </button>
                      <span className="text-lg">{quantities[product.id]}</span>
                      <button
                        onClick={() => increment(product.id)}
                        className="text-lg font-semibold text-gray-700 hover:text-green-600"
                        aria-label={`Increase quantity for ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-lg text-gray-800">
                      ${(product.price * (quantities[product.id] || 1)).toFixed(
                        2
                      )}
                    </span>
                    <FaCircleXmark
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="text-red-600 cursor-pointer text-xl"
                      aria-label={`Remove ${product.name} from cart`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg mb-4 text-center">Your Cart is currently empty</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white">
        {products.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Subtotal</h3>
            <p className="font-semibold text-gray-800">${subtotal.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#82C408] to-green-500 text-white px-6 py-2 rounded-full mt-4 hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <p>Don’t forget to check out our latest collections for exciting deals!</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
