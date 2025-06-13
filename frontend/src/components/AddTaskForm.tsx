import React, { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api/tasks";
import { toast } from "react-toastify";

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
      toast.success("Task added successfully!", { autoClose: 3000 });
      onTaskAdded();
    } catch (error) {
      toast.error("Failed to add task. Please try again.", { autoClose: 3000 });
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
