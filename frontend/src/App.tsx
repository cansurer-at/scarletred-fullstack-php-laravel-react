import React from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTaskForm onTaskAdded={() => window.location.reload()} />
      <TaskList />
    </div>
  );
}

export default App;
