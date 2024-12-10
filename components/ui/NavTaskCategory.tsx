import { useCategoryContext } from "@/context/CategoryContext";
import { Category } from "@/models/Category";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { lazy, Suspense, useState } from "react";

const EditCategory = lazy(() => import("../EditCategory"));

export default function NavTaskCategory({
  category,
  count,
  selected,
  isEditable = false,
  onSelect,
}: {
  category: Category;
  count: number;
  selected: boolean;
  isEditable?: boolean;
  onSelect: (category: Category) => void;
}) {
  const { selectCategory, deleteCategory } = useCategoryContext();
  const [editIsVisible, setEditIsVisible] = useState(false);

  const handleSelectedCategory = (category: Category) => {
    selectCategory(category);
    onSelect(category);
  };

  return (
    <div className="md:w-full flex">
      <Button
        onClick={() => handleSelectedCategory(category)}
        text
        className={`text-gray-900 flex-1 focus:shadow-none flex align-items-center justify-content-between hover:bg-gray-200 p-2 border-round-md transition-all select-none ${
          selected && "bg-gray-200"
        }`}
      >
        <div className="flex align-items-center gap-2">
          {category.iconType === "emoji" ? (
            <span className="text-xl">{category.icon}</span>
          ) : (
            <div
              className="border-round-md"
              style={{
                width: "1.2rem",
                height: "1.2rem",
                border: `2px solid #${category.icon}`,
              }}
            ></div>
          )}
          <p className="font-semibold flex-1 text-sm">{category.title}</p>
        </div>
        <Badge
          value={count}
          className="hidden md:bg-bluegray-300 md:text-white"
        />
      </Button>
      {category.id != 0 && isEditable && (
        <section>
          <Button
            text
            type="button"
            icon="pi pi-pencil"
            className="transition-all"
            size="small"
            aria-label="Edit"
            severity="warning"
            onClick={() => setEditIsVisible(true)}
          />
          <Button
            text
            type="button"
            icon="pi pi-trash"
            className="transition-all"
            size="small"
            aria-label="Delete"
            severity="danger"
            onClick={() => deleteCategory(category)}
          />
        </section>
      )}
      <Suspense fallback={null}>
        <EditCategory
          category={category}
          isVisible={editIsVisible}
          onHide={() => setEditIsVisible(false)}
        />
      </Suspense>
    </div>
  );
}
