import { FieldValues, SubmitHandler } from "react-hook-form";
import SHFileInput from "../../form/SHFileInput";
import SHForm from "../../form/SHForm";
import SHInput from "../../form/SHInput";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import toast from "react-hot-toast";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { useUpdateCustomerMutation } from "@/src/lib/redux/features/users/user.api";

interface UpdateProfileModalProps {
  onClose?: () => void;
}

const UpdateProfileModal = ({ onClose }: UpdateProfileModalProps) => {
  const { userData } = useUserDetails();
  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const hasImage = !!data.profilePhoto && data.profilePhoto instanceof File;

    toast.loading("Updating Profile...");

    let imageUrl = userData?.userData?.profilePhoto;

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.profilePhoto);
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
      profilePhoto: imageUrl,
      address: data.address ? data.address : userData?.userData?.address,
      phone: data.phone ? data.phone : userData?.userData?.phone,
    };
    toast.dismiss();

    try {
      const res = await updateCustomer(updateUserInfo).unwrap();
      if (res.success) {
        toast.success("Profile Updated successfully", { duration: 3000 });
        onClose && onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-bold text-[#6CAD02]">
        Update Profile
      </h1>

      <div>
        <h1 className="text-[#6CAD02] mt-5 mb-2">Update Profile Photo:</h1>

        <SHForm
          defaultValues={{
            email: "user@gmail.com",
            name: userData?.userData?.name,
            address: userData?.userData?.address,
            phone: userData?.userData?.phone,
          }}
          onSubmit={onSubmit}
        >
          <SHFileInput
            name="profilePhoto"
            label="Click to upload or drag and drop"
          />

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="email"
                label="Email"
                type="email"
                pathname="/login"
                variant="bordered"
                readonly
              />
            </div>
            <div className="flex-1">
              <SHInput
                name="name"
                label="Full Name"
                type="text"
                variant="bordered"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="address"
                label="Address"
                type="text"
                variant="bordered"
              />
            </div>
            <div className="flex-1">
              <SHInput
                name="phone"
                label="Phone Number"
                type="text"
                variant="bordered"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-[#6CAD02] text-[#6CAD02] uppercase font-bold px-3
                         hover:text-white hover:bg-[#6CAD02] transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </SHForm>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
