"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
  ArrayPath,
} from "react-hook-form";

type FieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
> = {
  children: (field: UseFieldArrayReturn<TFieldValues, TName>) => ReactNode;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
};

/**
 * A field array component.
 * @param children The children of the field array.
 * @param name The name of the field array.
 *
 * @returns The field array component.
 *
 * @example
 * ```tsx
 * <FieldArray name="items">
 * 	{({ fields }) =>
 * 		fields.map((field, index) => (
 * 			<TextField key={field.id} name={`items.${index}.name`} />
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
  const { control } = useFormContext<TFieldValues>();
  const fieldArray = useFieldArray<TFieldValues, TName>({
    control,
    name,
  });

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
      {children(fieldArray)}
    </div>
  );
};

FieldArray.displayName = "FieldArray";
