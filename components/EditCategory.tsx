import { useCategoryContext } from "@/context/CategoryContext";
import { Category } from "@/models/Category";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CategoryForm from "./CategoryForm";
import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/models/Task";

export default function EditCategory({
  category,
  isVisible,
  onHide,
}: {
  category: Category;
  isVisible: boolean;
  onHide: () => void;
}) {
  const [formData, setFormData] = useState<Category>(category);
  const { editCategory } = useCategoryContext();
  const { tasks, editTask } = useTaskContext();

  const handleSubmit = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (formData.title.trim() === "") return;

    editCategory(formData);

    if (
      tasks.some((task) =>
        task.categories?.some((cat) => cat.id === formData.id)
      )
    ) {
      editTask({
        ...(tasks.find((task) =>
          task.categories?.some((cat) => cat.id === formData.id)
        ) as Task),
        categories: [formData],
      });
    }

    onHide();
  };

  const footer = (
    <footer className="flex gap-2">
      <Button
        type="submit"
        label="Save"
        className="flex-1"
        onClick={handleSubmit}
      />
      <Button
        text
        label="Cancel"
        className="flex-1"
        onClick={onHide}
        severity="danger"
      />
    </footer>
  );

  return (
    <Dialog
      className="category"
      visible={isVisible}
      onHide={onHide}
      modal={false}
      footer={footer}
    >
      <form className="flex flex-column gap-2 p-2 border-1 border-gray-200 border-round-md max-h-30rem overflow-hidden">
        <CategoryForm formData={formData} setFormData={setFormData} />
      </form>
    </Dialog>
  );
}
