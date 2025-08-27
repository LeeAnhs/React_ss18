import React, { useReducer, useEffect, useCallback } from "react";
import { Task } from "../types";
import { TaskContext } from "../context/TodoContext";
import { taskReducer, Action } from "../reducer/todoReducer";

const TASKS_KEY = "tasks";

const getInitialTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getInitialTasks);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((name: string) => {
    dispatch({ type: "ADD", name });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const toggleTask = useCallback((id: string) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const editTask = useCallback((id: string, name: string) => {
    dispatch({ type: "EDIT", id, name });
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};