"use client";

import { useEffect, useState } from "react";
import { Task } from "../models/Task";
import Navbar from "@/components/Navbar";
import TaskManager from "@/components/TaskManager";
import { Category } from "@/models/Category";
import { initializeCategory } from "@/utils/taskUtils";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    initializeCategory(),
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    initializeCategory()
  );
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleTaskAdd = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskEdit = (task: Task) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((t) => t.id === task.id);
      prevTasks[index] = task;

      return [...prevTasks];
    });
  };

  const handleTaskDelete = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  const handleCategoryAdd = (category: Category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

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

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex">
      <Navbar
        tasks={tasks}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
        onCategoryAdd={handleCategoryAdd}
      />
      <TaskManager
        tasks={filteredTasks}
        setTasks={setTasks}
        categories={categories}
        onTaskAdd={handleTaskAdd}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
