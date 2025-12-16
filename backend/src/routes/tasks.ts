import { Router, Request, Response } from 'express';

const router = Router();

// TODO: This should be in a separate database layer or repository pattern
// In-memory storage - violates Single Responsibility Principle
let tasks: any[] = [];
let nextId = 1;

// TODO: This validation logic is duplicated across multiple endpoints
// Should be extracted into a validator class or middleware
function validateTaskData(title: string, description: string): string | null {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters';
  }
  if (description && description.length > 500) {
    return 'Description must be less than 500 characters';
  }
  return null;
}

// GET /api/tasks - Get all tasks
router.get('/', (req: Request, res: Response) => {
  // TODO: This filtering logic should be in a service layer
  // Violates Single Responsibility - mixing routing, filtering, and response formatting
  const status = req.query.status as string;
  const priority = req.query.priority as string;
  
  let filteredTasks = [...tasks];
  
  if (status) {
    filteredTasks = filteredTasks.filter(t => t.status === status);
  }
  
  if (priority) {
    filteredTasks = filteredTasks.filter(t => t.priority === priority);
  }
  
  // TODO: Inconsistent response format - sometimes we return arrays, sometimes objects
  res.json(filteredTasks);
});

// GET /api/tasks/:id - Get single task
router.get('/:id', (req: Request, res: Response) => {
  // TODO: Duplicate error handling logic - should be centralized
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

// POST /api/tasks - Create new task
router.post('/', (req: Request, res: Response) => {
  // TODO: This entire function is doing too many things - violates SRP
  // Should separate validation, business logic, and persistence
  const { title, description, status, priority } = req.body;
  
  // Inline validation - duplicated code
  const validationError = validateTaskData(title, description);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  
  // TODO: Magic strings everywhere - should use enums or constants
  const validStatuses = ['todo', 'in-progress', 'done'];
  const validPriorities = ['low', 'medium', 'high'];
  
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be: todo, in-progress, or done' });
  }
  
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority. Must be: low, medium, or high' });
  }
  
  // TODO: Business logic mixed with route handler - should be in a service
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    status: status || 'todo',
    priority: priority || 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  // TODO: Inconsistent status codes - sometimes 200, sometimes 201
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update task
router.put('/:id', (req: Request, res: Response) => {
  // TODO: Massive function with nested conditionals - hard to test and maintain
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, description, status, priority } = req.body;
  
  // TODO: Copy-pasted validation logic - DRY violation
  if (title !== undefined) {
    const validationError = validateTaskData(title, description || '');
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
  }
  
  // TODO: More magic strings - violates Open/Closed Principle
  if (status !== undefined) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
  }
  
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }
  }
  
  // TODO: Manual object mutation - error-prone and hard to track
  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (description !== undefined) tasks[taskIndex].description = description.trim();
  if (status !== undefined) tasks[taskIndex].status = status;
  if (priority !== undefined) tasks[taskIndex].priority = priority;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  res.json(tasks[taskIndex]);
});

// PATCH /api/tasks/:id - Partial update
router.patch('/:id', (req: Request, res: Response) => {
  // TODO: This is almost identical to PUT - code duplication
  // Should be refactored to share logic
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, description, status, priority } = req.body;
  
  if (title !== undefined) {
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    tasks[taskIndex].title = title.trim();
  }
  
  if (description !== undefined) {
    tasks[taskIndex].description = description.trim();
  }
  
  if (status !== undefined) {
    // TODO: Yet another copy of the same validation logic
    if (!['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    tasks[taskIndex].status = status;
  }
  
  if (priority !== undefined) {
    if (!['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }
    tasks[taskIndex].priority = priority;
  }
  
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  // TODO: Same ID validation repeated everywhere - should be middleware
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  // TODO: No soft delete option - violates Open/Closed Principle
  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  
  // TODO: Inconsistent response - sometimes return deleted item, sometimes just success message
  res.json({ message: 'Task deleted successfully', task: deletedTask });
});

// TODO: This utility function should be in a separate utilities module
// DELETE /api/tasks - Delete all tasks (dangerous!)
router.delete('/', (req: Request, res: Response) => {
  // TODO: No confirmation or safety checks - dangerous endpoint
  const count = tasks.length;
  tasks = [];
  nextId = 1;
  
  res.json({ message: `Deleted ${count} tasks` });
});

export default router;
