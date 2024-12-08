import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Task } from "@/models/Task";
import { formatTime } from "@/utils/taskUtils";
import { useState } from "react";

export default function TaskCard({ task }: { task: Task }) {
  const [done, setDone] = useState<boolean>(false);

  const handleDone = () => {
    task.status = done ? "pending" : "done";
    setDone(!done);
  };

  return (
    <article className="bg-white p-card border-round-lg p-3 flex justify-content-between">
      <section className="flex align-items-center gap-3 select-none">
        <Checkbox checked={done} onChange={handleDone} disabled={done} />
        <div>
          <h4
            className={`m-0 ${
              done ? "line-through text-gray-600" : "text-gray-800"
            }`}
          >
            {task.title}
          </h4>
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
        />
        <Button
          text
          type="button"
          icon="pi pi-trash"
          className="transition-all"
          size="small"
          aria-label="Delete"
          severity="danger"
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
