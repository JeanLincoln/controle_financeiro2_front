# Tailwind CSS Class & Import Formatting Setup

## Overview
Your project is now configured to automatically:
1. Sort imports in a consistent order using `@ianvs/prettier-plugin-sort-imports`
2. Format Tailwind CSS classes in the recommended pattern using `prettier-plugin-tailwindcss`

## What Was Installed
- **@ianvs/prettier-plugin-sort-imports**: Automatically organizes and sorts your import statements
- **prettier-plugin-tailwindcss**: Official Prettier plugin that automatically sorts Tailwind CSS classes according to the recommended class order

## Configuration Files

### `.prettierrc.json`
The Prettier configuration now includes both plugins:
```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": false,
  "printWidth": 80,
  "plugins": [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "importOrder": [
    "^react$",
    "^react",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]"
  ]
}
```

**Import Order Explanation:**
1. React imports first (exact match, then others)
2. Third-party modules
3. Blank line separator
4. Alias imports (if using @/ prefix)
5. Blank line separator
6. Relative imports (./ or ../)

### `.vscode/settings.json`
VS Code is configured to:
- Format files on save
- Use Prettier as the default formatter
- Run ESLint fixes and organize imports on save

### `package.json`
Added scripts and updated lint-staged:
- **`pnpm format`**: Manually format all TypeScript, TSX, JSON, and CSS files
- **lint-staged**: Now includes `.tsx` files for formatting on commit

## How It Works

### Automatic Formatting
1. **On Save**: When you save a file in VS Code, Prettier will automatically:
   - Sort and organize your imports
   - Format your Tailwind CSS classes
2. **On Commit**: When you commit files, lint-staged will format them automatically

### Manual Formatting
You can manually format all files by running:
```bash
pnpm format
```

### Import Sorting Example
**Before:**
```tsx
import { Button } from "./components/Button";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { cn } from "../utils/cn";
```

**After:**
```tsx
import React from "react";
import { useState } from "react";

import axios from "axios";

import { cn } from "../utils/cn";
import { Button } from "./components/Button";
```

### Tailwind Class Order
The plugin automatically sorts Tailwind classes in this order:
1. Layout (display, position, etc.)
2. Flexbox & Grid
3. Spacing (margin, padding)
4. Sizing (width, height)
5. Typography
6. Visual (backgrounds, borders)
7. Effects (shadows, opacity)
8. Transitions & Animations
9. Variants (hover:, focus:, etc.)

### Example
**Before:**
```tsx
<div className="text-white hover:bg-blue-600 p-4 bg-blue-500 rounded-lg">
```

**After:**
```tsx
<div className="rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600">
```

## Benefits
- ✅ **Import Sorting**: Consistent import organization across your entire codebase
- ✅ **Tailwind Classes**: Consistent class ordering following best practices
- ✅ **Readability**: Easier to read and understand component styling
- ✅ **Fewer Conflicts**: Reduces merge conflicts in both imports and class names
- ✅ **Best Practices**: Follows both React and Tailwind CSS best practices
- ✅ **Seamless Integration**: Works together with your existing Prettier configuration

## Additional Notes
- Both plugins work together seamlessly (order matters: imports plugin must come before Tailwind plugin)
- The Tailwind plugin is compatible with custom Tailwind configurations
- It works with arbitrary values like `w-[123px]`
- Import sorting preserves type imports and handles side-effect imports correctly
- Both formatters preserve important specificity when needed
