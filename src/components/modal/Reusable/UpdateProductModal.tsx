import envConfig from "@/src/config/envConfig";
import { useCategories } from "@/src/hooks/CustomHooks/useCategories";

import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import SHForm from "../../form/SHForm";
import SHFileInput from "../../form/SHFileInput";
import SHInput from "../../form/SHInput";
import SHSelect from "../../form/SHSelect";
import SHTextarea from "../../form/SHTextArea";
import { IProduct } from "@/src/types/schema";
import { useUpdateProductMutation } from "@/src/lib/redux/features/products/product.api";

interface UpdateProductModalProps {
  onClose?: () => void;
  singleProduct?: IProduct | null;
  refetch: any;
}

const UpdateProductModal = ({
  onClose,
  singleProduct,
  refetch,
}: UpdateProductModalProps) => {
  const { categories } = useCategories();
  const [updateProduct] = useUpdateProductMutation();

  const flashSale = [
    { key: true, label: "Yes" },
    { key: false, label: "No" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Updating product...");
    const files =
      data.image instanceof FileList ? Array.from(data.image) : data.image;

    let imageUrls = singleProduct?.image;
    console.log(imageUrls);

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
      name: data.name ? data.name : singleProduct?.name,
      image: imageUrls,
      price: data.price ? Number(data.price) : singleProduct?.price,
      inventory: data.inventory
        ? Number(data.inventory)
        : singleProduct?.inventory,
      categoryId: data.category ? data.category : singleProduct?.categoryId,
      description: data.description
        ? data.description
        : singleProduct?.description,
      ...(data?.flashSale && {
        flashSale: data.flashSale === "true" ? true : false,
      }),
      ...(data?.discount && { discount: Number(data.discount) }),
    };
    console.log("productInfo:", productInfo);

    try {
      const res = await updateProduct({
        productInfo,
        productId: singleProduct?.id,
      }).unwrap();
      console.log(res);
      if (res) {
        toast.dismiss();
        toast.success("Product updated successfully", { duration: 3000 });
        onClose && onClose();
        refetch();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-primary">
        Update Product
      </h1>

      <SHForm
        defaultValues={{
          name: singleProduct?.name,
          price: singleProduct?.price,
          inventory: singleProduct?.inventory,
          category: singleProduct?.categoryId,
          flashSale: singleProduct?.flashSale,
          discount: singleProduct?.discount || 0,
          description: singleProduct?.description,
        }}
        onSubmit={onSubmit}
      >
        <h1 className="mt-5 mb-2 font-bold text-primary">
          Upload Product Images:{" "}
          <span className="text-gray-400">(Add upto 2 or 3 images)</span>
        </h1>
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
            />
          </div>
          <div className="flex-1">
            {" "}
            <SHInput
              name="price"
              label="Product Price*"
              type="number"
              variant="bordered"
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
            />
          </div>
          <div className="flex-1">
            {" "}
            <SHSelect
              name="category"
              label="Select a category*"
              items={categories}
              variant="bordered"
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
  );
};

export default UpdateProductModal;