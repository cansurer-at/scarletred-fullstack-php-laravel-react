import axios from "axios";

/**
 * Task type definition used throughout the application.
 */
export type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Axios instance pre-configured with base URL and headers.
 */
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all tasks from the backend API.
 * @returns An array of Task objects.
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await API.get("/tasks");
  return response.data;
};

/**
 * Create a new task by sending a POST request.
 * @param title - Title of the new task.
 * @returns The newly created Task object.
 */
export const createTask = async (title: string): Promise<Task> => {
  const response = await API.post("/tasks", { title });
  return response.data;
};

/**
 * Delete a task by ID.
 * @param id - ID of the task to be deleted.
 */
export const deleteTask = async (id: number): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};

/**
 * Update the completion status of a task.
 * @param id - ID of the task to update.
 * @param completed - New completed status (true or false).
 * @returns The updated Task object.
 */
export const updateTaskStatus = async (
  id: number,
  completed: boolean
): Promise<Task> => {
  const response = await API.patch(`/tasks/${id}`, { completed });
  return response.data;
};
