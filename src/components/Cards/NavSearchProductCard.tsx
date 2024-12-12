import { IProduct } from "@/src/types/schema";
import Link from "next/link";

const NavSearchProductCard = ({
  singleProduct,
}: {
  singleProduct: IProduct;
}) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

  return (
    <div className="relative max-w-[180px] space-y-3 rounded-lg p-3 shadow-md md:w-[180px] bg-[#27272c] group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-[150px] w-[160px] rounded-lg object-cover duration-300 group-hover:scale-110"
          src={singleProduct.image[0]}
          alt={singleProduct.name}
        />

        {singleProduct.flashSale && (
          <button className="absolute top-2 right-2 rounded-lg bg-primary px-2 py-1 text-sm font-medium duration-200 text-white">
            {singleProduct.discount}% off
          </button>
        )}
      </div>

      {/* Details Section */}
      <div className="gap-2 flex flex-col">
        <h1 className="font-semibold text-white flex-grow text-sm h-9">
          {singleProduct.name}
        </h1>
        <div className="flex gap-1 items-center mt-2 mb-1">
          <span className="font-medium text-sm text-white">Price:</span>
          <h2
            className={`font-medium text-sm text-white ${singleProduct?.flashSale && "line-through"}`}
          >
            <span>$</span>
            {singleProduct.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium text-sm text-primary">
              <span>$</span>
              {discountedPrice}
            </h2>
          )}
        </div>

        <Link href={`/productDetails?${params.toString()}`}>
          <button className="relative h-8 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase text-xs font-bold px-2">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavSearchProductCard;