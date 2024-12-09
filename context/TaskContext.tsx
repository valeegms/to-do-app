"use client";

import { Task } from "@/models/Task";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  editTaskStatus: (task: Task, status: string) => void;
  deleteTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);

  const editTask = (task: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
  };

  const editTaskStatus = (task: Task, newStatus: string) => {
    task.status = newStatus;
    editTask(task);
    console.log("Task status updated ", task);
  };

  const deleteTask = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  const value = useMemo(
    () => ({ tasks, addTask, editTask, editTaskStatus, deleteTask }),
    [tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
