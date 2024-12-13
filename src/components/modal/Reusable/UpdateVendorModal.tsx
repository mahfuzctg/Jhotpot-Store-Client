
"use client";

import SHFileInput from "../../form/SHFileInput";
import SHForm from "../../form/SHForm";
import SHInput from "../../form/SHInput";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import toast from "react-hot-toast";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateVendorMutation } from "@/src/lib/redux/features/users/user.api";
import SHTextarea from "../../form/SHTextArea";



interface UpdateProfileModalProps {
  onClose?: () => void;
}

const UpdateVendorModal = ({ onClose }: UpdateProfileModalProps) => {
  const { userData } = useUserDetails();
  const [updateVendor] = useUpdateVendorMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const hasImage = !!data.logo && data.logo instanceof File;

    toast.loading("Updating Profile...");

    let imageUrl = userData?.userData?.logo;

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.logo);
      formData.append(
        "upload_preset",
        envConfig.cloudinary_upload_preset as string
      );

      try {
        const response = await axios.post(
          envConfig.cloudinary_url as string,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = response.data.secure_url;
      } catch (error: any) {
        console.error(error.message);
        toast.error("Failed to upload image");
        return;
      }
    }

    const updateUserInfo = {
      name: data.name ? data.name : userData?.userData?.name,
      logo: imageUrl,
      shopName: data.shopName ? data.shopName : userData?.userData?.shopName,
      description: data.description
        ? data.description
        : userData?.userData?.description,
    };
    toast.dismiss();
    console.log(updateUserInfo);

    try {
      const res = await updateVendor(updateUserInfo).unwrap();
      if (res.success) {
        toast.success("Profile Updated successfully", { duration: 3000 });
        onClose && onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-primary">
        Update Vendor
      </h1>

      <div>
        <h1 className="text-white mt-5 mb-2">Update Shop Logo:</h1>

        <SHForm
          defaultValues={{
            name: userData?.userData?.name || "",
            shopName: userData?.userData?.shopName || "",
            description: userData?.userData?.description || "",
          }}
          onSubmit={onSubmit}
        >
          <SHFileInput
            name="logo"
            label="Click to upload or drag
                and drop"
          />

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="name"
                label="Vendor Name"
                type="text"
                variant="bordered"
              />
            </div>
            <div className="flex-1">
              {" "}
              <SHInput
                name="shopName"
                label="Shop Name"
                type="text"
                variant="bordered"
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <SHTextarea
              name="description"
              label="Description"
              placeholder="Write a description..."
              rows={5}
              variant="bordered"
              required
            />
          </div>

          <div className="text-center">
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

export default UpdateVendorModal;
