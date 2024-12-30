import DealOffer from "@/src/components/Home/DealOffer/DealOffer";
import FeatureSection from "@/src/components/Home/Feature/ChooseUs";
import GallerySection from "@/src/components/Home/Gallery/Gallery";
import CustomerReviewSection from "@/src/components/Home/Review/Review";
import Location from "@/src/components/Home/Review/Review";

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
      <GallerySection></GallerySection>
      {flashSale}
      {allProducts}
      {allCategories}
      <FeatureSection />
      <CustomerReviewSection/>
      <DealOffer />
    </>
  );
};

export default HomeLayout;
