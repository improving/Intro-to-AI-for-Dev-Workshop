# OpenSpec Guide

A practical guide to using OpenSpec for managing specifications and implementing changes in the Agentic Workshop.

## 📋 What is OpenSpec?

OpenSpec is a specification management system that helps you:
- **Plan changes** through structured proposals
- **Track implementation** with clear workflows
- **Maintain documentation** that stays synchronized with your code
- **Collaborate with AI** using standardized formats

## 🚀 Quick Start

### Installation

OpenSpec is already initialized in this project. If you need to install it globally:

```bash
npm install -g openspec
```

### Project Structure

OpenSpec creates the following structure in your project:

```
.windsurf/
└── workflows/              # AI-assisted workflows
    ├── openspec-proposal.md   # Create new proposals
    ├── openspec-apply.md      # Implement approved changes
    └── openspec-archive.md    # Archive completed work

openspec/
├── AGENTS.md              # Instructions for AI assistants
├── project.md             # Project configuration
├── changes/               # Active change proposals (work in progress)
└── specs/                 # Deployed specifications (completed work)
```

## 🔄 OpenSpec Workflow

The OpenSpec workflow follows three main phases:

### 1. **Proposal Phase** - Planning Your Change

Create a new change proposal when you want to add a feature or make a significant modification.

**When to create a proposal:**
- Adding new features (e.g., task management, user authentication)
- Making breaking changes to APIs or data structures
- Implementing complex functionality that needs planning
- Architectural changes or refactoring

**How to create a proposal:**

Use the `/openspec-proposal` workflow in Windsurf:

```
Use the /openspec-proposal workflow to create a new change proposal for [feature description]
```

**What gets created:**
- A new markdown file in `openspec/changes/` with a unique ID
- Structured sections for problem, solution, tasks, and implementation details
- A clear plan before you start coding

**Example proposal request:**
```
Use the /openspec-proposal workflow to create a new change proposal for adding 
task management functionality with CRUD operations, including a tasks API endpoint 
and a React component for displaying and managing tasks.
```

### 2. **Implementation Phase** - Building the Feature

Once your proposal is approved (reviewed and ready), implement the changes.

**How to implement:**

Use the `/openspec-apply` workflow in Windsurf:

```
Use the /openspec-apply workflow to implement the approved change [change-id]
```

**What happens:**
- AI reads the proposal and implements the specified changes
- Code is written following the tasks outlined in the proposal
- Tests are created as specified
- The proposal tracks implementation progress

**Tips for implementation:**
- Review the proposal carefully before starting
- Implement one task at a time
- Run tests frequently to catch issues early
- Update the proposal if you discover new requirements

### 3. **Archive Phase** - Completing the Work

After the change is deployed and working, archive it to keep your workspace clean.

**How to archive:**

Use the `/openspec-archive` workflow in Windsurf:

```
Use the /openspec-archive workflow to archive the deployed change [change-id]
```

**What happens:**
- The change proposal moves from `openspec/changes/` to `openspec/specs/`
- The specification becomes part of your project documentation
- Your active changes directory stays focused on current work

## 📝 Working with Proposals

### Proposal Structure

Each proposal includes:

1. **Metadata** - ID, status, dates, and tags
2. **Problem Statement** - What needs to be solved and why
3. **Solution Overview** - High-level approach
4. **Tasks** - Specific implementation steps
5. **Implementation Details** - Technical specifications
6. **Testing Strategy** - How to verify the changes work

### Proposal Status

Proposals move through these states:
- **Draft** - Initial creation, still being refined
- **Approved** - Ready for implementation
- **In Progress** - Currently being implemented
- **Deployed** - Completed and in production
- **Archived** - Moved to specs/ directory

### Editing Proposals

You can manually edit proposals in `openspec/changes/`:

```bash
# Open a proposal for editing
code openspec/changes/001-task-management.md
```

Common edits:
- Adding or refining tasks
- Updating implementation details
- Clarifying requirements
- Adding acceptance criteria

## 🤖 AI Integration

OpenSpec is designed to work seamlessly with AI assistants like Windsurf.

### Key Benefits

1. **Structured Context** - AI reads proposals to understand what to build
2. **Consistent Format** - Standard structure helps AI generate better code
3. **Task Tracking** - AI can work through tasks systematically
4. **Documentation** - Specs stay synchronized with implementation

### Using OpenSpec with Windsurf

**Creating proposals:**
```
Use /openspec-proposal to create a change for adding user authentication 
with JWT tokens, including login, signup, and protected routes.
```

**Implementing changes:**
```
Use /openspec-apply to implement change 002-user-authentication
```

**Archiving completed work:**
```
Use /openspec-archive to archive change 002-user-authentication
```

## 💡 Best Practices

### 1. **One Feature Per Proposal**
Keep proposals focused on a single feature or change. This makes them easier to review, implement, and test.

✅ Good: "Add task creation endpoint with validation"  
❌ Too broad: "Implement entire task management system"

### 2. **Write Clear Tasks**
Break down implementation into specific, actionable tasks.

✅ Good:
- Create Task type definition in backend/src/types
- Implement POST /api/tasks endpoint with validation
- Add unit tests for task creation endpoint

❌ Too vague:
- Add task functionality
- Make it work

### 3. **Include Acceptance Criteria**
Define what "done" looks like for each task.

Example:
```
Task: Create task creation form component
Acceptance Criteria:
- Form includes title and description fields
- Validates required fields before submission
- Displays error messages for validation failures
- Calls API service on successful validation
```

### 4. **Update Proposals as You Learn**
If you discover new requirements during implementation, update the proposal. This keeps documentation accurate.

### 5. **Archive Regularly**
Move completed changes to specs/ to keep your changes/ directory manageable.

## 🎯 Workshop Examples

### Example 1: Adding a Feature

**Scenario:** Add task management to the application

**Step 1 - Create Proposal:**
```
Use /openspec-proposal to create a change for implementing task management 
with the ability to create, read, update, and delete tasks. Include both 
backend API endpoints and frontend React components.
```

**Step 2 - Review and Refine:**
- Open `openspec/changes/001-task-management.md`
- Review the generated tasks and implementation details
- Add any missing requirements or clarifications
- Mark status as "approved" when ready

**Step 3 - Implement:**
```
Use /openspec-apply to implement change 001-task-management
```

**Step 4 - Test and Deploy:**
- Run tests: `npm test`
- Test manually in the browser
- Commit and push changes

**Step 5 - Archive:**
```
Use /openspec-archive to archive change 001-task-management
```

### Example 2: Bug Fix with Specification

**Scenario:** Fix a validation bug and document the fix

**Step 1 - Create Proposal:**
```
Use /openspec-proposal to create a change for fixing the task title 
validation bug where empty strings are accepted. Add proper validation 
to reject empty or whitespace-only titles.
```

**Step 2 - Implement:**
```
Use /openspec-apply to implement change 002-fix-task-validation
```

**Step 3 - Archive:**
```
Use /openspec-archive to archive change 002-fix-task-validation
```

## 🔍 Viewing Your Specifications

### Active Changes
```bash
# List all active proposals
ls -la openspec/changes/

# View a specific proposal
cat openspec/changes/001-task-management.md
```

### Archived Specs
```bash
# List all archived specifications
ls -la openspec/specs/

# View a specific spec
cat openspec/specs/001-task-management.md
```

### Using Windsurf
Simply open the files in Windsurf and use `@` mentions to reference them:

```
Review @openspec/changes/001-task-management.md and tell me what tasks remain
```

## 🛠️ Troubleshooting

### Proposal Not Found
If a workflow can't find a proposal:
1. Check the change ID is correct
2. Verify the file exists in `openspec/changes/`
3. Ensure the filename matches the ID format

### AI Not Following Proposal
If the AI isn't implementing according to the proposal:
1. Make sure the proposal is marked as "approved"
2. Check that tasks are clearly defined
3. Try being more specific in your implementation request

### Merge Conflicts in Proposals
If you get merge conflicts in proposal files:
1. Resolve them like any other markdown file
2. Keep the most recent status and implementation details
3. Preserve all completed tasks

## 📚 Additional Resources

- **OpenSpec Documentation**: Check the official OpenSpec docs for advanced features
- **AGENTS.md**: Read `openspec/AGENTS.md` for AI-specific instructions
- **Workflows**: Explore `.windsurf/workflows/` for workflow details

## 🎓 Learning Path

1. **Start Simple** - Create a proposal for a small feature (e.g., add a single API endpoint)
2. **Implement It** - Use the apply workflow to build the feature
3. **Archive It** - Complete the cycle by archiving the change
4. **Scale Up** - Try more complex features with multiple tasks
5. **Refine** - Learn to write better proposals based on what works

---

**Remember:** OpenSpec is a tool to help you plan, implement, and document changes systematically. It works best when you:
- Write clear, focused proposals
- Break work into manageable tasks
- Keep specifications up to date
- Archive completed work regularly

Happy coding! 🚀
