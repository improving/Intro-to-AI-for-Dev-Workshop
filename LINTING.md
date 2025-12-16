# Linting and Formatting Guide

This project uses **ESLint** for code quality and **Prettier** for code formatting.

## Quick Start

### Check Everything
```bash
# From root directory
npm run lint          # Check all code
npm run format:check  # Check formatting
```

### Fix Everything
```bash
# From root directory
npm run lint:fix      # Auto-fix linting issues
npm run format        # Auto-format all code
```

## Available Scripts

### Root Level (runs both frontend and backend)

| Command | Description |
|---------|-------------|
| `npm run lint` | Check linting in both frontend and backend |
| `npm run lint:fix` | Auto-fix linting issues in both |
| `npm run format` | Format all code in both |
| `npm run format:check` | Check if code is formatted correctly |

### Backend Only

```bash
cd backend
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting errors
npm run format            # Format all TypeScript files
npm run format:check      # Check formatting without changes
```

### Frontend Only

```bash
cd frontend
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting errors
npm run format            # Format all TypeScript/TSX/CSS files
npm run format:check      # Check formatting without changes
```

## What Gets Checked?

### ESLint Rules

**Backend:**
- TypeScript best practices
- Node.js conventions
- No unused variables (with `_` prefix exception)
- Consistent code style
- Prettier integration

**Frontend:**
- TypeScript best practices
- React best practices
- React Hooks rules
- JSX formatting
- No unused variables (with `_` prefix exception)
- Prettier integration

### Prettier Rules

Both frontend and backend use the same Prettier configuration:

```json
{
  "semi": true,                    // Use semicolons
  "trailingComma": "es5",         // Trailing commas where valid in ES5
  "singleQuote": true,            // Use single quotes
  "printWidth": 100,              // Line length of 100 characters
  "tabWidth": 2,                  // 2 spaces for indentation
  "useTabs": false,               // Use spaces, not tabs
  "arrowParens": "avoid",         // Omit parens when possible
  "endOfLine": "lf"               // Unix-style line endings
}
```

## IDE Integration

### VS Code / Windsurf

**Recommended Extensions:**
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

**Settings (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Common Issues & Solutions

### Issue: ESLint errors not showing in IDE

**Solution:**
1. Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Reload window: `Cmd+Shift+P` → "Developer: Reload Window"
3. Check ESLint extension is installed and enabled

### Issue: Prettier not formatting on save

**Solution:**
1. Set Prettier as default formatter in settings
2. Enable "Format on Save" in settings
3. Check `.prettierrc` file exists

### Issue: ESLint and Prettier conflicts

**Solution:**
- We use `eslint-config-prettier` to disable conflicting ESLint rules
- Prettier rules take precedence for formatting
- ESLint handles code quality, Prettier handles formatting

### Issue: "Parsing error" in ESLint

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check that `@typescript-eslint/parser` is installed
3. Verify `.eslintrc.json` configuration is correct

## Ignoring Files

### ESLint

Files/folders ignored by ESLint (see `.eslintrc.json`):
- `dist/`
- `node_modules/`
- `coverage/`
- `*.config.js`
- `*.config.ts` (frontend only)

### Prettier

Files/folders ignored by Prettier (see `.prettierignore`):
- `node_modules/`
- `dist/` or `build/`
- `coverage/`
- `*.config.js` and `*.config.ts`
- `package-lock.json`
- `index.html` (frontend only)

## Custom Rules

### Allowing Unused Variables

Prefix with underscore to allow unused variables:

```typescript
// ❌ Error: 'req' is defined but never used
app.get('/test', (req, res) => {
  res.send('ok');
});

// ✅ OK: Prefixed with underscore
app.get('/test', (_req, res) => {
  res.send('ok');
});
```

### Disabling Rules

**For a single line:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

**For a block:**
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const data: any = fetchData();
const more: any = fetchMore();
/* eslint-enable @typescript-eslint/no-explicit-any */
```

**For an entire file:**
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// ... rest of file
```

## Workshop Tips

### For Students

1. **Run linter before committing:**
   ```bash
   npm run lint && npm run format:check
   ```

2. **Auto-fix most issues:**
   ```bash
   npm run lint:fix && npm run format
   ```

3. **Understand the errors:**
   - Read the error message carefully
   - Look up the rule name (e.g., `@typescript-eslint/no-unused-vars`)
   - Ask Windsurf to explain the error

### For Instructors

1. **Teaching moments:**
   - Show how linting catches bugs early
   - Demonstrate auto-fix capabilities
   - Explain why certain rules exist
   - Create Windsurf rule to auto-run lint and format before each commit

2. **Common student mistakes:**
   - Unused imports → Show auto-fix
   - Missing semicolons → Prettier handles it
   - Inconsistent formatting → Run format command

3. **Best practices:**
   - Lint early and often
   - Don't disable rules without understanding them
   - Use Prettier for all formatting decisions

## CI/CD Integration

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Lint
  run: npm run lint

- name: Check Formatting
  run: npm run format:check
```

## Resources

### Documentation
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [ESLint React Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [React Hooks ESLint](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### Learning
- [Why Use ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Prettier vs Linters](https://prettier.io/docs/en/comparison.html)
- [TypeScript ESLint Guide](https://typescript-eslint.io/getting-started/)

---

**Pro Tip:** Set up your IDE to format on save and run ESLint automatically. This way, you'll catch issues as you code! 🚀
