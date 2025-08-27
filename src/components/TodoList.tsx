import React, { useMemo } from "react";
import { useTaskContext } from "../context/TodoContext";
import { TaskItem } from "../components/TodoItem";

export const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  if (tasks.length === 0)
    return (
      <div className="text-center text-warning fw-medium mt-3">
        Chưa có công việc nào
      </div>
    );

  return (
    <>
      <ul className="list-group my-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <div className="text-center fw-medium mt-2">
        {completedCount === 0 ? (
          <span className="text-danger">Chưa có công việc nào hoàn thành</span>
        ) : completedCount === tasks.length ? (
          <span className="text-success">
            Tất cả công việc đã hoàn thành
          </span>
        ) : (
          <span className="text-success">
            {completedCount} / {tasks.length} công việc đã hoàn thành
          </span>
        )}
      </div>
    </>
  );
};