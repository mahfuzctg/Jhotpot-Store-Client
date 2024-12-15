
  import { clearCompareProducts, selectCompareProducts } from "@/src/lib/redux/features/compare/compare.slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
  import { Button } from "@nextui-org/button";
  import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/modal";
  import Image from "next/image";
  import { MdSwapHorizontalCircle } from "react-icons/md";
  
  interface ModalComponentProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    setIsCompareActive: (open: boolean) => void;
  }
  
  const ComparisonModal = ({
    isOpen,
    onOpenChange,
    setIsCompareActive,
  }: ModalComponentProps) => {
    const productsForComparison = useAppSelector(selectCompareProducts);
    const dispatch = useAppDispatch();
  
    const handleCloseModal = () => {
      dispatch(clearCompareProducts());
      setIsCompareActive(false);
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior={"inside"}
        size="3xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div
                  className={`flex gap-2 items-center justify-center text-primary font-bold text-3xl mt-4`}
                >
                  <span>
                    <MdSwapHorizontalCircle className="text-primary text-3xl" />
                  </span>
                  <span>Compare Products</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <section className="text-gray-700 body-font border-t border-gray-200">
                  <div className="container px-5 py-12 mx-auto flex flex-wrap">
                    <div className="lg:w-1/4 mt-48 hidden lg:block">
                      <div className="mt-[2px] border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg">
                        {[
                          "Price",
                          "Category",
                          "Flash Sale",
                          "Shop Name",
                          "Description",
                        ].map((text, index) => (
                          <p
                            key={index}
                            className={`${
                              index % 2 === 0 ? "" : "bg-primary"
                            } text-white h-12 text-center px-4 flex items-center justify-center ${text === "Description" && "h-32"}`}
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex lg:w-3/4 w-full flex-wrap rounded-lg">
                      {productsForComparison?.map((singleProduct, index) => (
                        <div
                          key={index}
                          className={` ${productsForComparison?.length === 3 ? "lg:w-1/3" : "lg:w-1/2"} w-full mb-10 lg:mb-0 border-2 border-gray-300 rounded-lg lg:rounded-none relative border-collapse`}
                        >
                          <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                            <Image
                              src={singleProduct?.image[0]}
                              alt="Product Image"
                              height={192}
                              width={190}
                              className="h-48 w-48 object-cover"
                            />
                          </div>
                          <p
                            className={`text-white h-12 text-center px-4 flex items-center justify-center border-t`}
                          >
                            <span>$</span>
                            {singleProduct?.price}
                          </p>
                          <p
                            className={`text-white h-12 text-center px-4 flex items-center justify-center bg-primary mt-px`}
                          >
                            {singleProduct?.category?.name}
                          </p>
                          <p
                            className={`text-white h-12 text-center px-4 flex items-center justify-center`}
                          >
                            {singleProduct?.flashSale ? (
                              <span className="w-5 h-5 inline-flex items-center justify-center bg-white text-white rounded-full flex-shrink-0">
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  className="w-3 h-3 text-gray-800"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </span>
                            ) : (
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                className="w-5 h-5 text-white"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            )}
                          </p>
                          <p
                            className={`text-white h-12 text-center px-4 flex items-center justify-center bg-primary`}
                          >
                            {singleProduct?.vendor?.shopName}
                          </p>
                          <div className="p-3 text-center">
                            <p className="text-xs text-gray-400">
                              {singleProduct?.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleCloseModal}
                  color="primary"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default ComparisonModal;