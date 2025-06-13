import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

import {
  Task,
  fetchTasks,
  deleteTask,
  updateTaskStatus,
} from "../../api/tasks";
import { toast } from "react-toastify";
import EditTaskModal from "../EditTaskModal";

import {
  TaskItem,
  StyledUl,
  Checkbox,
  ButtonGroup,
  DeleteButton,
  EditButton,
} from "./styles";

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
      <StyledUl>
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
              <EditButton
                onClick={() => setSelectedTask(task)}
                aria-label="Edit task"
              >
                <Edit size={18} />
              </EditButton>
              <DeleteButton
                onClick={() => handleDelete(task.id)}
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </DeleteButton>
            </ButtonGroup>
          </TaskItem>
        ))}
      </StyledUl>

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
