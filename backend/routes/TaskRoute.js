import express from 'express';
import { createTask, deleteTask, getTask, updateTask } from '../controllers/TaskController.js';
const router=express.Router();
router.post('/tasks/create',createTask);
router.put('/tasks/update/:id',updateTask);
router.delete('/tasks/delete/:id',deleteTask);
router.get('/tasks',getTask);

export default router;

