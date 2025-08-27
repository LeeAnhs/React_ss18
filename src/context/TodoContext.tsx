import React, { createContext, useContext } from "react";
import { Task } from "../types";

export interface TaskContextProps {
  tasks: Task[];
  addTask: (name: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, name: string) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
}