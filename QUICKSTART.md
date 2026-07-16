# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install a Node version manager (`nvm` or `fnm`)

- **macOS/Linux (`nvm`)**: https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script
- **Windows (`fnm`)**: https://github.com/Schniz/fnm

## Step 2: Set the Node version

```bash
nvm use
# OR
fnm use
```
This uses the version specified in `.nvmrc`.

If the version is not installed yet, install it first with your version manager (`nvm install` or `fnm install`) and then run `nvm use` / `fnm use` again.

## Step 3: Install Dependencies

```bash
npm run install:all
```

This will install dependencies for the root project, frontend, and backend.

## Step 3.5 (Workshop): Install OpenSpec CLI

If you'll use OpenSpec workflows in class, install the working CLI package:

```bash
npm install -g @codewalla_india/openspec
```

Then verify:

```bash
openspec --version
```

## Step 4: Build the application

```bash
npm run build
```

## Step 5: Start the Application

```bash
npm run dev
```

This starts both the backend (port 3001) and frontend (port 3000) servers.

## Step 6: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Workshop Starter App!

## Step 7: Verify Everything Works

1. **Add an item**: Fill out the form and click "Add Item"
2. **View items**: See your item appear in the list below
3. **Check the API**: Visit [http://localhost:3001/health](http://localhost:3001/health)

## Step 8: Run Tests

```bash
npm test
```

All tests should pass! ✅

## What's Next?

- Read the full [README.md](./README.md) for detailed documentation
- Check out [WORKSHOP_GUIDE.md](./WORKSHOP_GUIDE.md) if you're an instructor
- Start with the beginner exercises in the README

## Troubleshooting

### Ports Already in Use?

**Backend (3001):**
1. Edit `backend/.env`
2. Change `PORT=3001` to another port (e.g., `PORT=3002`)
3. Update `frontend/vite.config.ts` proxy target to match

**Frontend (3000):**
- Vite will automatically try the next available port (3001, 3002, etc.)

### Installation Errors?

```bash
# Clear everything and start fresh
rm -rf node_modules frontend/node_modules backend/node_modules
rm -rf frontend/package-lock.json backend/package-lock.json package-lock.json
npm run install:all
```

### Still Having Issues?

1. Make sure you have Node.js v18+ installed: `node --version`
2. Try using npm instead of yarn
3. Check that no other processes are using ports 3000 or 3001
4. Restart your terminal/IDE

## Using Windsurf

Once everything is running, try asking Windsurf:

- "Explain how the ItemForm component works"
- "Add a timestamp to each item"
- "Create a new component for displaying statistics"
- "Write a test for the getItems API endpoint"

Happy coding! 🚀
