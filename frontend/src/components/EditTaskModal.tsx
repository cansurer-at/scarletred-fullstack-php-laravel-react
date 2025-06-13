import React, { useState } from "react";
import styled from "styled-components";
import { Task, updateTaskStatus } from "../api/tasks";
import { toast } from "react-toastify";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  margin: 100px auto;
  position: relative;
  z-index: 20;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

type Props = {
  task: Task;
  onClose: () => void;
  onSave: () => void;
};

const EditTaskModal: React.FC<Props> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  const handleSave = async () => {
    try {
      // Send both fields for update
      await updateTaskStatus(task.id, completed, title);
      toast.success("Task updated successfully!");
      onSave();
      onClose();
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </Label>
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditTaskModal;
