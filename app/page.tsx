"use client";

import { useEffect, useState } from "react";
import { Task } from "../models/Task";
import Navbar from "@/components/Navbar";
import TaskManager from "@/components/TaskManager";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTaskContext } from "@/context/TaskContext";
import { filterTasksByCategory } from "@/utils/taskUtils";

export default function Home() {
  const { tasks } = useTaskContext();
  const { selectedCategory } = useCategoryContext();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setFilteredTasks(filterTasksByCategory(tasks, selectedCategory));
  }, [tasks, selectedCategory]);

  return (
    <div className="md:flex">
      <Navbar tasks={tasks} />
      <TaskManager tasks={filteredTasks} />
    </div>
  );
}
