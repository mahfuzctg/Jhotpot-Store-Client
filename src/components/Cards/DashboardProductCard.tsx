

import { IProduct } from "@/src/types/schema";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const DashboardProductCard = ({
  singleProduct,
}: {
  singleProduct: IProduct;
}) => {
  return (
    <Card
      isFooterBlurred
      className="w-11/12 mx-auto md:w-full h-[300px] mr-6 md:mr-0"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        {singleProduct.flashSale && (
          <button className="rounded-xl bg-primary px-3 py-1 font-medium duration-200 text-white">
            {singleProduct.discount}% off
          </button>
        )}
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={singleProduct?.image[0]}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-sm font-bold">{singleProduct?.name}</p>
          <p className="text-black text-[14px] font-medium">
            {singleProduct?.category?.name}
          </p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardProductCard;
