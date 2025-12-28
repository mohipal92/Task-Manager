import axios from 'axios';
const API = axios.create({baseURL: 'https://task-manager-b3ns.onrender.com/api'});
export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks/create', taskData);
export const updateTask = (id, updatedData) => API.put(`/tasks/update/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/tasks/delete/${id}`);