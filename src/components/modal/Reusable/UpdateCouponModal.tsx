"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import SHForm from "../../form/SHForm";
import SHInput from "../../form/SHInput";
import SHSelect from "../../form/SHSelect";
import SHDatePicker from "../../form/SHDatePicker";
import { parseISO, format } from "date-fns";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/src/lib/redux/features/coupon/couponApi";
import toast from "react-hot-toast";

import { ICoupon } from "@/src/types/schema";

interface UpdateCouponModalProps {
  onClose?: () => void;
  singleCoupon: ICoupon;
}

const UpdateCouponModal = ({
  onClose,
  singleCoupon,
}: UpdateCouponModalProps) => {
  const discountType = [
    { key: "PERCENTAGE", label: "PERCENTAGE" },
    { key: "FIXED", label: "FIXED" },
  ];

  const [updateCoupon] = useUpdateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Updating coupon...");

    const { endDate, discountValue, ...remaining } = data;

    const parsedDate = parseISO(endDate);

    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'23:59:59'Z'");

    const couponInfo = {
      code: data?.code ? data.code : singleCoupon?.code,
      discountType: data?.discountType
        ? data?.discountType
        : singleCoupon?.discountType,
      endDate: formattedDate,
      discountValue: data?.discountValue
        ? Number(discountValue)
        : singleCoupon?.discountValue,
    };
    try {
      const res = await updateCoupon({
        id: singleCoupon?.id,
        couponInfo,
      }).unwrap();
      if (res) {
        toast.dismiss();
        toast.success("Coupon updated successfully!");
        onClose && onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-center justify-center text-primary font-bold text-3xl`}
      >
        <span>
          <RiCoupon2Fill className="text-primary text-3xl" />
        </span>
        <span>Update Coupon</span>
      </div>

      <div className="my-10">
        <SHForm
          defaultValues={{
            code: singleCoupon?.code,
            discountType: singleCoupon?.discountType,
            discountValue: singleCoupon?.discountValue,
          }}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-6">
            <div className="">
              <SHInput
                name="code"
                label="Coupon Code"
                type="text"
                variant="bordered"
              />
            </div>
            <div>
              <SHSelect
                name="discountType"
                label="Selcet Discount Type"
                items={discountType}
                variant="bordered"
              />
            </div>
            <div>
              <SHDatePicker
                name="endDate"
                label="Coupon Expiry Date"
                variant="bordered"
              />
            </div>
            <div className="">
              {" "}
              <SHInput
                name="discountValue"
                label="DiscountValue"
                type="number"
                variant="bordered"
              />
            </div>
          </div>

          <div className="text-center my-6">
            <button
              type="submit"
              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
            >
              Submit
            </button>
          </div>
        </SHForm>
      </div>
    </div>
  );
};

export default UpdateCouponModal;