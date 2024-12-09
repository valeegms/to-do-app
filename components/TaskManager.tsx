import { Button } from "primereact/button";
import TaskCard from "./TaskCard";
import { Task } from "@/models/Task";
import { useMemo, useRef, useState, lazy, Suspense } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { initializeTask } from "@/utils/taskUtils";
import { useTaskContext } from "@/context/TaskContext";

const AddTask = lazy(() => import("./AddTask"));
const EditTask = lazy(() => import("./EditTask"));
const ConfirmDialog = lazy(() => import("./ConfirmDialog"));

export default function TaskManager({ tasks }: { tasks: Task[] }) {
  const taskOverlayRef = useRef<OverlayPanel>(null);
  const [selectedTask, setSelectedTask] = useState<Task>(initializeTask());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const editTaskOverlayRef = useRef<OverlayPanel>(null);
  const { deleteTask } = useTaskContext();

  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => task.status.toLowerCase() === "pending")
      .length;
  }, [tasks]);

  const openConfirmDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleOnConfirm = () => {
    deleteTask(selectedTask);
    setIsDeleteDialogOpen(false);
  };

  const openEditTaskOverlay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => {
    setSelectedTask(task);
    editTaskOverlayRef.current?.toggle(e);
  };

  return (
    <article className="p-4 flex-1">
      <section className="">
        <h1 className="font-bold text-gray-800">
          Good {new Date().getHours() < 12 ? "morning" : "evening"}! &#128075;
        </h1>
        <p className="pt-1 pb-2 text-gray-500 text-sm font-semibold">
          You have {pendingTasks} tasks to complete.
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
      <Suspense fallback={null}>
        <AddTask ref={taskOverlayRef} />
      </Suspense>
      <Suspense fallback={null}>
        <EditTask ref={editTaskOverlayRef} task={selectedTask} />
      </Suspense>
      <Suspense fallback={null}>
        <ConfirmDialog
          title={`Delete task "${selectedTask.title}"`}
          message="Are you sure you want to delete this task? This action cannot be undone."
          isVisible={isDeleteDialogOpen}
          onConfirm={handleOnConfirm}
          onHide={() => setIsDeleteDialogOpen(false)}
        />
      </Suspense>
    </article>
  );
}
