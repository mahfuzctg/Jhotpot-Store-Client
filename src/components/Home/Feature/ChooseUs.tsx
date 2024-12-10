import {
  FaCarrot,
  FaHandsHelping,
  FaLeaf,
  FaShieldAlt,
  FaShoppingBasket,
  FaTruck,
} from "react-icons/fa";
import Title from "../../Sections/title";

export default function ChooseUs() {
  return (
    <div className="py-20 bg-gradient-to-r from-[#14B6A5] via-[#e0f7fa] to-[#14B6A5] text-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Title
            sub="Why Choose Jhotpot Store?"
            heading="Your Trusted Choice for Quality Products, Exceptional Value, and Unmatched Convenience"
          />
        </div>

        {/* Choose Us Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card Component */}
          {chooseUsFeatures.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={idx}
              className="relative p-6 bg-white shadow-xl rounded-lg group hover:scale-105 transform transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#14B6A5] opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <Icon className="text-6xl text-[#14B6A5] mx-auto mb-6 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Choose Us Features Data
const chooseUsFeatures = [
  {
    icon: FaCarrot,
    title: "Farm Fresh Vegetables",
    description: "Get the freshest and healthiest vegetables directly from the farm.",
  },
  {
    icon: FaLeaf,
    title: "100% Organic Products",
    description: "Enjoy the goodness of vegetables grown without chemicals.",
  },
  {
    icon: FaShoppingBasket,
    title: "Convenient Shopping",
    description: "Shop easily with a wide variety of vegetables at your fingertips.",
  },
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description: "Receive your orders quickly with our efficient delivery system.",
  },
  {
    icon: FaHandsHelping,
    title: "Friendly Support",
    description: "Our support team is here to help you with any inquiries.",
  },
  {
    icon: FaShieldAlt,
    title: "Safe Transactions",
    description: "Shop with confidence knowing your data is secure with us.",
  },
];
