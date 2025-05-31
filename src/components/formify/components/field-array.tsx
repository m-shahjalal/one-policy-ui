"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
  ArrayPath,
  FieldError,
  get,
} from "react-hook-form";

type FieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
> = {
  children: (
    field: UseFieldArrayReturn<TFieldValues, TName> & {
      getFieldError: (index: number) => FieldError | undefined;
      getArrayError: () => FieldError | undefined;
    }
  ) => ReactNode;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
};

/**
 * A field array component with error handling.
 * @param children The children of the field array.
 * @param name The name of the field array.
 *
 * @returns The field array component.
 *
 * @example
 * ```tsx
 * <FieldArray name="items">
 * 	{({ fields, getFieldError, getArrayError }) =>
 * 		fields.map((field, index) => (
 *      <div key={field.id}>
 * 			  <TextField key={field.id} name={`items.${index}.name`} />
 *        {getFieldError(index) && (
 *          <p className="text-sm text-destructive mt-1">
 *            {getFieldError(index)?.message}
 *          </p>
 *        )}
 *      </div>
 * 		))
 * 	}
 * </FieldArray>
 * ```
 */

export const FieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
>({
  children,
  name,
  label,
  description,
  required,
}: FieldArrayProps<TFieldValues, TName>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const fieldArray = useFieldArray<TFieldValues, TName>({
    control,
    name,
  });

  // Helper function to get error for a specific array index
  const getFieldError = (index: number): FieldError | undefined => {
    return get(errors, `${name}.${index}`);
  };

  // Helper function to get error for the array itself
  const getArrayError = (): FieldError | undefined => {
    return get(errors, name);
  };

  // Get the array-level error
  const arrayError = getArrayError();

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        </div>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* Array-level error message */}
      {arrayError && (
        <p className="text-sm text-destructive">{arrayError.message}</p>
      )}

      {children({ ...fieldArray, getFieldError, getArrayError })}
    </div>
  );
};

FieldArray.displayName = "FieldArray";
