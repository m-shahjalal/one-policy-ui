import { FieldValues } from "react-hook-form";
import { ZodEffects, ZodObject, ZodType } from "zod";

export function createFieldNames<T extends FieldValues>(
  schema: ZodType
): Record<keyof T, string> {
  // Handle ZodEffects by unwrapping to get the inner schema
  let baseSchema = schema;

  // Unwrap any ZodEffects to get to the underlying object schema
  while (baseSchema instanceof ZodEffects) {
    baseSchema = baseSchema._def.schema;
  }

  // Now we should have the base schema (hopefully a ZodObject)
  if (!(baseSchema instanceof ZodObject)) {
    throw new Error(
      "Schema must be a Zod object schema or a ZodEffects wrapping a ZodObject"
    );
  }

  // Extract the shape from the unwrapped object schema
  const shape = baseSchema._def.shape();

  if (!shape) {
    throw new Error("Failed to extract schema shape");
  }

  // Return a record with keys from T
  return Object.keys(shape).reduce((acc, key) => {
    acc[key as keyof T] = key;
    return acc;
  }, {} as Record<keyof T, string>);
}
