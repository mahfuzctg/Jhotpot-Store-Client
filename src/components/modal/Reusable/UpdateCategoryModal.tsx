
"use client";

import { SquareMenu } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SHForm from "../../form/SHForm";
import SHFileInput from "../../form/SHFileInput";
import SHInput from "../../form/SHInput";
import toast from "react-hot-toast";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { ICategory } from "@/src/types/schema";
import { useUpdateCategoryMutation } from "@/src/lib/redux/features/category/categoryApi";


interface ModalProps {
  onClose?: () => void;
  singleCategory: ICategory;
}

const UpdateCategoryModal = ({ onClose, singleCategory }: ModalProps) => {
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const hasImage = !!data.image && data.image instanceof File;

    toast.loading("Updating category...");

    let imageUrl = "";

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.image);
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

    const categoryInfo = {
      category: data.name ? data.name : singleCategory?.name,
      image: imageUrl,
    };

    try {
      const res = await updateCategory({
        id: singleCategory?.id,
        categoryInfo,
      }).unwrap();
      if (res) {
        toast.dismiss();
        toast.success("Category updated successfully!", { duration: 3000 });
        onClose && onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-center justify-center text-primary font-bold text-3xl`}
      >
        <span>
          <SquareMenu className="text-primary text-3xl" />
        </span>
        <span>Update Category</span>
      </div>

      <div className="mt-4">
        <SHForm
          defaultValues={{
            name: singleCategory?.name,
          }}
          onSubmit={onSubmit}
        >
          <SHFileInput
            name="image"
            label="Click to upload or drag
                and drop"
          />

          <div className="flex-1 my-5">
            <SHInput name="name" label="Category Name" variant="bordered" />
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

export default UpdateCategoryModal;