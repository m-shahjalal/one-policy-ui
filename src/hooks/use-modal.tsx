import ModalContext from "@/components/blocks/modal";
import { useContext, ReactNode } from "react";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const useConfirmation = () => {
  const { showConfirmation, showDeleteConfirmation } = useModal();

  const confirm = (options: {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
  }) => {
    showConfirmation(options);
  };

  const confirmDelete = (options: {
    itemName?: string;
    title?: string;
    description?: string;
    onConfirm: () => void | Promise<void>;
  }) => {
    showDeleteConfirmation(options);
  };

  return { confirm, confirmDelete };
};

export const useCustomModal = () => {
  const { showCustomModal, hideModal } = useModal();

  const showModal = (options: {
    title?: string;
    content: ReactNode;
    showCloseButton?: boolean;
    className?: string;
    onClose?: () => void;
  }) => {
    showCustomModal(options);
  };

  return { showModal, hideModal };
};
