import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTasks, Task } from "../api/tasks";

const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const TaskItem = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 8px;
`;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id}>
            Task ID: {task.id}
            <br />
            Created At: {new Date(task.created_at).toLocaleString()}
          </TaskItem>
        ))
      )}
    </Container>
  );
};

export default TaskList;
