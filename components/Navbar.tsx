"use client";

import NavTaskCategory from "./ui/NavTaskCategory";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { lazy, Suspense, useMemo, useState } from "react";
import { Category } from "@/models/Category";
import { Task } from "@/models/Task";
import { defaultCategory } from "@/utils/taskUtils";
import { useCategoryContext } from "@/context/CategoryContext";

const AddNewCategory = lazy(() => import("./AddNewCategory"));

export default function Navbar({ tasks }: { tasks: Task[] }) {
  const [isEditable, setEditCategory] = useState<boolean>(false);
  const { categories, selectedCategory, addCategory } = useCategoryContext();

  const taskCountsByCategory = useMemo(() => {
    const counts = new Map<number, number>();
    tasks.forEach((task) => {
      task.categories?.forEach((category) => {
        counts.set(category.id, (counts.get(category.id) || 0) + 1);
      });
    });
    return counts;
  }, [tasks]);

  const [isNewCategoryDialogVisible, setIsNewCategoryDialogVisible] =
    useState(false);

  const handleCategoryAdd = (category: Category) => {
    addCategory(category);
    setIsNewCategoryDialogVisible(false);
  };

  return (
    <nav className="min-h-screen w-16rem p-3 bg-white">
      <section className="bg-gray-50 p-3 border-round-lg border-gray-200 border-1">
        <NavTaskCategory
          category={defaultCategory()}
          count={tasks.length}
          selected={selectedCategory?.id === 0}
        />
        <Divider />

        <div className="w-full text-right">
          <Button
            text
            size="small"
            label={isEditable ? "Done" : "Edit"}
            className="py-1"
            onClick={() => setEditCategory(!isEditable)}
          />
        </div>
        <div className="flex flex-column gap-2 mt-4 max-h-18rem overflow-auto">
          {categories.length > 0 ? (
            categories
              .filter((category) => category.id !== 0)
              .map((category) => (
                <NavTaskCategory
                  key={category.id}
                  category={category}
                  count={taskCountsByCategory.get(category.id) || 0}
                  selected={selectedCategory?.id === category.id}
                  isEditable={isEditable}
                />
              ))
          ) : (
            <p className="text-gray-500 text-center text-sm p-0 font-light">
              Start by adding a category
            </p>
          )}
        </div>
      </section>
      <section>
        <Button
          outlined
          label="New category"
          icon="pi pi-plus"
          size="small"
          className="w-full mt-4 border-round-md"
          onClick={() => setIsNewCategoryDialogVisible(true)}
        />
      </section>
      <Suspense fallback={null}>
        <AddNewCategory
          isVisible={isNewCategoryDialogVisible}
          onHide={() => setIsNewCategoryDialogVisible(false)}
          onCategoryAdd={handleCategoryAdd}
        />
      </Suspense>
    </nav>
  );
}
