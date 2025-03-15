/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
"use client";


import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCircleXmark } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiCoupon2Fill } from "react-icons/ri";
import { useDisclosure } from "@nextui-org/modal";

import {
  clearCoupon,
  selectAppliedCoupon,
} from "@/src/lib/redux/features/coupon/couponSlice";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { clearCart, removeProduct } from "@/src/lib/redux/features/products/product.slice";
import { usePlaceOrderMutation } from "@/src/lib/redux/features/orders/order.api";
import MainModal from "@/src/components/modal/Reusable/MainModal";
import CouponModal from "@/src/components/modal/Reusable/CouponModal";


const CheckOut = () => {
  const { userData } = useUserDetails();
  const { handleSubmit, formState, register, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });
  const { errors } = formState;
  const dispatch = useAppDispatch();
  const [togglePayment, setTogglePayment] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placeOrder] = usePlaceOrderMutation();

  const {
    products: stateProducts,
    quantities,
    subtotal,
  } = useAppSelector((state) => state.products);

  const appliedCoupon = useAppSelector(selectAppliedCoupon);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeProduct(id));
    dispatch(clearCoupon());
    toast.success("Product removed successfully!");
  };

  const shipping = subtotal * 0.05;
  const taxes = subtotal * 0.02;
  const primaryTotal = subtotal + shipping + taxes;
  const discount =
    appliedCoupon && appliedCoupon?.discountType === "PERCENTAGE"
      ? primaryTotal * (appliedCoupon?.discountValue / 100)
      : (appliedCoupon?.discountValue ?? 0);
  const total = primaryTotal - discount;

  const handlePlaceOrder = async (formData: any) => {
    if (!togglePayment) {
      return toast.error("Please select delivery method");
    }

    toast.loading("Placing order...");

    const transactionId = `TXN-${Date.now()}`;

    const orderInfo = {
      vendorId: stateProducts[0]?.vendorId,
      transactionId,
      totalPrice: total,
      deliveryAddress: formData.address || userData?.userData?.address,
      orderDetails: stateProducts?.map((singleProduct) => ({
        productId: singleProduct.id,
        quantity: singleProduct.quantity,
        pricePerUnit: singleProduct.price,
      })),
      ...(appliedCoupon?.code && { coupon: appliedCoupon.code }),
    };

    console.log(orderInfo);

    try {
      const response = await placeOrder(orderInfo);
      console.log(response.data);

      if (response?.data?.paymentSession?.result) {
        toast.dismiss();
        dispatch(clearCart());
        dispatch(clearCoupon());
        window.location.href = response.data.paymentSession.payment_url;
      } else {
        toast.error("Failed to process the payment!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (userData?.userData) {
      reset({
        name: userData.userData.name || "",
        email: userData.userData.email || "",
        address: userData.userData.address || "",
        phone: userData.userData.phone || "01889-656320",
      });
    }
  }, [userData, reset]);

  return (
    <div>
      <main className="max-w-7xl mx-auto pt-10 lg:pt-5 pb-24 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit(handlePlaceOrder)}
          className="max-w-2xl mx-auto lg:max-w-none"
        >
          <div className="mb-8">
            <div className="flex justify-center items-center gap-2 uppercase mt-6">
              <PiStarFourFill className="text-primary" />
              <span className="font-medium text-primary">
                Complete Your Purchase
              </span>
            </div>
            <h1 className="mt-2 text-4xl font-bold text-gray-800 text-center">
              Checkout Items
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "User Email is required",
                        },
                      })}
                      readOnly
                      className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-[#82C408] transition placeholder-slate-400 focus:ring-2 focus:border-[#82C408] rounded-lg focus:ring-primary text-gray-800"
                    />
                    <p className="text-sm text-red-600 font-medium  mt-2">
                      {errors?.email?.message as ReactNode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="  pt-10">
                <h2 className="text-lg font-medium text-gray-800">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                        })}
                        readOnly
                        className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-[#82C408] transition placeholder-slate-400 focus:ring-2 focus:border-[#82C408] rounded-lg focus:ring-primary text-gray-800"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.name?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Delivery Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("address", {
                          required: {
                            value: true,
                            message: "Address is required",
                          },
                        })}
                        className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-[#82C408] transition placeholder-slate-400 focus:ring-2 focus:border-[#82C408] rounded-lg focus:ring-primary text-gray-800"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.address?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Phone Number is required",
                          },
                        })}
                        readOnly
                        className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-[#82C408] transition placeholder-slate-400 focus:ring-2 focus:border-[#82C408] rounded-lg focus:ring-primary text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" pt-10">
                <fieldset>
                  <div className="flex gap-3 flex-col md:flex-row">
                    <legend className="text-lg font-medium text-gray-800">
                      Delivery method
                    </legend>
                    {!togglePayment && (
                      <div className="flex gap-2 items-center">
                        <RiErrorWarningFill className="text-primary" />
                        <h1 className="text-sm text-primary">
                          Please select delivery method
                        </h1>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <label
                      className={`relative rounded-lg shadow-sm p-4 flex focus:outline-none cursor-not-allowed border border-[#82C408]`}
                    >
                      <div className="flex-1 flex">
                        <div className="flex flex-col">
                          <span
                            id="delivery-method-0-label"
                            className="block text-sm font-medium text-gray-800"
                          >
                            {" "}
                            Cash on Delivery{" "}
                          </span>
                          <span
                            id="delivery-method-1-description-0"
                            className="mt-1 flex items-center text-sm text-gray-400"
                          >
                            {" "}
                            Currently Unavailable{" "}
                          </span>
                          <span
                            id="delivery-method-0-description-1"
                            className="mt-6 text-sm font-medium text-gray-800"
                          >
                            <span className="line-through">
                              <span>$</span>
                              <span>250.00</span>
                            </span>
                          </span>
                        </div>
                      </div>

                      <FaCircleXmark className="text-lg text-[#82C408]" />

                      <div
                        className="absolute -inset-px rounded-lg border-2 border-primary pointer-events-none"
                        aria-hidden="true"
                      />
                    </label>

                    <label
                      onClick={() => setTogglePayment(!togglePayment)}
                      className={`relative rounded-lg shadow-sm p-4 flex focus:outline-none cursor-pointer ${
                        togglePayment ? "bg-primary" : ""
                      }`}
                    >
                      <div className="flex-1 flex">
                        <div className="flex flex-col">
                          <span
                            id="delivery-method-1-label"
                            className="block text-sm font-medium text-gray-800"
                          >
                            {" "}
                            AamarPay Payment{" "}
                          </span>
                          <span
                            id="delivery-method-0-description-0"
                            className="mt-1 flex items-center text-sm text-gray-400"
                          >
                            {" "}
                            4–10 business days{" "}
                          </span>
                          <span
                            id="delivery-method-1-description-1"
                            className="mt-6 text-sm font-medium text-gray-800"
                          >
                            {" "}
                            <span>
                              <span>$</span>
                              <span>{shipping.toFixed(2)}</span>
                            </span>
                          </span>
                        </div>
                      </div>

                      <svg
                        className={`h-5 w-5 text-[#82C408] ${togglePayment && "text-gray-800"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <div
                        className="absolute -inset-px rounded-lg border-2 border-primary pointer-events-none"
                        aria-hidden="true"
                      />
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-800">Order summary</h2>

              <div className="mt-2 border border-[#82C408] rounded-lg shadow-sm">
                <div>
                  {stateProducts.length > 0 &&
                    stateProducts.map((singleProduct) => (
                      <div key={singleProduct.id}>
                        <ul role="list" className="divide-y divide-gray-200">
                          <li className="flex py-6 px-4 sm:px-6">
                            <div className="flex-shrink-0">
                              <img
                                src={singleProduct.image}
                                alt=""
                                className="w-20 rounded-md object-contain"
                              />
                            </div>

                            <div className="ml-6 flex-1 flex flex-col">
                              <div className="flex">
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-sm">
                                    <a
                                      href="#"
                                      className="text-gray-800 text-lg font-semibold"
                                    >
                                      {singleProduct.name}{" "}
                                    </a>
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-800">
                                    x{quantities[singleProduct.id]}
                                  </p>
                                </div>

                                <div className="ml-4 flex-shrink-0 flow-root">
                                  <FaCircleXmark
                                    onClick={() =>
                                      handleRemoveFromCart(singleProduct.id)
                                    }
                                    className="text-[#82C408] cursor-pointer text-lg"
                                  />
                                </div>
                              </div>

                              <div className="flex-1 pt-2 flex items-end justify-between">
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                  <span>$</span>
                                  {singleProduct.price}.00
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  {stateProducts?.length > 0 && !appliedCoupon && (
                    <div
                      onClick={onOpen}
                      className={`flex gap-2 items-center text-primary font-bold ${stateProducts?.length > 0 && "border-t border-[#82C408]"} px-4 sm:px-6 pt-4 cursor-pointer hover:underline`}
                    >
                      <span>
                        <RiCoupon2Fill className="text-primary" />
                      </span>
                      <span>Want to save? Apply a coupon.</span>
                    </div>
                  )}

                  <div
                    className={`${stateProducts?.length > 0 && appliedCoupon && "border-t border-[#82C408]"}  py-6 px-4 space-y-6 sm:px-6 `}
                  >
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-800">
                        <span>$</span>
                        {subtotal.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-800">
                        <span>$</span>
                        {shipping.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-800">
                        <span>$</span>
                        {taxes.toFixed(2)}
                      </dd>
                    </div>
                    {appliedCoupon && (
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">
                          Coupon Discount{" "}
                          <span className="text-primary ml-3 font-semibold">
                            {`(${appliedCoupon?.code})`}
                          </span>
                        </dt>{" "}
                        <dd className="text-sm font-medium text-gray-800">
                          <span>$</span>
                          {discount.toFixed(2)}
                        </dd>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-[#82C408] pt-6">
                      <dt className="text-base font-medium  text-gray-800">
                        Total
                      </dt>
                      <dd className="text-base font-medium text-gray-800">
                        <span>$</span>
                        {total.toFixed(2)}
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#82C408] py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="relative h-12 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <MainModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <CouponModal />
        </MainModal>
      </main>
    </div>
  );
};

export default CheckOut;