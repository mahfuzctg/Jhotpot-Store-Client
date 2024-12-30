"use client";

import { FC } from "react";
import Title from "../../Sections/title";

const CustomerReviewSection: FC = () => {
  const reviews = [
    {
      name: "Ahmed Khan",
      profileImage: "https://i.postimg.cc/L5R9JK3j/premium-photo-1689568126014-06fea9d5d341.jpg", 
      review: "Excellent service and great product quality. I'm very satisfied with my purchase!",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      review: "Good quality, but shipping took longer than expected. Overall, happy with my experience.",
      rating: 4,
    },
    {
      name: "Omar Ibrahim",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg", 
      review: "Customer support was really helpful when I had an issue with my order. Will shop again!",
      rating: 5,
    },
    {
      name: "Aisha Mohammed",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg", 
      review: "The product is good, but the packaging could be better. Otherwise, I'm satisfied.",
      rating: 4,
    },
    {
      name: "Zayd Nasir",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", 
      review: "Great experience! The product is exactly as described, and delivery was on time.",
      rating: 5,
    },
    {
      name: "Layla Tariq",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      review: "The customer service was responsive, and the product exceeded my expectations. Highly recommend!",
      rating: 5,
    },
    {
      name: "Bilal Khan",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg", 
      review: "Nice product, though I expected a little better quality. Still, satisfied with my purchase.",
      rating: 4,
    },
    {
      name: "Mariam Abdullah",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg", 
      review: "Fast shipping and excellent product quality. Will definitely buy again.",
      rating: 5,
    },
    {
      name: "Imran Yusuf",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg", 
      review: "The product is good but was slightly damaged during transit. Overall, happy with the service.",
      rating: 4,
    },
    {
      name: "Noor Hassan",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
      review: "Amazing quality and timely delivery. Very satisfied with my order!",
      rating: 5,
    },
  ];

  return (
    <section className="py-10 px-6 md:py-16 md:px-12 lg:px-20 bg-[#FDFFF8] overflow-hidden">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Title
            heading="See what our customers are saying!"
            sub="Customer Reviews"
          />
        </div>

        {/* Review Cards */}
        <div className="mt-8 overflow-hidden relative">
          <div className="flex animate-scroll-right space-x-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{ marginRight: "20px" }} // Adds space between cards
              >
                <div className="flex items-center mb-6">
                  <img
                    src={review.profileImage}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#82C408] shadow-md"
                  />
                  <div className="ml-6">
                    <h3 className="font-semibold text-gray-800 text-xl">{review.name}</h3>
                    <div className="flex items-center mt-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CustomerReviewSection;
