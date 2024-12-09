import { Button } from "primereact/button";
import ConfirmDialog from "./ConfirmDialog";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
import { Category } from "@/models/Category";
import { Task } from "@/models/Task";
import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { initializeTask } from "@/utils/taskUtils";

export default function TaskManager({
  tasks,
  setTasks,
  categories,
  onTaskAdd,
  onTaskEdit,
  onTaskDelete,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  categories: Category[];
  onTaskAdd: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (task: Task) => void;
}) {
  const taskOverlayRef = useRef<OverlayPanel>(null);
  const [selectedTask, setSelectedTask] = useState<Task>(initializeTask());
  const [pendingTasks, setPendingTasks] = useState<number>(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const editTaskOverlayRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    console.log("Tasks updated -> TaskManager:", tasks);
    setPendingTasks(
      tasks.filter((task) => task.status.toLowerCase() == "pending").length
    );
  }, [tasks]);

  const openConfirmDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleOnConfirm = () => {
    onTaskDelete(selectedTask);
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
        {/* greetings depending on time of the day */}
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
            setTasks={setTasks}
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
      <AddTask
        ref={taskOverlayRef}
        categories={categories}
        onTaskAdd={onTaskAdd}
      />
      <EditTask
        ref={editTaskOverlayRef}
        categories={categories}
        onTaskEdit={onTaskEdit}
        task={selectedTask}
      />
      <ConfirmDialog
        title={`Delete task "${selectedTask.title}"`}
        message="Are you sure you want to delete this task? This action cannot be undone."
        isVisible={isDeleteDialogOpen}
        onConfirm={handleOnConfirm}
        onHide={() => setIsDeleteDialogOpen(false)}
      />
    </article>
  );
}
