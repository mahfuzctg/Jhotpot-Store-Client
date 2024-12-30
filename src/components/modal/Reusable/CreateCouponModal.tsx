"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import SHForm from "../../form/SHForm";
import SHInput from "../../form/SHInput";
import SHSelect from "../../form/SHSelect";
import SHDatePicker from "../../form/SHDatePicker";
import { parseISO, format } from "date-fns";
import { useCreateCouponMutation } from "@/src/lib/redux/features/coupon/couponApi";
import toast from "react-hot-toast";

interface CreateCouponModalProps {
  onClose?: () => void;
}

const CreateCouponModal = ({ onClose }: CreateCouponModalProps) => {
  const discountType = [
    { key: "PERCENTAGE", label: "PERCENTAGE" },
    { key: "FIXED", label: "FIXED" },
  ];

  const [createCoupon] = useCreateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Creating coupon...");
    const { endDate, discountValue, ...remaining } = data;

    const parsedDate = parseISO(endDate);

    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'23:59:59'Z'");

    const couponData = {
      ...remaining,
      endDate: formattedDate,
      discountValue: Number(discountValue),
    };
    try {
      const res = await createCoupon(couponData).unwrap();
      if (res.success) {
        toast.dismiss();
        toast.success("Coupon created successfully!");
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
        <span>Create Coupon</span>
      </div>

      <div className="my-10">
        <SHForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-6">
            <div className="">
              <SHInput
                name="code"
                label="Coupon Code"
                type="text"
                variant="bordered"
                required
              />
            </div>
            <div>
              <SHSelect
                name="discountType"
                label="Selcet Discount Type"
                items={discountType}
                variant="bordered"
                required
              />
            </div>
            <div>
              <SHDatePicker
                name="endDate"
                label="Coupon Expiry Date"
                required
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
                required
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

export default CreateCouponModal;