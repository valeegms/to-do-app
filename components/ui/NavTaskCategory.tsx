import { Category } from "@/models/Category";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

export default function NavTaskCategory({
  category,
  count,
  selected,
  onSelectedCategoryChange,
}: {
  category: Category;
  count: number;
  selected: boolean;
  onSelectedCategoryChange: (category: Category) => void;
}) {
  const handleSelectedCategory = (category: Category) => {
    onSelectedCategoryChange(category);
  };
  return (
    <Button
      onClick={() => handleSelectedCategory(category)}
      text
      className={`text-gray-900 w-full focus:shadow-none flex align-items-center justify-content-between hover:bg-gray-200 p-2 border-round-md transition-all select-none ${
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
      <Badge value={count} className="bg-bluegray-300 text-white" />
    </Button>
  );
}
