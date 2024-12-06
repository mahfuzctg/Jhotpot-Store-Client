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
    </>
  );
};

export default HomeLayout;
