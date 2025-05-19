"use client";
"use no memo";

import { FormProps } from "../types/form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useMemo } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { Form as FormUI } from "@/components/ui/form";
import { createFieldNames } from "../utils/zod-field-names";

/**
 * A generic form component.
 * @param schema The schema of the form.
 * @param initialValues The initial values of the form.
 * @param onSubmit The submit handler of the form.
 * @param children The children of the form.
 * @param ref The reference of the form.
 *
 * @returns The generic form component.
 */

export const Form = <
  TSchema extends ZodType,
  TFieldValues extends FieldValues = z.infer<TSchema>
>({
  ref,
  initialValues,
  schema,
  submitHandler,
  children,
  className,
  render,
  renderDevTools,
  mode = "onChange",
}: FormProps<TSchema, TFieldValues>) => {
  const fieldNames = useMemo(
    () => createFieldNames<TFieldValues>(schema),
    [schema]
  );

  const form = useForm<TFieldValues>({
    defaultValues: initialValues as DefaultValues<TFieldValues>,
    resolver: zodResolver(schema),
    mode,
  });

  useImperativeHandle(ref, () => {
    return {
      getValues: form.getValues,
      reset: (values?: Partial<TFieldValues>) =>
        form.reset(values as TFieldValues),
      setValue: (
        name: Path<TFieldValues>,
        value: TFieldValues[keyof TFieldValues]
      ) => form.setValue(name, value),
      formState: form.formState,
      control: form.control,
      form,
    };
  });

  return (
    <>
      <FormUI {...form}>
        <form className={className} onSubmit={form.handleSubmit(submitHandler)}>
          {render ? render({ form, fieldNames }) : children}
        </form>
      </FormUI>
      {renderDevTools && <DevTool control={form.control} />}
    </>
  );
};

Form.displayName = "Form";
