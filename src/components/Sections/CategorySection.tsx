// components/CategorySection.tsx

import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Fresh & Seasonal Vegetables
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Browse through our top categories of fresh, healthy, and seasonal
          vegetables.
        </p>

        {/* Grid layout for categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Category Card 1 */}
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <Link href="/category/leafy-greens">
              <div>
                <Image
                  src="https://via.placeholder.com/300x200.png?text=Leafy+Greens"
                  alt="Leafy Greens"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    Leafy Greens
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Spinach, Kale, Lettuce, and more.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Category Card 2 */}
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <Link href="/category/root-vegetables">
              <div>
                <Image
                  src="https://via.placeholder.com/300x200.png?text=Root+Vegetables"
                  alt="Root Vegetables"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    Root Vegetables
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Carrots, Beets, Potatoes, and more.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Category Card 3 */}
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <Link href="/category/cruciferous-vegetables">
              <div>
                <Image
                  src="https://via.placeholder.com/300x200.png?text=Cruciferous+Vegetables"
                  alt="Cruciferous Vegetables"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    Cruciferous Vegetables
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Broccoli, Cauliflower, Cabbage, and more.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Category Card 4 */}
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <Link href="/category/fruits-and-berries">
              <div>
                <Image
                  src="https://via.placeholder.com/300x200.png?text=Fruits+%26+Berries"
                  alt="Fruits & Berries"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    Fruits & Berries
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Tomatoes, Peppers, Berries, and more.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
