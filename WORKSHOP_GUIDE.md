# Workshop Instructor Guide

## Overview
This guide helps instructors lead a hands-on workshop on building applications with Windsurf and Agentic AI.

## Workshop Duration
- **Short Session**: 2-3 hours (cover basics + 1-2 exercises)
- **Full Day**: 6-8 hours (cover all levels)
- **Multi-Day**: 2-3 days (deep dive with advanced topics)

## Pre-Workshop Checklist

### For Instructors
- [ ] Test the starter project on your machine
- [ ] Prepare example solutions for exercises
- [ ] Set up a demo environment
- [ ] Prepare backup internet connection
- [ ] Have offline documentation ready

### For Students
Send these requirements 1 week before:
- [ ] Node.js v18+ installed
- [ ] Code editor (VS Code recommended with Windsurf extension)
- [ ] Git installed
- [ ] Basic JavaScript/TypeScript knowledge
- [ ] Familiarity with React (helpful but not required)

## Workshop Structure

### Part 1: Introduction (30 minutes)
1. **Welcome & Introductions** (10 min)
   - Instructor introduction
   - Student introductions and experience levels
   - Workshop goals and outcomes

2. **Tech Stack Overview** (10 min)
   - Why TypeScript?
   - React ecosystem
   - Express.js for APIs
   - Testing importance

3. **Windsurf & Agentic AI Introduction** (10 min)
   - What is Windsurf?
   - How Agentic AI assists development
   - Best practices for AI-assisted coding
   - Demo: Ask Windsurf to explain code

### Part 2: Setup & Exploration (45 minutes)
1. **Project Setup** (15 min)
   - Clone/download starter project
   - Run `npm run install:all`
   - Start development servers
   - Verify everything works

2. **Code Walkthrough** (30 min)
   - Project structure explanation
   - Frontend architecture
   - Backend architecture
   - How components communicate
   - Where tests live

### Part 3: Hands-On Exercises (varies by session length)

#### Beginner Exercises (1-2 hours)

**Exercise 1: Add Priority Field (30 min)**
- Goal: Add a priority field to items
- Skills: TypeScript types, React state, form handling
- Windsurf prompts:
  - "Add a priority field (low, medium, high) to the Item type"
  - "Update ItemForm to include a priority dropdown"
  - "Display priority in ItemList with color coding"

**Exercise 2: Implement Filtering (30 min)**
- Goal: Filter items by name
- Skills: React state, array methods, controlled inputs
- Windsurf prompts:
  - "Add a search input to filter items by name"
  - "Implement case-insensitive filtering"

**Exercise 3: Add Sorting (30 min)**
- Goal: Sort items by different criteria
- Skills: Array sorting, UI controls
- Windsurf prompts:
  - "Add a dropdown to sort items by name or date"
  - "Implement ascending/descending toggle"

#### Intermediate Exercises (2-3 hours)

**Exercise 4: Complete DELETE Functionality (45 min)**
- Goal: Implement full delete feature
- Skills: API endpoints, HTTP methods, error handling
- Steps:
  1. Add DELETE endpoint in backend
  2. Update API service in frontend
  3. Test the functionality
  4. Add confirmation dialog

**Exercise 5: Add UPDATE Feature (60 min)**
- Goal: Edit existing items
- Skills: State management, forms, PATCH/PUT requests
- Steps:
  1. Create edit mode in ItemList
  2. Add UPDATE endpoint
  3. Handle optimistic updates
  4. Add validation

**Exercise 6: Implement Pagination (45 min)**
- Goal: Paginate item list
- Skills: State management, API design, UI components
- Steps:
  1. Add pagination to backend
  2. Create pagination component
  3. Handle page state
  4. Add page size selector

#### Advanced Exercises (3-4 hours)

**Exercise 7: Add Authentication (90 min)**
- Goal: User login/signup
- Skills: JWT, protected routes, middleware
- Topics:
  - Password hashing
  - Token management
  - Protected API endpoints
  - Frontend auth state

**Exercise 8: Database Integration (90 min)**
- Goal: Replace in-memory storage
- Skills: Database design, ORMs, migrations
- Options:
  - MongoDB with Mongoose
  - PostgreSQL with Prisma
  - SQLite for simplicity

**Exercise 9: Real-time Updates (60 min)**
- Goal: Live updates with WebSockets
- Skills: Socket.io, event handling
- Topics:
  - WebSocket setup
  - Broadcasting changes
  - Optimistic updates

## Teaching Tips

### Using Windsurf Effectively
1. **Demonstrate First**: Show how to ask good questions
2. **Encourage Experimentation**: Let students try different prompts
3. **Explain AI Suggestions**: Don't just accept code, understand it
4. **Iterate**: Show how to refine prompts for better results

### Common Student Challenges

**Challenge 1: TypeScript Errors**
- Solution: Explain type safety benefits
- Use Windsurf to explain error messages
- Show how to read TypeScript errors

**Challenge 2: Async/Await Confusion**
- Solution: Draw diagrams of async flow
- Use console.logs to show execution order
- Explain promises vs async/await

**Challenge 3: React State Updates**
- Solution: Explain immutability
- Show common patterns
- Use React DevTools

**Challenge 4: API Integration**
- Solution: Use browser DevTools Network tab
- Show request/response cycle
- Explain CORS

### Debugging Session Tips
1. Use browser DevTools together
2. Read error messages carefully
3. Check network requests
4. Verify environment variables
5. Clear node_modules if needed

## Workshop Variations

### For Beginners
- Focus on understanding existing code
- Complete 1-2 simple exercises
- More time on concepts, less on coding
- Pair programming encouraged

### For Intermediate Developers
- Quick overview, more hands-on time
- Complete 3-4 exercises
- Introduce best practices
- Code reviews

### For Advanced Developers
- Minimal setup time
- Focus on architecture decisions
- Advanced topics (auth, databases, deployment)
- Performance optimization
- Security considerations

## Assessment & Wrap-up (30 minutes)

### Knowledge Check
- What did you learn?
- What was challenging?
- What would you like to explore more?

### Next Steps
- Additional resources
- Community links
- Follow-up projects
- Advanced topics to explore

### Feedback Collection
- What worked well?
- What could be improved?
- Pace appropriate?
- More/less AI assistance?

## Resources for Students

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Practice Projects
1. Todo app with categories
2. Blog with comments
3. E-commerce product catalog
4. Social media feed
5. Dashboard with charts

### Community
- Stack Overflow
- React Discord
- TypeScript Discord
- Dev.to

## Troubleshooting Guide

### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules frontend/node_modules backend/node_modules

# Reinstall
npm run install:all
```

### Port Conflicts
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### TypeScript Errors
```bash
# Rebuild
npm run build

# Check TypeScript version
npx tsc --version
```

## Post-Workshop

### Follow-up Email Template
```
Subject: Workshop Resources & Next Steps

Hi everyone,

Thank you for attending the Windsurf & Agentic AI workshop!

Resources:
- Starter project: [link]
- Solutions: [link]
- Slides: [link]

Next Steps:
1. Complete remaining exercises
2. Build your own project
3. Join our community: [link]

Questions? Reply to this email or join our Discord.

Happy coding!
```

### Certificate of Completion
Consider providing certificates for students who:
- Complete all beginner exercises
- Submit a final project
- Participate actively

## Continuous Improvement

After each workshop:
- Collect feedback
- Update exercises based on difficulty
- Add new examples
- Improve documentation
- Share success stories

---

**Good luck with your workshop! 🎓**
