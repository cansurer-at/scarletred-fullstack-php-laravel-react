import { useEffect, useState } from "react";
import { Task, fetchTasks, deleteTask } from "../api/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all tasks from the server and update the state.
   */
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle delete button click.
   * @param id - The ID of the task to delete.
   */
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      await loadTasks(); // Refresh the task list
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span>{task.title}</span>
          <button onClick={() => handleDelete(task.id)}>🗑️ Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
