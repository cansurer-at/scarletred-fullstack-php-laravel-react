import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleTaskAdded = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={reloadTrigger} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
