# Formify 📝

A type-safe, feature-rich form library for React applications built with Zod schema validation and React Hook Form.

## Features ✨

- 🛡️ **Type-safe**: Full TypeScript support with automatic type inference
- ✅ **Schema Validation**: Built-in Zod schema validation
- 🎨 **Customizable**: Flexible styling with className support
- 🧩 **Rich Components**: Comprehensive set of form components
- 🔄 **Form State Management**: Powered by React Hook Form
- 🚀 **Performance Optimized**: Efficient rendering and validation

## Installation 🔧

Since this is an internal library, you can import it directly using the configured alias:

```typescript
import { Form, TextField, PasswordField } from "formify";
```

## Basic Usage 🚀

```typescript
import { Form, TextField, PasswordField } from "formify";
import { z } from "zod";

// Define your schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Use the form
export function LoginForm() {
  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <Form
      schema={loginSchema}
      submitHandler={handleSubmit}
      render={({ fieldNames }) => (
        <>
          <TextField
            name={fieldNames.email}
            label="Email"
            placeholder="Enter your email"
          />
          <PasswordField
            name={fieldNames.password}
            label="Password"
            placeholder="Enter your password"
          />
        </>
      )}
    />
  );
}
```

## Available Components 🧩

### Text Input Fields

- \`TextField\`: Basic text input with various types (text, email, number, tel, url)
- \`PasswordField\`: Secure password input with optional strength indicator
- \`TextAreaField\`: Multi-line text input
- \`UniqueTextField\`: Text input with uniqueness validation

### Selection Fields

- \`CheckboxField\`: Single checkbox input
- \`RadioField\`: Radio button group
- \`SelectField\`: Dropdown select with search and clear options
- \`SwitchField\`: Toggle switch input

### Date & Time Fields

- \`DateField\`: Date picker
- \`DateTimeField\`: Combined date and time picker

### Special Fields

- \`ImageUploadField\`: Image upload with preview
- \`FieldArray\`: Dynamic field array management

## Component Props 🎛️

All components share these base props:
\`\`\`typescript
{
name: string; // Field name
label?: string; // Display label
description?: string; // Helper text
placeholder?: string; // Placeholder text
required?: boolean; // If field is required
disabled?: boolean; // If field is disabled
className?: string; // Container class
}
\`\`\`

## Advanced Features 🔥

### Form Reference

```typescript
const formRef = useRef<FormRef>();

<Form ref={formRef} schema={schema} submitHandler={handleSubmit}>
  {/* form fields */}
</Form>;

// Access form methods
formRef.current?.setValue("fieldName", "value");
formRef.current?.reset();
```

### Custom Validation

```typescript
const schema = z.object({
  username: z
    .string()
    .min(3)
    .refine(
      async (value) => {
        // Custom async validation
        return await checkUsernameAvailable(value);
      },
      { message: "Username already taken" }
    ),
});
```

### Field Array Support

```typescript
<FieldArray
  name="items"
  render={(fields) => (
    <>
      {fields.map((field, index) => (
        <TextField key={field.id} name={`items.${index}.name`} />
      ))}
    </>
  )}
/>
```

## TypeScript Support 📘

The library is built with TypeScript and provides full type inference:

```typescript
// Form values are inferred from schema
type FormValues = z.infer<typeof schema>;

// Component props are type-safe
<TextField<FormValues>
  name="email" // Autocomplete and type checking
/>;
```

## Best Practices 💡

1. **Schema Definition**:

   - Define schemas outside components for reusability
   - Use Zod's built-in validators for common patterns

2. **Form Organization**:

   - Group related fields using semantic HTML
   - Use description prop for field hints
   - Implement proper error handling

3. **Performance**:
   - Use controlled components sparingly
   - Implement proper validation modes
   - Utilize form state effectively

## Contributing 🤝

Feel free to submit issues and enhancement requests!

## License 📄

Internal use only. All rights reserved.
