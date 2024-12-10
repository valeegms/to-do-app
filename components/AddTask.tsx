import { Task } from "@/models/Task";
import { initializeTask } from "@/utils/taskUtils";
import { Button } from "primereact/button";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useTaskContext } from "@/context/TaskContext";
import { Dialog } from "primereact/dialog";

export default function AddTask({
  isVisible,
  onHide,
}: {
  isVisible: boolean;
  onHide: () => void;
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

    onHide();
  };

  return (
    <Dialog onHide={onHide} visible={isVisible} className="w-5">
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
    </Dialog>
  );
}
