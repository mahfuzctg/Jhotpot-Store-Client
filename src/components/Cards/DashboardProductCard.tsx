
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";

import Link from "next/link";
import MainModal from "../modal/Reusable/MainModal";
import { IProduct } from "@/src/types/schema";
import UpdateProductModal from "../modal/Reusable/UpdateProductModal";

const DashboardProductCard = ({
  singleProduct,
  refetch,
}: {
  singleProduct: IProduct;
  refetch: any;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);

  return (
    <Card
      isFooterBlurred
      className="w-11/12 mx-auto md:w-full h-[300px] mr-6 md:mr-0"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        {singleProduct?.flashSale && (
          <button className="rounded-xl bg-primary px-3 py-1 font-medium duration-200 text-white">
            {singleProduct.discount}% off
          </button>
        )}
      </CardHeader>
      <Link href={`/productDetails?${params.toString()}`}>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={singleProduct?.image[0]}
        />
      </Link>

      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-sm font-bold">{singleProduct?.name}</p>
          <p className="text-black text-[14px] font-medium">
            {singleProduct?.category?.name}
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
        >
          Update
        </Button>
      </CardFooter>

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UpdateProductModal singleProduct={singleProduct} refetch={refetch} />
      </MainModal>
    </Card>
  );
};

export default DashboardProductCard;