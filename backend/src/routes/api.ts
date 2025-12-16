import { Router } from 'express';
import tasksRouter from './tasks';

const router = Router();

// Example API route
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Tasks routes
router.use('/tasks', tasksRouter);

export default router;
