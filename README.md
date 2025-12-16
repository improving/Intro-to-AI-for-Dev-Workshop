# Agentic Workshop Starter

A clean, modern full-stack web application template built with React, TypeScript, Express, and Tailwind CSS. This starter provides a solid foundation with all the tooling configured, ready for you to build upon during the workshop.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **Jest + React Testing Library** - Unit testing

### Backend
- **Node.js + Express** - Web server framework
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-origin resource sharing
- **Jest + Supertest** - API testing

### Code Quality
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific rules

## 📁 Project Structure

```
agentic-labs/
├── .windsurf/                # Windsurf IDE configuration
│   └── workflows/           # AI workflow definitions
│       ├── openspec-proposal.md   # Create new change proposals
│       ├── openspec-apply.md      # Apply approved changes
│       └── openspec-archive.md    # Archive deployed changes
│
├── openspec/                 # OpenSpec project management
│   ├── AGENTS.md            # AI agent instructions
│   ├── project.md           # Project configuration
│   ├── changes/             # Active change proposals
│   └── specs/               # Deployed specifications
│
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── __tests__/       # Component tests
│   │   │   └── App.test.tsx
│   │   ├── services/        # API service layer
│   │   │   └── api.ts       # API client functions
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── index.ts     # Shared types
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   ├── index.css        # Global styles
│   │   └── setupTests.ts    # Test configuration
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── jest.config.js
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   │   └── api.ts       # API endpoints
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── index.ts     # Shared types
│   │   ├── __tests__/       # API tests
│   │   │   └── api.test.ts
│   │   └── index.ts         # Server entry point
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   ├── tsconfig.json
│   ├── nodemon.json
│   └── jest.config.js
│
├── package.json              # Root package.json for scripts
├── agentic-labs.code-workspace  # VS Code workspace settings
├── LICENSE                   # MIT License
├── README.md                 # This file
├── QUICKSTART.md            # Quick start guide
├── LINTING.md               # Linting and formatting guide
├── OPENSPEC_GUIDE.md        # OpenSpec usage guide
└── WORKSHOP_GUIDE.md        # Workshop instructions
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenSpec CLI (`npm install -g openspec`) - For managing user stories and development tasks

### Installation

1. **Clone or navigate to this directory**

2. **Install all dependencies** (root, frontend, and backend):
   ```bash
   npm run install:all
   ```

   Or install individually:
   ```bash
   # Root dependencies
   npm install

   # Frontend dependencies
   cd frontend && npm install

   # Backend dependencies
   cd ../backend && npm install
   ```

3. **Set up environment variables**:
   ```bash
   cd backend
   cp .env.example .env
   ```

4. **Configure GitHub SSE MCP Server** (for AI assistant integration):
   
   a. **Create a GitHub Personal Access Token (PAT)**:
      - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
      - Click "Generate new token (classic)"
      - Select the following scopes:
        - `repo` (Full control of private repositories - includes code, issues, PRs)
        - `workflow` (Update GitHub Action workflows)
        - `read:org` (Read org and team membership)
        - `read:user` (Read user profile data)
        - `user:email` (Access user email addresses)
      - Copy the generated token
   
   b. **Set the environment variable**:
      
      **macOS/Linux:**
      
      Add to your shell profile (`~/.zshrc`, `~/.bashrc`, or `~/.bash_profile`):
      ```bash
      export GITHUB_PERSONAL_ACCESS_TOKEN="your_pat_here"
      ```
      
      Then reload your shell:
      ```bash
      source ~/.zshrc  # or ~/.bashrc, ~/.bash_profile
      ```
      
      **Windows:**
      
      Using PowerShell (persistent):
      ```powershell
      [System.Environment]::SetEnvironmentVariable('GITHUB_PERSONAL_ACCESS_TOKEN', 'your_pat_here', 'User')
      ```
      
      Or using Command Prompt (current session only):
      ```cmd
      set GITHUB_PERSONAL_ACCESS_TOKEN=your_pat_here
      ```
      
      For persistent Windows setup, you can also use System Properties:
      - Search for "Environment Variables" in Windows
      - Click "Edit the system environment variables"
      - Click "Environment Variables" button
      - Under "User variables", click "New"
      - Variable name: `GITHUB_PERSONAL_ACCESS_TOKEN`
      - Variable value: `your_pat_here`
      - Click OK and restart your terminal/IDE
   
   c. **Configure Windsurf MCP** (if using Windsurf IDE):
      
      Edit your `~/.codeium/windsurf/mcp_config.json`:
      ```json
      {
        "mcpServers": {
          "github-sse": {
            "url": "https://api.githubcopilot.com/mcp/",
            "headers": {
              "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
            },
            "disabled": false
          }
        }
      }
      ```
      
      Restart Windsurf after making these changes.

## 🏃 Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend** (runs on http://localhost:3001):
```bash
npm run dev:backend
```

**Frontend** (runs on http://localhost:5173):
```bash
npm run dev:frontend
```

### Production Build

Build both frontend and backend:
```bash
npm run build
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests Separately

**Backend tests**:
```bash
npm run test:backend
```

**Frontend tests**:
```bash
npm run test:frontend
```

### Watch Mode
```bash
# Backend
cd backend && npm run test:watch

# Frontend
cd frontend && npm run test:watch
```

### Coverage Reports
```bash
# Backend
cd backend && npm run test:coverage

# Frontend
cd frontend && npm run test:coverage
```

## 🔍 Code Quality

### Linting

Check code quality with ESLint:
```bash
npm run lint              # Check both frontend and backend
npm run lint:fix          # Auto-fix issues
```

### Formatting

Format code with Prettier:
```bash
npm run format            # Format all code
npm run format:check      # Check if code is formatted
```

**See [LINTING.md](./LINTING.md) for detailed documentation on ESLint and Prettier.**

## 📚 API Endpoints

### Example Endpoints

- **GET** `/api/hello` - Simple hello message from the API
  ```json
  {
    "message": "Hello from the API!"
  }
  ```

### Health Check

- **GET** `/health` - Server health status
  ```json
  {
    "status": "ok",
    "timestamp": "2025-12-01T13:00:00.000Z"
  }
  ```

## 🎯 What's Included

This baseline starter includes:

- ✅ **Clean Welcome Page** - Modern, responsive UI with Tailwind CSS
- ✅ **API Connectivity** - Frontend connects to backend and displays API status
- ✅ **Full TypeScript Setup** - Type safety across the entire stack
- ✅ **Testing Framework** - Jest configured for both frontend and backend
- ✅ **Code Quality Tools** - ESLint and Prettier pre-configured
- ✅ **Hot Reload** - Fast development with Vite and Nodemon
- ✅ **Modern Icons** - Lucide React icon library included

## 🎯 Workshop Exercises

This is a clean baseline ready for you to build upon. During the workshop, you'll add features such as:

### Example Features to Build
1. **Task Management** - Create, read, update, and delete tasks
2. **Data Persistence** - Add a database (MongoDB, PostgreSQL, or SQLite)
3. **User Authentication** - Implement login and signup
4. **Real-time Updates** - Use WebSockets for live data
5. **File Uploads** - Allow users to attach files
6. **Search & Filter** - Add advanced data filtering
7. **Pagination** - Handle large datasets efficiently
8. **API Documentation** - Add Swagger/OpenAPI docs

## 🎨 Customization

### Styling
- Tailwind CSS classes are used throughout
- Modify `frontend/tailwind.config.js` to customize the theme
- Update `frontend/src/index.css` for global styles

### API Configuration
- Backend port: `backend/.env` (PORT variable)
- Frontend proxy: `frontend/vite.config.ts` (proxy configuration)

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
- Change the backend port in `backend/.env`
- Update the proxy in `frontend/vite.config.ts` to match

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npm run build
```

## 📖 Learning Resources

### Using Windsurf
- Ask Windsurf to explain any code you don't understand
- Use Windsurf to implement new features
- Let Windsurf help you write tests
- Ask Windsurf to refactor code

### Example Prompts for Windsurf

These prompts follow the **Role/Task/Constraints/Context/Output** format to help you get the best results from Windsurf.

#### 1. Creating a Change Proposal with OpenSpec

```
Use the /openspec-proposal workflow to create a new change proposal for adding 
task management functionality to this application.

The feature should include:
- Backend API endpoints for CRUD operations on tasks (create, read, update, delete)
- Task data model with title, description, status, and timestamps
- Frontend React components for displaying and managing tasks
- Form validation and error handling
- Unit tests for both backend and frontend
- In-memory storage for the workshop (no database required)

The proposal should break this down into implementable tasks suitable for a 
workshop setting (2-4 hours total implementation time).
```

**What this does:**
- Creates a structured change proposal in `openspec/changes/`
- Breaks down the feature into specific, actionable tasks
- Provides implementation details and acceptance criteria
- Gives you a clear roadmap before writing any code

#### 2. Implementing an Approved Change

```
Use the /openspec-apply workflow to implement change 001-task-management
```

**What this does:**
- Reads the approved proposal from `openspec/changes/001-task-management.md`
- Implements all tasks defined in the proposal systematically
- Follows the existing project structure and coding patterns
- Creates TypeScript types, API endpoints, React components, and tests
- Ensures code follows ESLint and Prettier configurations
- Updates the proposal to track implementation progress

**Before running this:**
1. Review the proposal: `cat openspec/changes/001-task-management.md`
2. Ensure the proposal status is set to "approved"
3. Make sure you understand the tasks and acceptance criteria

**After implementation:**
- Run tests: `npm test`
- Test the feature manually in your browser
- Review the generated code and make any necessary adjustments

#### 3. Git Workflow - Branch, Commit, and PR

```
Role: You are a developer following Git best practices for feature development.

Task: Use git to create a feature branch, commit the task creation code, push to remote, and create a pull request.

Constraints:
- Branch name must follow the convention: feature/task-creation
- Commit messages must be descriptive and follow conventional commits format
- The PR description must include: what was changed, why it was changed, and how to test it
- Do not commit node_modules, build artifacts, or IDE-specific files

Context: I have just finished implementing the task creation feature (backend endpoint, frontend component, and tests). The code is currently uncommitted in my working directory. The remote repository is on GitHub at jbrinkman/agentic-workshop-starter.

Output: Execute the git commands to:
1. Create and switch to a new feature branch
2. Stage and commit the changes with a proper commit message
3. Push the branch to the remote repository
4. Provide the command or instructions to create a PR on GitHub
```

#### 4. Code Review from Pull Request

```
Role: You are a senior developer performing a thorough code review.

Task: Pull the branch associated with PR #[NUMBER] and perform a comprehensive code review of the task creation feature.

Constraints:
- Check for potential bugs, edge cases, and error handling issues
- Verify that tests exist and provide adequate coverage
- Look for code smells, readability issues, and violations of best practices
- Ensure TypeScript types are properly defined and used
- Verify that the code follows the project's existing patterns and conventions
- Check for security issues (input validation, XSS, injection vulnerabilities)

Context: This PR implements a task creation feature for the workshop starter app. It includes backend API endpoints, frontend components, and tests. The team follows TypeScript strict mode, uses ESLint/Prettier, and emphasizes test coverage.

Output: Provide a detailed code review organized into sections:
1. Critical Issues: Bugs or security problems that must be fixed
2. Missing Tests: Areas that need test coverage
3. Code Quality: Readability, maintainability, and best practice suggestions
4. Positive Observations: What was done well
5. Summary: Overall assessment and recommendation (approve, request changes, or comment)
```

## 🤝 Contributing

This is a workshop starter project. Feel free to:
- Add new features
- Improve existing code
- Add more tests
- Enhance documentation

## 📝 License

MIT License - feel free to use this project for learning and teaching purposes.

## 🎓 What You'll Learn

This workshop focuses on **Agentic AI development** using **Windsurf** as your AI pair programming assistant. You'll learn how AI agents can transform your entire development workflow.

### Learning Objectives

1. **🤖 Develop with AI Agents**
   - Get hands-on experience with Windsurf, an AI-powered IDE
   - Learn how to effectively collaborate with AI agents during development
   - Understand when and how to leverage AI assistance for maximum productivity

2. **📋 Requirements to User Stories with AI**
   - Transform high-level requirements into well-formed user stories
   - Use AI to break down complex features into actionable tasks
   - Learn best practices for writing AI-friendly specifications

3. **🔄 AI-Powered Version Control**
   - Leverage AI for Git operations and branch management
   - Generate meaningful commit messages automatically
   - Use AI to resolve merge conflicts and review diffs

4. **✨ Code Review and Improvement with AI**
   - Perform AI-assisted code reviews for quality and best practices
   - Identify bugs, security issues, and performance improvements
   - Refactor code with AI suggestions while maintaining functionality
   - Learn to critically evaluate and apply AI recommendations

### Technical Stack
This workshop uses a modern full-stack TypeScript application to demonstrate AI-assisted development:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Testing**: Jest for unit and integration tests
- **AI Tools**: Windsurf IDE with GitHub MCP integration

---

**Happy Coding! 🚀**

For questions or issues during the workshop, please ask your instructor or use Windsurf to help debug!