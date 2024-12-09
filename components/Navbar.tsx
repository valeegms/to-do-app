"use client";

import NavTaskCategory from "./ui/NavTaskCategory";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useMemo, useState } from "react";
import AddNewCategory from "./AddNewCategory";
import { Category } from "@/models/Category";
import { Task } from "@/models/Task";
import { initializeCategory } from "@/utils/taskUtils";

export default function Navbar({
  tasks,
  categories,
  selectedCategory,
  setSelectedCategory,
  onCategoryAdd,
}: {
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  onCategoryAdd: (category: Category) => void;
}) {
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
    onCategoryAdd(category);
    setIsNewCategoryDialogVisible(false);
  };

  const handleSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="min-h-screen w-16rem p-3 bg-white">
      <section className="bg-gray-50 p-3 border-round-lg border-gray-200 border-1">
        <NavTaskCategory
          category={initializeCategory()}
          count={tasks.length}
          selected={selectedCategory?.id === 0}
          onSelectedCategoryChange={handleSelectedCategory}
        />
        <Divider />
        <div className="flex flex-column gap-2 mt-4">
          {categories.map((category) => {
            if (category.id != 0)
              return (
                <NavTaskCategory
                  key={category.id}
                  category={category}
                  count={taskCountsByCategory.get(category.id) || 0}
                  selected={selectedCategory?.id === category.id}
                  onSelectedCategoryChange={handleSelectedCategory}
                />
              );
          })}
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
      <AddNewCategory
        isVisible={isNewCategoryDialogVisible}
        onHide={() => setIsNewCategoryDialogVisible(false)}
        onCategoryAdd={handleCategoryAdd}
      />
    </nav>
  );
}
