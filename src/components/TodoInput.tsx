import React, { useState, useRef, useEffect } from "react";
import { useTaskContext } from "../context/TodoContext";

interface TaskInputProps {
  editingId?: string;
  initialValue?: string;
  onEditFinish?: () => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  editingId,
  initialValue = "",
  onEditFinish,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTask, editTask } = useTaskContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingId]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("Vui lòng nhập tên công việc!");
      return;
    }
    if (editingId) {
      editTask(editingId, value.trim());
      onEditFinish?.();
    } else {
      addTask(value.trim());
      setValue("");
    }
    setError("");
  };

  return (
    <form className="d-flex mb-1" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="form-control me-2"
        placeholder="Nhập công việc..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        {editingId ? "Cập nhật" : "Thêm"}
      </button>
      <div className="w-100"></div>
      {error && (
        <p className="text-danger error-text mb-0 mt-1 fs-6">{error}</p>
      )}
    </form>
  );
};