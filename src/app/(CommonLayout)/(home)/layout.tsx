import DealOffer from "@/src/components/Home/DealOffer/DealOffer";
import FeatureSection from "@/src/components/Home/Feature/Feature";
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
      {allCategories}
      {allProducts}
     
      <FeatureSection />
      
      <DealOffer />
      {flashSale}
    </>
  );
};

export default HomeLayout;
