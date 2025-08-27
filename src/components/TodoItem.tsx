import React, { useState, useRef, useEffect, useCallback } from "react";
import { Task } from "../types";
import { useTaskContext } from "../context/TodoContext";
import { TaskInput } from "../components/TodoInput";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const { deleteTask, toggleTask } = useTaskContext();
  const [editing, setEditing] = useState(false);

  const handleEditFinish = useCallback(() => {
    setEditing(false);
  }, []);

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      style={{ minHeight: 46 }}
    >
      <div className="form-check d-flex align-items-center">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          id={`checkbox-${task.id}`}
        />
        {editing ? (
          <TaskInput
            editingId={task.id}
            initialValue={task.name}
            onEditFinish={handleEditFinish}
          />
        ) : task.completed ? (
          <s className="task-name">{task.name}</s>
        ) : (
          <span className="task-name">{task.name}</span>
        )}
      </div>
      {!editing && (
        <div>
          <i
            className="fas fa-edit text-primary me-3"
            role="button"
            onClick={() => setEditing(true)}
            title="Chỉnh sửa"
          ></i>
          <i
            className="fas fa-trash text-danger"
            role="button"
            onClick={() => deleteTask(task.id)}
            title="Xóa"
          ></i>
        </div>
      )}
    </li>
  );
});