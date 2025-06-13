// App.tsx
import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
`;

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskAdded = () => {
    setReloadTrigger((prev) => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <div
      className="App"
      style={{ padding: "24px", maxWidth: "600px", margin: "auto" }}
    >
      <h1>Task Manager</h1>

      <AddButton onClick={() => setIsModalOpen(true)}>➕ Add Task</AddButton>

      <TaskList key={reloadTrigger} />

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Add a New Task</h2>
            <AddTaskForm onTaskAdded={handleTaskAdded} />
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ marginTop: "16px" }}
            >
              Cancel
            </button>
          </ModalContent>
        </ModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
