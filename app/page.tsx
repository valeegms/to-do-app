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
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setFilteredTasks(filterTasksByCategory(tasks, selectedCategory));
    // setToggleMenu(false);
  }, [tasks, selectedCategory]);

  return (
    <div className="md:flex">
      <Navbar
        tasks={tasks}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <div className={`md:block ${toggleMenu ? "block" : "hidden"} w-full`}>
        <TaskManager tasks={filteredTasks} />
      </div>
    </div>
  );
}
