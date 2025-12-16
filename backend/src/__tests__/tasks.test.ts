import request from 'supertest';
import app from '../index';

describe('Tasks API', () => {
  // Helper to reset tasks between tests
  beforeEach(async () => {
    await request(app).delete('/api/tasks');
  });

  describe('POST /api/tasks', () => {
    it('should create a new task with all fields', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        priority: 'high',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        priority: 'high',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should create a task with default status and priority', async () => {
      const taskData = {
        title: 'Minimal Task',
        description: 'Just a description',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('todo');
      expect(response.body.priority).toBe('medium');
    });

    it('should reject task without title', async () => {
      const taskData = {
        description: 'No title',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject task with empty title', async () => {
      const taskData = {
        title: '   ',
        description: 'Empty title',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Title is required');
    });

    it('should reject task with title too long', async () => {
      const taskData = {
        title: 'a'.repeat(101),
        description: 'Long title',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('100 characters');
    });

    it('should reject task with description too long', async () => {
      const taskData = {
        title: 'Valid Title',
        description: 'a'.repeat(501),
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('500 characters');
    });

    it('should reject task with invalid status', async () => {
      const taskData = {
        title: 'Test Task',
        status: 'invalid-status',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid status');
    });

    it('should reject task with invalid priority', async () => {
      const taskData = {
        title: 'Test Task',
        priority: 'critical',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid priority');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      // Create multiple tasks
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });
      await request(app).post('/api/tasks').send({ title: 'Task 3' });

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
    });

    it('should filter tasks by status', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1', status: 'todo' });
      await request(app).post('/api/tasks').send({ title: 'Task 2', status: 'in-progress' });
      await request(app).post('/api/tasks').send({ title: 'Task 3', status: 'done' });

      const response = await request(app).get('/api/tasks?status=todo');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe('todo');
    });

    it('should filter tasks by priority', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1', priority: 'low' });
      await request(app).post('/api/tasks').send({ title: 'Task 2', priority: 'high' });
      await request(app).post('/api/tasks').send({ title: 'Task 3', priority: 'high' });

      const response = await request(app).get('/api/tasks?priority=high');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].priority).toBe('high');
      expect(response.body[1].priority).toBe('high');
    });

    it('should filter tasks by both status and priority', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1', status: 'todo', priority: 'high' });
      await request(app).post('/api/tasks').send({ title: 'Task 2', status: 'todo', priority: 'low' });
      await request(app).post('/api/tasks').send({ title: 'Task 3', status: 'done', priority: 'high' });

      const response = await request(app).get('/api/tasks?status=todo&priority=high');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Task 1');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test Task' });
      const taskId = createResponse.body.id;

      const response = await request(app).get(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(taskId);
      expect(response.body.title).toBe('Test Task');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid task id', async () => {
      const response = await request(app).get('/api/tasks/invalid');

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid task ID');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update all fields of a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Original Title',
        description: 'Original Description',
        status: 'todo',
        priority: 'low',
      });
      const taskId = createResponse.body.id;

      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'in-progress',
        priority: 'high',
      };

      const response = await request(app).put(`/api/tasks/${taskId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.description).toBe('Updated Description');
      expect(response.body.status).toBe('in-progress');
      expect(response.body.priority).toBe('high');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).put('/api/tasks/999').send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid task id', async () => {
      const response = await request(app).put('/api/tasks/invalid').send({ title: 'Updated' });

      expect(response.status).toBe(400);
    });

    it('should reject invalid status in update', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test Task' });
      const taskId = createResponse.body.id;

      const response = await request(app).put(`/api/tasks/${taskId}`).send({ status: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid status');
    });

    it('should reject invalid priority in update', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test Task' });
      const taskId = createResponse.body.id;

      const response = await request(app).put(`/api/tasks/${taskId}`).send({ priority: 'urgent' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid priority');
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should partially update a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Original Title',
        description: 'Original Description',
        status: 'todo',
        priority: 'low',
      });
      const taskId = createResponse.body.id;

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({ status: 'done' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Original Title');
      expect(response.body.status).toBe('done');
    });

    it('should update only title', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Original' });
      const taskId = createResponse.body.id;

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({ title: 'New Title' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('New Title');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).patch('/api/tasks/999').send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });

    it('should reject empty title', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Original' });
      const taskId = createResponse.body.id;

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Title cannot be empty');
    });

    it('should reject invalid status', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test' });
      const taskId = createResponse.body.id;

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({ status: 'invalid' });

      expect(response.status).toBe(400);
    });

    it('should reject invalid priority', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test' });
      const taskId = createResponse.body.id;

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({ priority: 'critical' });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'To Delete' });
      const taskId = createResponse.body.id;

      const response = await request(app).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('deleted successfully');
      expect(response.body.task.id).toBe(taskId);

      // Verify task is actually deleted
      const getResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/999');

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid task id', async () => {
      const response = await request(app).delete('/api/tasks/invalid');

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tasks', () => {
    it('should delete all tasks', async () => {
      // Create multiple tasks
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });
      await request(app).post('/api/tasks').send({ title: 'Task 3' });

      const response = await request(app).delete('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Deleted 3 tasks');

      // Verify all tasks are deleted
      const getResponse = await request(app).get('/api/tasks');
      expect(getResponse.body).toHaveLength(0);
    });

    it('should handle deleting when no tasks exist', async () => {
      const response = await request(app).delete('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Deleted 0 tasks');
    });
  });

  describe('Edge cases and integration', () => {
    it('should handle multiple operations in sequence', async () => {
      // Create
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Task 1' });
      const taskId = createResponse.body.id;

      // Read
      const getResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(getResponse.status).toBe(200);

      // Update
      const updateResponse = await request(app).put(`/api/tasks/${taskId}`).send({ title: 'Updated Task' });
      expect(updateResponse.status).toBe(200);

      // Delete
      const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);
      expect(deleteResponse.status).toBe(200);

      // Verify deleted
      const finalGetResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(finalGetResponse.status).toBe(404);
    });

    it('should trim whitespace from title and description', async () => {
      const response = await request(app).post('/api/tasks').send({
        title: '  Trimmed Title  ',
        description: '  Trimmed Description  ',
      });

      expect(response.body.title).toBe('Trimmed Title');
      expect(response.body.description).toBe('Trimmed Description');
    });

    it('should handle task with empty description', async () => {
      const response = await request(app).post('/api/tasks').send({
        title: 'No Description',
        description: '',
      });

      expect(response.status).toBe(201);
      expect(response.body.description).toBe('');
    });

    it('should increment task IDs correctly', async () => {
      const response1 = await request(app).post('/api/tasks').send({ title: 'Task 1' });
      const response2 = await request(app).post('/api/tasks').send({ title: 'Task 2' });
      const response3 = await request(app).post('/api/tasks').send({ title: 'Task 3' });

      expect(response2.body.id).toBe(response1.body.id + 1);
      expect(response3.body.id).toBe(response2.body.id + 1);
    });
  });
});
