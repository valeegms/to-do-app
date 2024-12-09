import { Task } from "@/models/Task";
import TaskForm from "./TaskForm";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";

export default function EditTask({
  ref,
  task,
}: {
  ref: React.RefObject<OverlayPanel | null>;
  task: Task;
}) {
  const { editTask } = useTaskContext();
  const [formData, setFormData] = useState<Task>(task);

  useEffect(() => {
    setFormData(task);
  }, [task]);

  const handleSubmit = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData?.title.trim() === "") return;

    editTask(formData);

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
            label="Save changes"
            className="px-5 border-round-lg w-full"
          />
        </footer>
      </form>
    </OverlayPanel>
  );
}
