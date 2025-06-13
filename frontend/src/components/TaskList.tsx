import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTasks, Task } from "../api/tasks";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>{task.title}</ListItem>
      ))}
    </List>
  );
};

export default TaskList;
