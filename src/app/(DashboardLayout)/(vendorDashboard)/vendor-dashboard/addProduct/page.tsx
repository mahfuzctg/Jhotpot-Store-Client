"use client";

import SHFileInput from "@/src/components/form/SHFileInput";
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import SHSelect from "@/src/components/form/SHSelect";
import SHTextarea from "@/src/components/form/SHTextArea";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import envConfig from "@/src/config/envConfig";
import { useCategories } from "@/src/hooks/CustomHooks/useCategories";
import { useAddNewProductMutation } from "@/src/lib/redux/features/products/product.api";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { categories } = useCategories();
  const [addNewProduct] = useAddNewProductMutation();
  const router = useRouter();

  const flashSale = [
    { key: true, label: "Yes" },
    { key: false, label: "No" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Adding product...");
    const files =
      data.image instanceof FileList ? Array.from(data.image) : data.image;

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
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
          return response.data.secure_url;
        } catch (error: any) {
          console.error("File upload error:", error.message);
          return null;
        }
      });

      imageUrls = (await Promise.all(uploadPromises)).filter(
        (url) => url !== null
      );
    }

    const productInfo = {
      name: data.name,
      image: imageUrls,
      price: Number(data.price),
      inventory: Number(data.inventory),
      categoryId: data.category,
      description: data.description,
      ...(data?.flashSale && {
        flashSale: data.flashSale === "true" ? true : false,
      }),
      ...(data?.discount && { discount: Number(data.discount) }),
    };
    toast.dismiss();
    console.log("productInfo:", productInfo);

    try {
      const res = await addNewProduct(productInfo).unwrap();
      console.log(res);
      if (res) {
        toast.success("Product added successfully", { duration: 3000 });
        router.push("/vendor-dashboard/myProducts");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <DashboardSectionTitle heading="Add New Product" />

      <div>
        <h1 className="mt-5 mb-2 font-bold text-primary">
          Upload Product Images:{" "}
          <span className="text-gray-400">(Add upto 2 or 3 images)</span>
        </h1>

        <SHForm onSubmit={onSubmit}>
          <SHFileInput
            name="image"
            label="Click to upload or drag
                and drop"
            allowMultiple
          />

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="name"
                label="Product Name*"
                type="text"
                variant="bordered"
                required
              />
            </div>
            <div className="flex-1">
              {" "}
              <SHInput
                name="price"
                label="Product Price*"
                type="number"
                variant="bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="inventory"
                label="Product Inventory*"
                type="number"
                variant="bordered"
                required
              />
            </div>
            <div className="flex-1">
              {" "}
              <SHSelect
                name="category"
                label="Select a category*"
                items={categories}
                variant="bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              {" "}
              <SHSelect
                name="flashSale"
                label="FlashSale"
                items={flashSale}
                variant="bordered"
              />
            </div>
            <div className="flex-1">
              <SHInput
                name="discount"
                label="Product Discount"
                type="number"
                variant="bordered"
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <SHTextarea
              name="description"
              label="Product Description*"
              placeholder="Write a description..."
              rows={5}
              variant="bordered"
              required
            />
          </div>

          <div className="text-center pb-10">
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

export default AddProduct;