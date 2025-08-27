import React from "react";
import { TaskProvider } from "../src/context/TaskProvider";
import { TaskInput } from "../src/components/TodoInput";
import { TaskList } from "../src/components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <TaskProvider>
      <div className="container todo-container" style={{
        maxWidth: 600,
        margin: "50px auto",
        background: "#fff",
        borderRadius: 15,
        padding: 20,
        border: "1px solid #dadada"
      }}>
        <h3 className="text-center mb-3 fw-bold">Danh sách công việc</h3>
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;