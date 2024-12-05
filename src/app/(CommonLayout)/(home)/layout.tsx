import Footer from "@/src/components/Home/Footer/Footer";
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
      {/* <DealOffer /> */}
      {flashSale}
      <Footer />
    </>
  );
};

export default HomeLayout;
