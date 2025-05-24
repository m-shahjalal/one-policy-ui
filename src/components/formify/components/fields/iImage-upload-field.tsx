"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TImageUploadFieldProps } from "../../types/form";
import { cn } from "../../utils/tailwind-cn";

/**
 * Image upload field component
 *
 * @param name - The name of the field
 * @param label - The label of the field
 * @param required - The required status of the field
 * @param className - The class name of the field
 * @param disabled - The disabled status of the field
 * @param onUpload - The file upload handler
 *
 * @returns {JSX.Element} - The image upload field component
 *
 */

export const ImageUploadField = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
  disabled = false,
  onUpload,
}: TImageUploadFieldProps<T>) => {
  const { control } = useFormContext<T>();

  const { loading, handleFileChange } = useImageLinkField();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex flex-col gap-4">
              {value ? (
                <div className="relative group h-48 w-48">
                  <Image
                    src={value}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-black/50 group-hover:h-full transition-all duration-300 rounded-lg flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => onChange(undefined)}
                      disabled={disabled}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div
                      onClick={() => document.getElementById(name)?.click()}
                      className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, onChange, onUpload)
                        }
                        id={name}
                        disabled={disabled}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={(e) => e.stopPropagation()}
                        disabled={disabled}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ImageUploadField.displayName = "ImageLinkField";

/**
 * Custom hook to handle image upload
 *
 * @returns {Object} - Object containing loading state and file change handler
 */

const useImageLinkField = () => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: unknown[]) => void,
    onUpload?: (file: File) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!onUpload) {
      setLoading(true);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyUrl = "url";
      onChange(dummyUrl);
      return;
    }

    try {
      setLoading(true);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyUrl = onUpload(file);
      onChange(dummyUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFileChange };
};
