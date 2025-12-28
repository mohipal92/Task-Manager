import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:5000/api'});
export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks/create', taskData);
export const updateTask = (id, updatedData) => API.put(`/tasks/update/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/tasks/delete/${id}`);