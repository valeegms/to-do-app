import { Task } from "@/models/Task";
import { initializeTask } from "@/utils/taskUtils";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useTaskContext } from "@/context/TaskContext";

export default function AddTask({
  ref,
}: {
  ref: React.RefObject<OverlayPanel | null>;
}) {
  const { addTask } = useTaskContext();
  const [formData, setFormData] = useState<Task>(initializeTask());

  const handleSubmit = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData?.title.trim() === "") return;

    addTask(formData as Task);

    setFormData(initializeTask());

    ref.current?.hide();
  };

  return (
    <OverlayPanel
      ref={ref}
      data-pr-position="mouse"
      className="w-5"
      showCloseIcon
    >
      <form className="grid" onSubmit={handleSubmit}>
        <TaskForm formData={formData} setFormData={setFormData} />
        <footer className="col-12">
          <Button
            type="submit"
            label="Create"
            className="px-5 border-round-lg w-full"
          />
        </footer>
      </form>
    </OverlayPanel>
  );
}
