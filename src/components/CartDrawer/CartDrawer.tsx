import { FaCircleXmark } from "react-icons/fa6";

const CartDrawer = () => {
  return (
    <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex flex-col">
      <div>
        <div className="mt-6 flex justify-between mx-5 items-center">
          <h1 className="text-4xl font-semibold text-white">Cart</h1>
          <div>
            <label htmlFor="my-drawer-4" className="drawer-button">
              <FaCircleXmark className="text-2xl text-white cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="divider" />
        <p className="text-lg ml-3">Your Cart is currently empty</p>
        {/* {product?.length > 0 ? (
          <div className="overflow-y-auto max-h-96">
            {product.map((singleProduct) => (
              <div key={singleProduct.id} className="flex border-b py-3">
                <img
                  src={singleProduct.image}
                  className="w-20 h-20 object-contain"
                />
                <div className="ml-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm md:text-base font-bold">
                      {singleProduct.name}
                    </h1>
                    <FaCircleXmark
                      onClick={() => handleRemoveFromCart(singleProduct.id)}
                      className="text-[#033955] cursor-pointer text-lg"
                    />
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <div className="flex items-center border border-gray-300 rounded mt-3">
                      <button
                        onClick={() => decrement(singleProduct.id)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">
                        {quantities[singleProduct.id]}
                      </span>
                      <button
                        onClick={() => increment(singleProduct.id)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm md:text-base font-bold mt-1">
                      ${singleProduct.price}.00
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg ml-3">Your Cart is currently empty</p>
        )} */}
      </div>
      {/* {product.length > 0 && (
        <div className="mt-auto">
          <div className="divider"></div>
          <div className="p-4">
            <h2 className="text-lg font-bold">SUBTOTAL</h2>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <label htmlFor="my-drawer-4" className="drawer-button">
            <span
              onClick={handleNavigate}
              className="w-full block text-center bg-[#e08534] btn-custom  cursor-pointer text-white py-2 mt-4 rounded-lg "
            >
              Check out
            </span>
          </label>
        </div>
      )} */}
    </div>
  );
};

export default CartDrawer;
