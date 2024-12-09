"use client";

import AddTask from "@/components/AddTask";
import TaskCard from "@/components/TaskCard";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { Task } from "../models/Task";
import EditTask from "@/components/EditTask";
import { initializeTask } from "@/utils/taskUtils";
import ConfirmDialog from "@/components/ConfirmDialog";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>(initializeTask());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const taskOverlayRef = useRef<OverlayPanel>(null);
  const editTaskOverlayRef = useRef<OverlayPanel>(null);

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

  const openEditTaskOverlay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => {
    setSelectedTask(task);
    editTaskOverlayRef.current?.toggle(e);
  };

  const openConfirmDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleTaskDelete = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex">
      <article className="p-4 flex-1">
        <section className="">
          {/* greetings depending on time of the day */}
          <h1 className="font-bold text-gray-800">
            Good {new Date().getHours() < 12 ? "morning" : "evening"}! 👋
          </h1>
          <p className="pt-1 pb-2 text-gray-500 text-sm font-semibold">
            You have {tasks.length} tasks to complete.
          </p>
        </section>
        <section className="flex flex-column gap-2 pt-2 max-h-30rem overflow-auto px-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditTaskOverlay}
              onDelete={() => openConfirmDialog(task)}
            />
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
        <EditTask
          ref={editTaskOverlayRef}
          onTaskEdit={handleTaskEdit}
          task={selectedTask}
        />
        <ConfirmDialog
          title={`Delete task "${selectedTask.title}"`}
          message="Are you sure you want to delete this task? This action cannot be undone."
          isVisible={isDeleteDialogOpen}
          onConfirm={() => handleTaskDelete(selectedTask)}
          onHide={() => setIsDeleteDialogOpen(false)}
        />
      </article>
    </div>
  );
}
