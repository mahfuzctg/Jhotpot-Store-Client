import { IProduct } from "@/src/types/schema";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";

const HomeProductCard = ({ singleProduct }: { singleProduct: IProduct }) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

  return (
    <div className="relative max-w-[350px] mx-auto space-y-4 rounded-xl border-t-4 border-[#82C408] p-4 shadow-lg md:w-[312px] bg-white group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-[275px] w-[306px] bg-gray-500 rounded-lg object-cover duration-300 group-hover:scale-110"
          src={singleProduct.image[0]}
          alt={singleProduct.name}
        />

        {singleProduct.flashSale && (
          <button className="absolute top-1 left-1 rounded-xl bg-[#FFA900] px-3 py-1 font-medium duration-200 text-white">
            {singleProduct.discount}% Discount
          </button>
        )}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-60 h-[55px] rounded-t-full bg-[#82C408] text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white">
          <span>
            <IoMdCart className="text-xl" />
          </span>
          <span className="text-lg">Add to Cart</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="gap-2 flex flex-col">
        <h1 className="text-xl font-semibold text-[#82C408] flex-grow">
          {singleProduct.name}
        </h1>
        <div className="flex gap-2 items-center mt-3 mb-1">
          <span className="font-medium md:text-lg text-gray-700">Price:</span>
          <h2
            className={`font-medium md:text-lg text-gray-500 ${
              singleProduct?.flashSale && "line-through"
            }`}
          >
            <span>$</span> {singleProduct.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium md:text-lg text-[#82C408]">
              <span>$</span> {discountedPrice}
            </h2>
          )}
        </div>

        <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-[#82C408] text-[#82C408] before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#82C408] uppercase font-bold px-3">
          <Link href={`/productDetails?${params.toString()}`}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default HomeProductCard;
