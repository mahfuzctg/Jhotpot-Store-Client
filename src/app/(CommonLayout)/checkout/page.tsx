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
import { useDisclosure } from "@nextui-org/modal";
import { clearCoupon, selectAppliedCoupon } from "@/src/lib/redux/features/coupon/couponSlice";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { usePlaceOrderMutation } from "@/src/lib/redux/features/orders/order.api";
import { clearCart, removeProduct } from "@/src/lib/redux/features/products/product.slice";
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
      vendorId: stateProducts[0].vendorId,
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

    try {
      const response = await placeOrder(orderInfo);
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
        phone: userData.userData.phone || "",
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
            <h1 className="mt-2 text-4xl font-bold text-white text-center">
              Checkout Items
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-white">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-white"
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
                      className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-white"
                    />
                    <p className="text-sm text-red-600 font-medium  mt-2">
                      {errors?.email?.message as ReactNode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-primary pt-10">
                <h2 className="text-lg font-medium text-white">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-white"
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
                        className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-white"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.name?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-white"
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
                        className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-white"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.address?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white"
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
                        className="block w-full bg-transparent p-2 border border-gray-500 text-gray-900 placeholder-slate-400 outline-none focus:ring-2 focus:border-green-600 focus:ring-green-500 rounded-lg focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <fieldset>
                  <div className="flex gap-3 flex-col md:flex-row">
                    <legend className="text-lg font-medium text-white">
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
                    <div className="sm:col-span-2 flex gap-3 items-center">
                      <input
                        type="checkbox"
                        onChange={() => setTogglePayment(!togglePayment)}
                        className="h-5 w-5 border-gray-300 rounded-lg text-primary focus:ring-2 focus:ring-primary"
                      />
                      <label className="text-sm font-medium text-white">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="lg:col-span-1 mt-10">
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-lg font-medium text-white">Order Summary</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex justify-between text-sm text-white">
                    <span>Total Products:</span>
                    <span>{stateProducts?.length} Products</span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Taxes:</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  {appliedCoupon?.code && (
                    <div className="flex justify-between text-sm text-white">
                      <span>Discount:</span>
                      <span>
                        {appliedCoupon?.discountValue}% OFF
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-white">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <MainModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={() => {
          dispatch(clearCoupon());
        }}
        title="Remove Applied Coupon?"
      >
        <div>
          <p>
            Are you sure you want to remove the applied coupon? This action is
            irreversible.
          </p>
        </div>
      </MainModal>

      <CouponModal />
    </div>
  );
};

export default CheckOut;
