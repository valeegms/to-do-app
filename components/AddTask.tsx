import { Task } from "@/models/Task";
import { initializeTask } from "@/utils/taskUtils";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { Category } from "@/models/Category";

export default function AddTask({
  ref,
  categories,
  onTaskAdd,
}: {
  ref: React.RefObject<OverlayPanel | null>;
  categories: Category[];
  onTaskAdd: (task: Task) => void;
}) {
  const [formData, setFormData] = useState<Task>(initializeTask());

  const handleSubmit = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData?.title.trim() === "") return;

    onTaskAdd(formData as Task);

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
        <TaskForm
          categories={categories}
          formData={formData}
          setFormData={setFormData}
        />
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
