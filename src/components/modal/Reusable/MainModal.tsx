
// components/ModalComponent.tsx
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
}

const MainModal = ({
  isOpen,
  onOpenChange,
  title,
  children,
  footerContent,
  size = "2xl",
}: ModalComponentProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      backdrop={"blur"}
      className="bg-[#18181B]"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      scrollBehavior={"inside"}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {footerContent || (
            <>
              <Button
                variant="light"
                color="primary"
                onPress={() => onOpenChange(false)}
              >
                Close
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MainModal;
