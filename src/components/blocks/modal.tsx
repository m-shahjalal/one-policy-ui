import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Loader2, X } from "lucide-react";
import React, { createContext, ReactNode, useState } from "react";

interface ConfirmationOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface CustomModalOptions {
  title?: string;
  description?: string;
  content: ReactNode;
  showCloseButton?: boolean;
  showFooter?: boolean;
  footerContent?: ReactNode;
  className?: string;
  onClose?: () => void;
}

interface ModalContextType {
  // Confirmation Modal
  showConfirmation: (options: ConfirmationOptions) => void;
  showDeleteConfirmation: (options: {
    itemName?: string;
    title?: string;
    description?: string;
    onConfirm: () => void | Promise<void>;
  }) => void;

  // Custom Modal
  showCustomModal: (options: CustomModalOptions) => void;
  hideModal: () => void;
}

interface ModalState {
  type: "confirmation" | "custom" | null;
  isOpen: boolean;
  loading: boolean;
  confirmationOptions?: ConfirmationOptions;
  customOptions?: CustomModalOptions;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    isOpen: false,
    loading: false,
  });

  const showConfirmation = (options: ConfirmationOptions) => {
    setModalState({
      type: "confirmation",
      isOpen: true,
      loading: false,
      confirmationOptions: options,
    });
  };

  const showDeleteConfirmation = (options: {
    itemName?: string;
    title?: string;
    description?: string;
    onConfirm: () => void | Promise<void>;
  }) => {
    showConfirmation({
      title: options.title || `Delete ${options.itemName || "Item"}`,
      description:
        options.description ||
        `Are you sure you want to delete this ${
          options.itemName?.toLowerCase() || "item"
        }? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: options.onConfirm,
    });
  };

  const showCustomModal = (options: CustomModalOptions) => {
    setModalState({
      type: "custom",
      isOpen: true,
      loading: false,
      customOptions: options,
    });
  };

  const hideModal = () => {
    setModalState({
      type: null,
      isOpen: false,
      loading: false,
    });
  };

  const setLoading = (loading: boolean) => {
    setModalState((prev) => ({ ...prev, loading }));
  };

  const handleConfirm = async () => {
    if (!modalState.confirmationOptions?.onConfirm) return;

    setLoading(true);
    try {
      await modalState.confirmationOptions.onConfirm();
      hideModal();
    } catch (error) {
      console.error("Confirmation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (modalState.loading) return;

    if (modalState.confirmationOptions?.onCancel) {
      modalState.confirmationOptions.onCancel();
    }
    hideModal();
  };

  const handleCustomClose = () => {
    if (modalState.customOptions?.onClose) {
      modalState.customOptions.onClose();
    }
    hideModal();
  };

  return (
    <ModalContext.Provider
      value={{
        showConfirmation,
        showDeleteConfirmation,
        showCustomModal,
        hideModal,
      }}
    >
      {children}

      {/* Render Modals */}
      {modalState.isOpen &&
        modalState.type === "confirmation" &&
        modalState.confirmationOptions && (
          <ConfirmationModal
            isOpen={modalState.isOpen}
            loading={modalState.loading}
            options={modalState.confirmationOptions}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}

      {modalState.isOpen &&
        modalState.type === "custom" &&
        modalState.customOptions && (
          <CustomModal
            isOpen={modalState.isOpen}
            options={modalState.customOptions}
            onClose={handleCustomClose}
          />
        )}
    </ModalContext.Provider>
  );
};

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  loading: boolean;
  options: ConfirmationOptions;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, loading, options, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const isDestructive = options.variant === "destructive";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <div
          className={cn(
            "p-[1px] rounded-2xl bg-gradient-to-br shadow-2xl",
            isDestructive
              ? "from-red-400/30 via-red-500/20 to-red-600/30 dark:from-red-500/20 dark:via-red-600/10 dark:to-red-700/20"
              : "from-blue-400/30 via-purple-500/20 to-blue-600/30 dark:from-blue-500/20 dark:via-purple-600/10 dark:to-indigo-700/20"
          )}
        >
          <div className="relative bg-gradient-to-br from-white via-gray-50/95 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className={cn(
                  "absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br opacity-20 blur-xl",
                  isDestructive
                    ? "from-red-100 to-red-200 dark:from-red-500 dark:to-red-600"
                    : "from-blue-100 to-purple-200 dark:from-blue-500 dark:to-purple-600"
                )}
              />
              <div
                className={cn(
                  "absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br opacity-30 blur-lg",
                  isDestructive
                    ? "from-red-200 to-red-300 dark:from-red-600 dark:to-red-700"
                    : "from-purple-100 to-blue-200 dark:from-purple-600 dark:to-blue-700"
                )}
              />
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-br ${
                    isDestructive
                      ? "from-red-500 to-red-600"
                      : "from-blue-500 to-purple-600"
                  } shadow-lg`}
                >
                  {isDestructive ? (
                    <AlertTriangle className="w-6 h-6 text-white" />
                  ) : (
                    <Check className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              \{" "}
              {options.title && (
                <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
                  {options.title}
                </h3>
              )}
              {options.description && (
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                  {options.description}
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  {options.cancelText || "Cancel"}
                </Button>

                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 h-11 relative overflow-hidden transition-all duration-200 ${
                    isDestructive
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                  }`}
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {options.confirmText || "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomModal: React.FC<{
  isOpen: boolean;
  options: CustomModalOptions;
  onClose: () => void;
}> = ({ isOpen, options, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] animate-in zoom-in-95 duration-300">
        <div className="p-[1px] rounded-2xl bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-indigo-600/30 shadow-2xl">
          <div className="relative bg-gradient-to-br from-white via-gray-50/95 to-white rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-purple-300 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-blue-300 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  {options.title && (
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                      {options.title}
                    </h2>
                  )}
                  {options.description && (
                    <p className="text-gray-600 mt-1">{options.description}</p>
                  )}
                </div>

                {options.showCloseButton !== false && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-8 w-8 p-0 rounded-full hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="relative z-10 px-6 py-4 max-h-[60vh] overflow-y-auto">
              {options.content}
            </div>

            {options.showFooter && options.footerContent && (
              <div className="relative z-10 px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm">
                {options.footerContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal, CustomModal, ModalContext as default };
