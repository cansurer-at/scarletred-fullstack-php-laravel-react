import { useEffect, useState } from "react";
import { Task, fetchTasks, deleteTask } from "../api/tasks";
import styled from "styled-components";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal";

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b02a37;
  }
`;

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!");
      await loadTasks(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete task.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} onClick={() => setSelectedTask(task)}>
            <span>{task.title}</span>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal open
                handleDelete(task.id);
              }}
            >
              Delete
            </DeleteButton>
          </TaskItem>
        ))}
      </ul>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={loadTasks}
        />
      )}
    </>
  );
};

export default TaskList;
