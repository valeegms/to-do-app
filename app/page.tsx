"use client";

import { useEffect, useState } from "react";
import { Task } from "../models/Task";
import Navbar from "@/components/Navbar";
import TaskManager from "@/components/TaskManager";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTaskContext } from "@/context/TaskContext";

export default function Home() {
  const { tasks } = useTaskContext();
  const { selectedCategory } = useCategoryContext();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    const filterTasks = () => {
      if (selectedCategory.id === 0) {
        return tasks;
      } else {
        return tasks.filter((task) =>
          task.categories?.includes(selectedCategory)
        );
      }
    };

    setFilteredTasks(filterTasks());
  }, [tasks, selectedCategory]);

  return (
    <div className="flex">
      <Navbar tasks={tasks} />
      <TaskManager tasks={filteredTasks} />
    </div>
  );
}
