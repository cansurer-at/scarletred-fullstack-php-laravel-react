import { useEffect, useState } from "react";
import styled from "styled-components";
import { Task, fetchTasks, deleteTask, updateTaskStatus } from "../api/tasks";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal"; // Modal bileşeni

const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  transition: all 0.3s ease;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  transform: scale(1.3);
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background-color: #ff5c5c;
`;

const EditButton = styled(Button)`
  background-color: #4caf50;
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
      // Sort by newest first
      const sorted = data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setTasks(sorted);
    } catch (err) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      loadTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleCompleted = async (
    id: number,
    completed: boolean,
    title: string
  ) => {
    try {
      await updateTaskStatus(id, !completed, title);
      loadTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleEditSave = () => {
    setSelectedTask(null);
    loadTasks();
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
          <TaskItem key={task.id} completed={task.completed}>
            <div>
              <Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggleCompleted(task.id, task.completed, task.title)
                }
              />
              {task.title}
            </div>
            <ButtonGroup>
              <EditButton onClick={() => setSelectedTask(task)}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => handleDelete(task.id)}>
                Delete
              </DeleteButton>
            </ButtonGroup>
          </TaskItem>
        ))}
      </ul>
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default TaskList;
