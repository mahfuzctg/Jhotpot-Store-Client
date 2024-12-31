/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import QuantitySelector from "@/src/components/ui/components/QuantitySelector";

import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FaCircleXmark, FaTruckFast } from "react-icons/fa6";
import { MdAssignmentReturn } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import WarningModal from "@/src/components/modal/WarningModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import Link from "next/link";
import { useGetReviewsByIdQuery } from "@/src/lib/redux/features/reviews/reviewApi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ReactStars from "react-stars";
import dynamic from "next/dynamic";
import { useAddRecentProductMutation, useGetAllProductsQuery, useGetSingleProductQuery } from "@/src/lib/redux/features/products/product.api";
import { addProduct, clearCart } from "@/src/lib/redux/features/products/product.slice";
import { IProduct, IReview } from "@/src/types/schema";

const Loading = dynamic(() => import("@/src/components/Loading/Loading"), {
  ssr: false,
});

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string | null>(null);
  const swiperRef = useRef(null);
  const isInView = useInView(swiperRef);

  useEffect(() => {
    const id = searchParams.get("product");
    setProductId(id);
  }, [searchParams]);

  const { data, isLoading } = useGetSingleProductQuery(productId ?? "", {
    skip: !productId,
  });

  const { data: productReview, isLoading: reviewLoading } =
    useGetReviewsByIdQuery(
      { productId: productId ?? "" },
      {
        skip: !productId,
      }
    );

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(data?.inventory || 0);
  const isDisabled = !(inStock && quantity);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const params = new URLSearchParams();
  params.set("shop", data?.vendor?.id);
  const [addRecentProduct] = useAddRecentProductMutation();
  const [activeTab, setActiveTab] = useState("Related Products");

  const { data: allProductsResponse, isLoading: allProductsLoading } =
    useGetAllProductsQuery(
      { category },
      {
        skip: !category,
      }
    );

  useEffect(() => {
    const addProduct = async () => {
      if (data) {
        try {
          const productInfo = { productId: data.id };
          const result = await addRecentProduct(productInfo).unwrap();
        } catch (error) {
          console.error("Failed to add recent product:", error);
        }
      }
    };

    if (data?.image?.length) {
      setSelectedImage(data.image[0]);
    }

    if (data?.inventory) {
      setInStock(data?.inventory);
    }

    if (data?.category) {
      setCategory(data?.category?.name);
    }

    addProduct();
  }, [data, addRecentProduct]);

  const increment = () => {
    if (inStock > 1) {
      setQuantity((prev) => prev + 1);
      setInStock((prev: number) => prev - 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      setInStock((prev: number) => prev + 1);
    }
  };

  const addProductToCart = () => {
    const productInfo = {
      id: data.id,
      name: data?.name,
      price: data?.price,
      quantity,
      image: data?.image[0],
      inStock,
      vendorId: data?.vendor?.id,
    };

    dispatch(addProduct(productInfo));
    toast.success("Product added to cart successfully.");
  };

  const handleAddToCart = () => {
    const existingVendorId = products[0]?.vendorId;

    if (existingVendorId && existingVendorId !== data?.vendor?.id) {
      setPendingProduct({
        id: data.id,
        name: data?.name,
        price: data?.price,
        quantity,
        image: data?.image[0],
        inStock,
        vendorId: data?.vendor?.id,
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

  const getCardCount = () => {
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    return 1; // sm and below
  };

  const renderLoadingCards = () => {
    const cardCount = getCardCount();
    return Array.from({ length: cardCount }).map((_, index) => (
      <SwiperSlide key={index}>
        <ProductLoading />
      </SwiperSlide>
    ));
  };

  const discountPercentage = (data?.discount ?? 0) / 100;
  const discountAmount = data?.price * discountPercentage;
  const discountedPrice = data?.flashSale
    ? data?.price - discountAmount
    : data?.price;

  console.log(productReview);
  // console.log(allProductsResponse);

  return (
    <div className="py-10">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col-reverse xl:flex-row px-14 gap-8 justify-center items-center xl:items-start xl:justify-start">
              <div className="flex flex-row xl:flex-col gap-5 lg:pl-5 xl:pl-0">
                {data?.image?.map((singleImage: string, index: number) => (
                  <div
                    key={index}
                    className={`relative rounded-lg border-2 cursor-pointer ${
                      singleImage === selectedImage
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(singleImage)}
                  >
                    <Image
                      src={singleImage}
                      alt="Product Image"
                      height={90}
                      width={90}
                      className="rounded-lg h-[120px] object-cover"
                    />
                    {singleImage === selectedImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
                    )}
                  </div>
                ))}
              </div>

              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Selected Product Image"
                  height={400}
                  width={400}
                  className="rounded-lg object-cover h-[450px]"
                />
              )}
            </div>
            <div className="flex-1 space-y-3 flex flex-col justify-center items-center lg:items-start my-8 lg:my-0">
              <h1 className="text-primary text-3xl md:text-4xl">
                {data?.name}
              </h1>
              <p className="text-gray-400 max-w-lg text-center lg:text-left">
                {data?.description}
              </p>
              <div className="flex text-gray-800  gap-2 items-end">
                <p
                  className={`text-${data?.flashSale ? "xl" : "3xl"} ${data?.flashSale && "line-through text-2xl"}`}
                >
                  <span>$</span>
                  {data?.price}
                </p>
                {data?.flashSale && (
                  <h2 className="font-medium text-3xl text-primary ml-3">
                    <span>$</span>
                    {discountedPrice}
                  </h2>
                )}
              </div>

              <p
                id="helper-text-explanation"
                className=" text-gray-800 text-2xl mt-5"
              >
                Select the quantity of products:
              </p>

              <div className="flex flex-col md:flex-row gap-6 md:gap-3 w-[70%] lg:w-11/12 mx-auto lg:mx-0">
                <div className="flex-1 mt-4 lg:mt-0">
                  <QuantitySelector
                    quantity={quantity}
                    increment={increment}
                    decrement={decrement}
                    inStock={inStock}
                  />
                </div>
                <div className="flex-1 flex items-end justify-center">
                  {isDisabled ? (
                    <button
                      disabled={isDisabled}
                      className="flex items-center gap-2 px-6 py-[10px]  rounded-lg w-full justify-center disabled:bg-gray-700 disabled:opacity-50"
                    >
                      <BsCart3 /> <span>Add to cart</span>
                    </button>
                  ) : (
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-button w-[280px] mx-auto lg:w-full lg:mx-auto"
                    >
                      <span
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 px-6 py-3  rounded-lg w-full justify-center cursor-pointer relative h-12 w-30 origin-top transform border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                      >
                        <BsCart3 className="font-bold" />{" "}
                        <span>Add to cart</span>
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <h1 className="text-gray-800 my-3 text-2xl">
                <span className="font-bold">Category:</span>{" "}
                <span className="text-gray-400">{data?.category?.name}</span>
              </h1>

              <h1 className="text-gray-800 my-3 text-2xl">
                <span className="font-bold">Shop Name:</span>{" "}
                <span
                  className="relative inline-block text-2xl font-medium text-gray-400
                   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                   after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100
                   after:transition-transform after:duration-300 after:ease-out after:origin-left cursor-pointer"
                >
                  <Link href={`/shop?${params.toString()}`}>
                    {data?.vendor?.shopName}
                  </Link>
                </span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-2">
                {inStock ? (
                  <div className="flex items-center space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-xl text-primary">
                      <AiFillCheckCircle />
                    </span>
                    <span className="font-semibold text-primary">
                      Item Available
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-xl text-primary">
                      <FaCircleXmark />
                    </span>
                    <span className="font-semibold text-primary">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-xl text-primary">
                    <FaTruckFast />
                  </span>
                  <span className="font-semibold text-primary">
                    Free Shipping
                  </span>
                </div>
                <div className="flex justify-center items-center xl:space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-xl text-primary">
                    <MdAssignmentReturn />
                  </span>
                  <span className="font-semibold text-primary">
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-14">
            <div className="flex justify-center gap-8 mb-8">
              <button
                className={`pb-2 text-lg font-medium ${
                  activeTab === "Related Products"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("Related Products")}
              >
                Related Products
              </button>
              <button
                className={`pb-2 text-lg font-medium ${
                  activeTab === "Reviews"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("Reviews")}
              >
                Reviews
              </button>
            </div>

            {/* Tabs Content */}
            <div>
              {activeTab === "Related Products" && (
                <div>
                  {/* Your Code Tab Content */}
                  <div className="w-full lg:w-11/12 xl:w-4/5  mx-auto my-8">
                    <Swiper
                      spaceBetween={30}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper"
                      breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                    >
                      {allProductsLoading
                        ? renderLoadingCards()
                        : (() => {
                            const filteredProducts =
                              allProductsResponse?.data?.filter(
                                (singleProduct: IProduct) =>
                                  singleProduct?.id !== data?.id
                              );

                            if (filteredProducts?.length === 0) {
                              return (
                                <div className="text-center text-gray-800 text-2xl font-bold mt-6">
                                  Sorry, no related products available.
                                </div>
                              );
                            }

                            // Render the filtered products
                            return filteredProducts?.map(
                              (singleProduct: IProduct, index: number) => (
                                <SwiperSlide
                                  key={index}
                                  className="px-10 md:px-5 lg:px-0"
                                >
                                  <HomeProductCard
                                    singleProduct={singleProduct}
                                  />
                                </SwiperSlide>
                              )
                            );
                          })()}
                    </Swiper>
                  </div>
                </div>
              )}

              {activeTab === "Reviews" && (
                <div>
                  {productReview?.length === 0 ? (
                    <div className="text-center text-gray-800 text-2xl font-bold mt-6">
                      Sorry, no product review available.
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <motion.div
                        ref={swiperRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView || data ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.8,
                          delay: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <div>
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={
                              productReview?.length % 2 === 0 ? 2 : 1
                            }
                            slidesPerGroup={
                              productReview?.length % 2 === 0 ? 2 : 1
                            }
                            autoplay={{
                              delay: 6000,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                            breakpoints={{
                              350: {
                                slidesPerView:
                                  productReview?.length % 2 === 0 ? 2 : 1, // For small devices
                                slidesPerGroup: 1,
                              },
                              800: {
                                slidesPerView: 2, // For medium devices
                                slidesPerGroup: 2,
                              },
                            }}
                          >
                            {productReview?.map(
                              (singleReview: IReview, index: number) => (
                                <SwiperSlide key={index}>
                                  <div className="mt-8 px-10 pb-12 border-2 border-primary rounded-lg">
                                    <div className="flex items-center gap-10 pt-8">
                                      <div className="flex">
                                        <img
                                          src={
                                            singleReview?.customer?.profilePhoto
                                          }
                                          alt="profile"
                                          className="rounded-full w-20 h-20 object-cover object-top"
                                        />
                                        <svg
                                          viewBox="-1 0 19 19"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="cf-icon-svg w-10 -ml-5"
                                        >
                                          <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                          />
                                          <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <g id="SVGRepo_iconCarrier">
                                            <path
                                              d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917z"
                                              fill="#f5840c"
                                            />

                                            <path
                                              d="M7.659 9.733a3.333 3.333 0 0 0-.362-2.507 2.543 2.543 0 0 0-.908-.851 2.504 2.504 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.23 2.23 0 0 0 2.515.211 3.335 3.335 0 0 1-1.655 1.403 3.942 3.942 0 0 1-.485.164 1.84 1.84 0 0 0-.445.128.567.567 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113 5.2 5.2 0 0 0 .475-.161A4.37 4.37 0 0 0 7.57 10.07q.053-.167.09-.337zm6.34 0a3.331 3.331 0 0 0-.362-2.507 2.54 2.54 0 0 0-.908-.851 2.502 2.502 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.229 2.229 0 0 0 2.515.211 3.334 3.334 0 0 1-1.654 1.403 3.96 3.96 0 0 1-.486.164 1.847 1.847 0 0 0-.445.128.568.568 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113q.241-.07.475-.161a4.37 4.37 0 0 0 2.617-2.708q.052-.167.089-.337z"
                                              fill="#ffffff"
                                            />
                                          </g>
                                        </svg>
                                      </div>
                                      <div>
                                        <h1 className="text-2xl font-semibold text-gray-800">
                                          {singleReview?.customer?.name}
                                        </h1>
                                        <ReactStars
                                          count={5}
                                          value={singleReview?.rating}
                                          size={24}
                                          color2={"#f5840c"}
                                          edit={false}
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-8">
                                      <p className="md:text-lg text-left text-gray-600">
                                        &quot;{singleReview?.comment}&quot;
                                      </p>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <WarningModal
            isOpen={isModalOpen}
            onConfirm={handleConfirmReplace}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;