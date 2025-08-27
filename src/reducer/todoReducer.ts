import { Task } from "../types";

export type Action =
  | { type: "ADD"; name: string }
  | { type: "DELETE"; id: string }
  | { type: "TOGGLE"; id: string }
  | { type: "EDIT"; id: string; name: string }
  | { type: "SET"; tasks: Task[] };

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now().toString(),
          name: action.name,
          completed: false,
        },
      ];
    case "DELETE":
      return state.filter((task) => task.id !== action.id);
    case "TOGGLE":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case "EDIT":
      return state.map((task) =>
        task.id === action.id ? { ...task, name: action.name } : task
      );
    case "SET":
      return action.tasks;
    default:
      return state;
  }
}