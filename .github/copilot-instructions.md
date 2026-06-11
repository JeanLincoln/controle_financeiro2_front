# GitHub Copilot Workspace Instructions

## Code Review Guidelines

When performing code reviews:

- Respond in Brazilian Portuguese
- Focus on readability and avoid nested ternary operators
- Avoid using abbreviations; use full words instead
- Never allow comments in code
- Never allow default exports; always use named exports
- Never allow barrel files (`index.ts`); always use explicit imports
- Never allow `any` or `never` types; ensure full type safety
- Never allow React.FC on components; use explicit prop interfaces instead

## General Coding Standards

### TypeScript Requirements

- Use only TypeScript files (.ts and .tsx)
- Never use JavaScript files (.js or .jsx)
- Prefer .tsx for components with JSX
- Prefer .ts for logic and utilities

### Type Safety

- Every component or screen must declare an explicit interface for props
- Props interface must be named in PascalCase + "Props" (e.g., `OriginCardProps`)
- Example:

  ```tsx
  interface OriginCardProps {
    origin: Origin;
    onEdit: (id: string) => void;
  }

  export function OriginCard({ origin, onEdit }: OriginCardProps) {
    // implementation
  }
  ```

### Constants and Magic Numbers

- Do not allow "magic numbers" in the code
- Require named constants, enums, or semantically named variables
- Constants must be strongly typed
- Define constants at the top of the file or in a dedicated constants file

### Naming Conventions

#### Files and Folders

- Folders inside `src/screens/` and `src/components/` must be in PascalCase
- Component files: `ComponentName.component.tsx`
- Screen files: `ScreenName.screen.tsx`
- Hook files: `useHookName.hook.ts`
- Schema files: `FeatureName.schema.ts`
- Provider files: `ProviderName.provider.tsx`
- Empty state files: `ComponentName.empty-state.tsx`
- Skeleton files: `ComponentName.skeleton.tsx`

#### Code

- Component names must always be in PascalCase
- Hook names must be in camelCase starting with "use"
- Use named exports (not default exports)

### Component Requirements

- Use `cn()` utility from `@/utils/cn.utils` to combine CSS classes
- Use theme colors (not hardcoded HEX values)
- Include `focus-visible` states on interactive elements
- Add `aria-label` on icon-only buttons
- Spread remaining props with `{...props}` at the end of the component's root element

## Architecture Patterns

### Feature Organization

Screens and complex features must follow this modular structure:

```
FeatureName/
├── FeatureName.screen.tsx           # Main component (presentation layer only)
├── components/                       # Feature-specific components
│   ├── ComponentA/
│   │   └── ComponentA.component.tsx
│   ├── ComponentB/
│   │   └── ComponentB.component.tsx
│   └── FeatureProviders/
│       └── FeatureProviders.provider.tsx
└── hooks/                            # Business logic hooks
    ├── useFeatureScreen.hook.ts
    ├── useFeatureDrawer.hook.ts
    └── useFeatureAlertDialog.hook.ts
```

For components with forms:

```
Form/
├── FeatureName/
│   ├── FeatureName.form.tsx
│   ├── FeatureNameForm.schema.ts
│   └── hooks/
│       └── useFeatureNameForm.hook.ts
```

**Rules:**

- Each component lives in its own PascalCase folder with appropriate suffix
- All hooks are in camelCase `.ts` files starting with "use" and ending with `.hook.ts`
- Main component is a thin presentation layer
- Business logic lives in custom hooks

### Separation of Concerns

**Component Layer (.screen.tsx or .component.tsx):**

- Focus on presentation and rendering
- Delegate all business logic to custom hooks
- Break complex screens into smaller, semantic sub-components
- Example sub-components: `HeaderSection`, `FiltersSection`, `ListSection`

**Business Logic Layer (hooks/):**

- Each hook handles a single responsibility (create, update, fetch, delete)
- Name hooks descriptively: `useOriginForm`, `useFindAllOrigins`, `useOriginCreate`
- Return objects with descriptive property names
- Avoid returning arrays unless following React conventions (e.g., `useState`)

**Example:**

```tsx
export function useOriginScreen() {
  return {
    form,
    dataIsLoading,
    dataIsEmpty,
    response,
    nameSearch
  };
}
```

## Form Implementation

### Schema Definition (.schema.ts)

Every form must have a dedicated `.schema.ts` file containing:

1. **Named Constants** (no magic numbers):

   ```tsx
   const MAX_NAME_LENGTH = 254;
   const MAX_COLOR_LENGTH = 7;
   const MAX_ICON_LENGTH = 500;
   ```

2. **Zod Schema**:

   ```tsx
   export const OriginFormSchema = z.object({
     name: z
       .string()
       .min(1, "Nome é obrigatório")
       .max(254, "Nome é muito longo"),
     color: z
       .string()
       .min(1, "Cor é obrigatória")
       .max(7, "Cor deve ter no máximo 7 caracteres")
   });
   ```

3. **TypeScript Interface** (using z.infer):

   ```tsx
   export type OriginFormSchemaType = z.infer<typeof OriginFormSchema>;
   ```

4. **Default Values Function**:

   ```tsx
   export const originFormDefaultValues = (data?: CreateOrUpdateOrigin) => ({
     name: data?.name || "",
     description: data?.description || "",
     color: data?.color || "#ef4444",
     icon: data?.icon || ""
   });
   ```

**Validation Messages:**

- Always write in Portuguese
- Be descriptive and user-friendly
- Indicate what's expected, not just what's wrong

### Form Setup

**In the main component:**

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(OriginFormSchema),
  defaultValues: originFormDefaultValues()
});

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>{/* form fields */}</form>
  </Form>
);
```

**In child components:**

```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Nome
      </FormLabel>
      <FormControl>
        <Input type="text" placeholder="Nome da Origem" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## API Integration and State Management

### Custom Hook Pattern for API Calls

The structure uses custom hooks in `src/store/requests/`:

```tsx
export function useOriginCreate({ successCallback }: UseOriginCreateProps) {
  const [createOrigin, { isLoading }] = useCreateOriginMutation();

  const handleCreateOrigin = async (data: CreateOrUpdateOrigin) => {
    const [error] = await handleRequest(createOrigin(data).unwrap());

    if (error) {
      toast.error("Houve um erro ao criar a origem.");
      return;
    }

    toast.success("Origem criada com sucesso!");
    successCallback?.();
  };

  return { handleCreateOrigin, isLoading };
}
```

### RTK Query Best Practices

**Conditional Fetching:**

```tsx
const { data, isLoading } = useFindAllOriginsQuery(params, {
  skip: !shouldFetch
});
```

**Handle Loading and Error States:**

```tsx
export function useFindAllOrigins() {
  const params = useAppSelector((state) => state.originFilters);
  const { data, isLoading } = useFindAllOriginsQuery(params);

  const handleFetchOrigins = useCallback(
    (filters: OriginFilters) => {
      dispatch(OriginFiltersActions.setFilters(filters));
    },
    [dispatch]
  );

  return {
    data,
    isLoading,
    handleFetchOrigins
  };
}
```

**Error Handling Pattern:**

- Use `handleRequest` utility for all mutations
- Show `toast.error` with Portuguese messages on failure
- Show `toast.success` on successful operations
- Use success callbacks for post-mutation actions

## UI/UX Patterns

### Loading States

Use `LoadingSpinner` component for async operations:

```tsx
{
  isLoadingOrigin && (
    <div className="flex h-50 items-center justify-center">
      <LoadingSpinner variant="orbit" size="lg" />
    </div>
  );
}
```

**Rules:**

- Use `variant="orbit"` for data loading
- Use `variant="spinner"` for inline loading
- Center loading with appropriate Tailwind classes

### Styling Patterns

**Tailwind CSS:**

- Use only Tailwind utility classes for styling
- Use `cn()` utility from `@/utils/cn.utils` for conditional classes
- Never use inline styles or hardcoded HEX colors

**Spacing Consistency:**

- `gap-4` for main flex containers
- `gap-6` for larger sections
- `space-y-6` for vertical layouts

**Input Heights:**

- Default Button and Input component sizes
- Consistent padding: `px-4`, `px-6`, `p-6`

**Visual Feedback:**

- Use Lucide React icons
- Feedback colors:
  - Green for success: `text-green-600`, `bg-green-50`
  - Red for errors: `text-red-600`, `bg-red-50`
  - Yellow for warnings: `text-yellow-600`, `bg-yellow-50`

### Component Composition

**Labels with Icons:**

```tsx
<FormLabel className="flex items-center gap-2">
  <FileText className="h-4 w-4" />
  Nome
</FormLabel>
```

**Container Layout:**

```tsx
<div className="container mx-auto flex min-h-screen flex-col gap-4 p-6">
  {/* content */}
</div>
```

**Cards:**

```tsx
<Card className="w-full max-w-120 p-6">{/* content */}</Card>
```

## Navigation and Error Handling

### Routing Patterns

**Search Parameters:**

```tsx
import { useSearchParams } from "react-router";

const [params] = useSearchParams();
const id = params.get("category_id");
```

**Custom Search Params Hook:**

```tsx
const { handleRemoveKey } = useAppSearchParams();
handleRemoveKey({ key: "id" });
```

### Error Handling

**Field-Level Errors:**

```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Nome</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**API Error Messages:**

- Always use descriptive messages in Portuguese
- Use `toast.error` for failures
- Use `toast.success` for successful operations

**Examples:**

```tsx
toast.error("Houve um erro ao criar a origem.");
toast.success("Origem criada com sucesso!");
toast.error("Houve um erro ao carregar as origens.");
```

## Provider Patterns

Use providers to share state between components of a feature:

```tsx
export function OriginProviders({ children }: OriginProvidersProps) {
  const drawerVisibility = useOriginDrawerVisibility();
  const alertDialogVisibility = useOriginAlertDialogVisibility();

  return (
    <OriginDrawerVisibilityContext.Provider value={drawerVisibility}>
      <OriginAlertDialogVisibilityContext.Provider
        value={alertDialogVisibility}
      >
        <OriginDrawer />
        <OriginAlertDialog />
        {children}
      </OriginAlertDialogVisibilityContext.Provider>
    </OriginDrawerVisibilityContext.Provider>
  );
}
```

## Empty State and Skeleton Patterns

**Empty State:**

```tsx
export function OriginsListSectionEmptyState({
  nameSearch
}: OriginsListSectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground">
        {nameSearch
          ? `Nenhuma origem encontrada para "${nameSearch}"`
          : "Nenhuma origem cadastrada"}
      </p>
    </div>
  );
}
```

**Skeleton:**

```tsx
export function OriginsListSectionSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-20 w-full" />
      ))}
    </div>
  );
}
```
