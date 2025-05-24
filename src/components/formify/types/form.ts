import React, { ReactNode } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

/**
 * Base Field Props that apply to all form components
 */
export type TBaseFieldProps<T extends FieldValues> = {
  name: Path<T>; // Field name in the form
  label?: string; // Display label
  description?: string; // Description
  placeholder?: string; // Placeholder text
  required?: boolean; // If field is required
  disabled?: boolean; // If field is disabled
  className?: string; // Container class
  locale?: Record<string, string>; // Localization strings
};

/**
 * Text input field props
 */
export type TTextFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  type?: "text" | "email" | "number" | "tel" | "url";
  icon?: ReactNode;
  loading?: boolean;
  inputClass?: string;
};

/**
 * Password field props
 */
export type TPasswordFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  icon?: ReactNode;
  showStrength?: boolean;
  showMessage?: boolean;
};

/**
 * Checkbox field props
 */
export type TCheckboxFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  layout?: "row" | "column";
  reverse?: boolean;
  gap?: "2" | "4" | "6" | "8";
};

/**
 * Radio field props
 */
export type TRadioFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  options: { value: string; text: string }[];
  layout?: "row" | "column";
  groupLayout?: "row" | "column";
  reverse?: boolean;
  gap?: "2" | "4" | "6" | "8";
};

/**
 * Select field props
 */
export type TSelectFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  options: { value: string; text: string }[];
  clearable?: boolean;
  searchable?: boolean;
};

/**
 * Switch field props
 */
export type TSwitchFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  layout?: "row" | "column";
  reverse?: boolean;
  gap?: "2" | "4" | "6" | "8";
};

/**
 * Textarea field props
 */
export type TTextAreaFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  resizable?: boolean;
  autoResize?: boolean;
  action?: () => void;
  icon?: ReactNode;
  loading?: boolean;
  inputClassName?: string;
  rows?: number;
  maxLength?: number;
};

/**
 * Field with uniqueness validation
 */
export type TUniqueTextFieldProps<T extends FieldValues> =
  TBaseFieldProps<T> & {
    type?: "text" | "email";
    checkFunction: (value: string) => Promise<boolean>;
    debounceMs?: number;
    validateOnBlur?: boolean;
  };

/**
 * Date field props
 */
export type TDateFieldProps<T extends FieldValues> = TBaseFieldProps<T> & {
  minDate?: Date;
  maxDate?: Date;
  format?: string;
};

/**
 * DateTime field props
 */
export type TDateTimeFieldProps<T extends FieldValues> = TDateFieldProps<T> & {
  showTime?: boolean;
  timeFormat?: "12h" | "24h";
};

/**
 * Image upload field props
 */
export type TImageUploadFieldProps<T extends FieldValues> =
  TBaseFieldProps<T> & {
    onUpload?: (file: File) => void;
    maxSize?: number;
    allowedTypes?: string[];
    multiple?: boolean;
    preview?: boolean;
  };

// Basic form props

export type FormRef<T extends FieldValues> = {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: <K extends Path<T>>(name: K, value: T[K]) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
};

export type FormProps<
  TSchema extends ZodType<FIX_ME, FIX_ME, FIX_ME>,
  TFieldValues extends FieldValues = z.infer<TSchema>
> = {
  ref?: React.Ref<FormRef<TFieldValues>> | null;
  initialValues?: DefaultValues<TFieldValues>;
  schema: TSchema;
  submitHandler: (values: TFieldValues) => void;
  children?: React.ReactNode;
  className?: string;
  render?: ({
    form,
    fieldNames,
  }: {
    form: UseFormReturn<TFieldValues>;
    fieldNames: Record<keyof TFieldValues, string>;
  }) => React.ReactNode;
  renderDevTools?: boolean;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
} & Omit<React.ComponentPropsWithoutRef<"form">, "ref">;
