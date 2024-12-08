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
    <div className="relative max-w-[350px] space-y-4 rounded-lg p-4 shadow-lg md:w-[312px] bg-[#18181B] group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-[275px] w-[306px] rounded-lg object-cover duration-300 group-hover:scale-110"
          src={singleProduct.image[0]}
          alt={singleProduct.name}
        />

        {singleProduct.flashSale && (
          <button className="absolute top-3 right-3 rounded-xl bg-primary px-3 py-1 font-medium duration-200 text-white">
            {singleProduct.discount}% off
          </button>
        )}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-40 h-[75px] rounded-t-full bg-primary text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white">
          <span>
            <IoMdCart className="text-xl" />
          </span>
          <span className="text-lg">Add to Cart</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="gap-2 flex flex-col">
        <h1 className="text-xl font-semibold text-white flex-grow">
          {singleProduct.name}
        </h1>
        <div className="flex gap-2 items-center mt-3 mb-1">
          <span className="font-medium md:text-lg text-white">Price:</span>
          <h2
            className={`font-medium md:text-lg text-white ${
              singleProduct?.flashSale && "line-through"
            }`}
          >
            <span>$</span> {singleProduct.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium md:text-lg text-primary">
              <span>$</span> {discountedPrice}
            </h2>
          )}
        </div>

        <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
          <Link href={`/productDetails?${params.toString()}`}>
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomeProductCard;
