import { Category } from "@/models/Category";

export default function TaskCategoriesTags({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category: Category) => (
        <div key={category.id}>
          <span
            className={`py-1 text-xs font-semibold border-round-md px-2 ${
              category.iconType == "emoji" && "text-gray-600 bg-gray-200"
            }`}
            style={
              category.iconType == "color"
                ? {
                    color: `#${category.icon}`,
                    backgroundColor: `#${category.icon}1A`,
                  }
                : {}
            }
          >
            {category.iconType == "emoji" && category.icon}
            {category.title}
          </span>
        </div>
      ))}
    </div>
  );
}
