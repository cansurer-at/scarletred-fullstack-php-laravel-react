export type Task = {
  id: number;
  created_at: string;
  updated_at: string;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:8000/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};
