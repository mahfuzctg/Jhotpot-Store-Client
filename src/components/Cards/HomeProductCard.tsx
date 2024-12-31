"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addProduct,
  clearCart,
} from "@/src/lib/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { IProduct } from "@/src/types/schema";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import WarningModal from "../modal/WarningModal";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  singleProduct: IProduct;
  isCompareActive?: boolean;
  compareProducts?: IProduct[];
  onCompareCheckbox?: (checked: boolean, product: IProduct) => void;
}

const HomeProductCard = ({
  singleProduct,
  isCompareActive,
  compareProducts,
  onCompareCheckbox,
}: ProductCardProps) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const { userData } = useUserDetails();
  const router = useRouter();
  const isChecked =
    compareProducts && compareProducts?.some((p) => p.id === singleProduct.id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCompareCheckbox) {
      onCompareCheckbox(e.target.checked, singleProduct);
    }
  };

  const addProductToCart = () => {
    if (!userData?.userData) {
      router.push("/login");
      return;
    }

    const productInfo = {
      id: singleProduct.id,
      name: singleProduct?.name,
      price: singleProduct?.price,
      quantity: 1,
      image: singleProduct?.image[0],
      inStock: singleProduct.inventory - 1,
      vendorId: singleProduct?.vendor?.id,
    };

    dispatch(addProduct(productInfo));
    toast.success("Product added to cart successfully!");
  };

  const handleAddToCart = () => {
    const existingVendorId = products[0]?.vendorId;

    if (existingVendorId && existingVendorId !== singleProduct?.vendor?.id) {
      setPendingProduct({
        id: singleProduct.id,
        name: singleProduct?.name,
        price: singleProduct?.price,
        quantity: 1,
        image: singleProduct?.image[0],
        inStock: singleProduct.inventory - 1,
        vendorId: singleProduct?.vendor?.id,
      });
      setIsModalOpen(true);
    } else {
      addProductToCart();
    }
  };

  const handleConfirmReplace = () => {
    dispatch(clearCart());
    addProductToCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setPendingProduct(null);
    setIsModalOpen(false);
  };

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

  return (
    <div className="flex justify-center items-center">
      <div className="relative max-w-[300px] w-full sm:w-[85%] md:w-[312px] lg:w-[250px] space-y-4  p-4 bg-[#FFFFFF] border border-[#ddf5b8] rounded-lg group">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Discount Badge */}
          {singleProduct.flashSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-md z-10">
              -{singleProduct.discount}%
            </div>
          )}
          {/* Cart Icon */}
          <div
            onClick={handleAddToCart}
            className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 bg-white border border-[#6DAD02] rounded-full text-[#6DAD02] cursor-pointer shadow-md hover:scale-105 duration-300 z-10"
          >
            <FiShoppingCart className="text-lg" />
          </div>
          {/* Product Image */}
          <img
            className="h-[200px] w-full rounded-lg object-cover duration-300 group-hover:scale-110"
            src={singleProduct.image[0]}
            alt={singleProduct.name}
          />
        </div>

        {/* Comparison checkbox */}
        {isCompareActive && (
          <div className="flex gap-3 items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border border-[#6DAD02] ${
                  isChecked ? "bg-[#6DAD02]" : "bg-gray-300"
                }`}
              >
                {isChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.2l-3.5-3.5L4 14l5 5L20 8.6 18.5 7l-9.5 9.2z" />
                  </svg>
                )}
              </div>
            </label>

            <p className="text-black font-medium">Select to Compare</p>
          </div>
        )}

        {/* Details Section */}
        <div className="gap-2 flex flex-col mt-4">
          <h1 className="text-lg font-semibold text-black">
            {singleProduct?.name}
          </h1>
          <p className="text-black">{singleProduct?.category?.name}</p>

          <div className="flex justify-between items-center">
            <div>
            <span className="text-lg font-bold text-red-500">
        ${discountedPrice?.toFixed(2)}
      </span>
              {singleProduct.flashSale && (
                <span className="text-sm font-semibold text-gray-400 line-through ml-2">
                  ${singleProduct.price}
                </span>
              )}
            </div>
          </div>

          <Link href={`/productDetails?${params.toString()}`}>
            <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-[#e4f5c7] text-[#6DAD02] before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#6DAD02] uppercase font-bold px-3">
              View Details
            </button>
          </Link>
        </div>

        <WarningModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmReplace}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default HomeProductCard;
