import axios from "axios";

export type Task = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  completed: boolean;
};

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches all tasks from the backend.
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await API.get("/tasks");
  return response.data;
};

/**
 * Sends a POST request to create a new task.
 * @param title - The title of the task to be created.
 * @returns The created task.
 */
export const createTask = async (title: string): Promise<Task> => {
  const response = await API.post("/tasks", { title });
  return response.data;
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 */
export const deleteTask = async (id: number): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};

/**
 * Updates a task as completed or not.
 * @param id - The ID of the task.
 * @param completed - The new completed state.
 */
export const updateTaskStatus = async (
  id: number,
  completed: boolean
): Promise<Task> => {
  const response = await API.patch(`/tasks/${id}`, { completed });
  return response.data;
};
