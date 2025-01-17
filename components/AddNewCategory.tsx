import { Category } from "@/models/Category";
import { initializeCategory } from "@/utils/taskUtils";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

export default function AddNewCategory({
  isVisible,
  onHide,
  onCategoryAdd,
}: {
  isVisible: boolean;
  onHide: () => void;
  onCategoryAdd: (category: Category) => void;
}) {
  const [formData, setFormData] = useState<Category>(initializeCategory());

  const handleSubmit = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (formData.title.trim() === "") return;

    const newCategory = { ...formData, id: Math.floor(Math.random() * 1000) };

    onCategoryAdd(newCategory);

    setFormData(initializeCategory());
  };

  const footer = (
    <footer className="flex gap-2">
      <Button
        type="submit"
        label="Create"
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
