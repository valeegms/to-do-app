import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Task } from "@/models/Task";
import { formatTime } from "@/utils/taskUtils";
import { useState } from "react";
import TaskCategoriesTags from "./ui/TaskCategoriesTags";

export default function TaskCard({
  task,
  setTasks,
  onEdit,
  onDelete,
}: {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEdit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => void;
  onDelete: () => void;
}) {
  const [done, setDone] = useState<boolean>(false);

  const handleDone = () => {
    setDone(!done);

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, status: !done ? "Completed" : "Pending" } : t
      )
    );
  };

  return (
    <article className="bg-white p-card border-round-lg p-3 flex justify-content-between">
      <section className="flex align-items-center gap-3 select-none">
        <Checkbox checked={done} onChange={handleDone} disabled={done} />
        <div>
          <div className="flex gap-2 align-items-center">
            <h4
              className={` ${
                task.status.toLowerCase() == "completed"
                  ? "line-through text-gray-600"
                  : "text-gray-800"
              }`}
            >
              {task.title}{" "}
            </h4>
            {task.categories && (
              <TaskCategoriesTags categories={task.categories} />
            )}
          </div>
          <span className="text-xs text-gray-500">
            {`${formatTime(task.startTime)} - ${formatTime(task.endTime)}`}
          </span>
        </div>
      </section>
      <section className="flex gap-2 align-items-center">
        <Button
          text
          type="button"
          icon="pi pi-pencil"
          className="transition-all"
          size="small"
          aria-label="Edit"
          severity="warning"
          onClick={(e) => onEdit(e, task)}
        />
        <Button
          text
          type="button"
          icon="pi pi-trash"
          className="transition-all"
          size="small"
          aria-label="Delete"
          severity="danger"
          onClick={onDelete}
        />
        {done && (
          <Button
            text
            type="button"
            icon="pi pi-undo"
            className="transition-all"
            size="small"
            aria-label="Undo"
            severity="info"
            onClick={handleDone}
          />
        )}
      </section>
    </article>
  );
}
