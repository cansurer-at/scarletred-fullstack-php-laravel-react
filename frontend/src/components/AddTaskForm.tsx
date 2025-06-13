import React, { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api/tasks";

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
`;

type Props = {
  onTaskAdded: () => void;
};

const AddTaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask(title);
      setTitle("");
      onTaskAdded();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddTaskForm;
