import { IProduct } from "@/src/types/schema";
import { IoMdCart } from "react-icons/io";

const ProductSection = ({ singleProduct }: { singleProduct: IProduct }) => {
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
          <button className="absolute top-3 right-3 rounded-xl bg-primary px-3 py-1 font-medium duration-200">
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
      <div className="grid gap-2">
        <h1 className="text-xl font-semibold">{singleProduct.name}</h1>
        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-medium md:text-xl text-white">
            <span>$</span> {singleProduct.price}
          </h2>
          <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
