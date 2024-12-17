import DealOffer from "@/src/components/Home/DealOffer/DealOffer";
import FeatureSection from "@/src/components/Home/Feature/ChooseUs";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
  allCategories,
  allProducts,
  flashSale,
}: {
  children: ReactNode;
  allCategories: ReactNode;
  allProducts: ReactNode;
  flashSale: ReactNode;
}) => {
  return (
    <>
      {children}
      {flashSale}
      {allProducts}
      {allCategories}
      <FeatureSection />
      
      <DealOffer />
    </>
  );
};

export default HomeLayout;
