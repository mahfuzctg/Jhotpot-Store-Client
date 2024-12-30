
import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface ModalComponentProps {
  isOpen: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footerContent?: ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  backdrop?: "blur" | "transparent" | "opaque";
  scrollBehavior?: "inside" | "outside";
}

const MainModal: React.FC<ModalComponentProps> = ({
  isOpen,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  onOpenChange,
  title,
  children,
  footerContent,
  size = "2xl",
  backdrop = "blur",
  scrollBehavior = "inside",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      backdrop={backdrop}
      className="bg-[#fff]"
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      scrollBehavior={scrollBehavior}
    >
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footerContent && (
          <ModalFooter>
            {footerContent}
          </ModalFooter>
        )}
        {!footerContent && (
          <ModalFooter>
            <Button
              variant="light"
              color="warning"
              onPress={() => onOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MainModal;
