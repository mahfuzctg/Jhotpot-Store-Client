"use client";

import { useDeleteCouponMutation } from "@/src/lib/redux/features/coupon/couponApi";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";

import { useDisclosure } from "@nextui-org/modal";
import { ICoupon } from "@/src/types/schema";
import MainModal from "../modal/Reusable/MainModal";
import UpdateCouponModal from "../modal/Reusable/UpdateCouponModal";

const DashboardCouponCard = ({ singleCoupon }: { singleCoupon: ICoupon }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    toast.loading("Deleting Coupon...");
    setDeleteModalOpen(false);

    try {
      const res = await deleteCoupon(singleCoupon?.id).unwrap();
      if (res) {
        toast.dismiss();
        toast.success("Coupon deleted successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container border border-primary text-gray-800 p-5 rounded-lg shadow-lg bg-white max-w-md mx-auto relative">
      <div className="absolute right-2 top-3">
        <Dropdown closeOnSelect={true}>
          <DropdownTrigger className="absolute top-2 right-1 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5840c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="edit">
              <span
                onClick={onOpen}
                className="flex gap-2 items-center text-primary"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f5840c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </span>
                <span>Edit Coupon</span>
              </span>
            </DropdownItem>

            <DropdownItem key="delete">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteModalOpen(true);
                }}
                className="flex gap-2 items-center"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f5840c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </span>
                <span className="text-primary">Delete Coupon</span>
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="text-lg mb-4">
        {singleCoupon?.discountType === "PERCENTAGE" ? (
          <p>
            Get{" "}
            <span className="text-primary font-bold">
              {singleCoupon.discountValue}% OFF
            </span>{" "}
            your next purchase!
          </p>
        ) : (
          <p>
            Get{" "}
            <span className="text-primary font-bold">
              <span>$</span>
              {singleCoupon.discountValue} OFF
            </span>{" "}
            your next purchase!
          </p>
        )}
      </div>
      <div className="text-gray-700 mb-4">Use coupon code:</div>
      <div className="bg-gray-50 text-gray-800 rounded-lg px-4 py-2 ">
        <span className="text-2xl font-semibold">{singleCoupon.code}</span>
      </div>
      <div className="text-sm mt-3">
        <p>
          Valid until{" "}
          <span className="font-semibold text-primary">
            {format(new Date(singleCoupon.endDate), "MMMM dd, yyyy")}
          </span>
        </p>
        <p>*Terms and conditions apply.</p>
      </div>

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UpdateCouponModal singleCoupon={singleCoupon} />
      </MainModal>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Are you sure you want to delete this coupon?
            </h3>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-gray-800 hover:bg-primary hover:text-white uppercase font-bold px-3 transition-all duration-500 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white uppercase font-bold px-3 transition-all duration-500 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCouponCard;
