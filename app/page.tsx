"use client";

import AddTask from "@/components/AddTask";
import TaskCard from "@/components/TaskCard";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { Task } from "../models/Task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskOverlayRef = useRef<OverlayPanel>(null);

  const handleTaskAdd = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <div>
      <section className="flex flex-column gap-2 pt-2 max-h-30rem overflow-auto px-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
      <Button
        type="button"
        label="Create new task"
        icon="pi pi-plus"
        className="block px-5 m-auto mt-2 border-round-lg"
        onClick={(e) => taskOverlayRef.current?.toggle(e)}
      />
      <AddTask ref={taskOverlayRef} onTaskAdd={handleTaskAdd} />
    </div>
  );
}
