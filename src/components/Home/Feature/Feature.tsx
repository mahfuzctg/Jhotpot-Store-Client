import {
  FaCarrot,
  FaHandsHelping,
  FaLeaf,
  FaShieldAlt,
  FaShoppingBasket,
  FaTruck,
} from "react-icons/fa";

export default function FeatureSection() {
  return (
    <div className="py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Shop with Jhotpot Store?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaCarrot className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                Farm Fresh Vegetables
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Get the freshest and healthiest vegetables directly from the
                farm.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaLeaf className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                100% Organic Products
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Enjoy the goodness of vegetables grown without chemicals.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaShoppingBasket className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                Convenient Shopping
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Shop easily with a wide variety of vegetables at your
                fingertips.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaTruck className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                Fast Delivery
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Receive your orders quickly with our efficient delivery system.
              </p>
            </div>
          </div>
          {/* Card 5 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaHandsHelping className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                Friendly Support
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Our support team is here to help you with any inquiries.
              </p>
            </div>
          </div>
          {/* Card 6 */}
          <div className="group relative p-6 text-center bg-white shadow-lg rounded-lg border-b-4 border-[#1A706E] overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FaShieldAlt className="text-5xl text-[#1B6264] mx-auto mb-4 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-500">
                Safe Transactions
              </h3>
              <p className="text-sm group-hover:text-gray-300 transition-colors duration-500">
                Shop with confidence knowing your data is secure with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
