import { Category } from "@/models/Category";
import { Task } from "@/models/Task";
import { formatDate, formatTime } from "@/utils/taskUtils";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Nullable } from "primereact/ts-helpers";
import { useMemo, useState } from "react";

export default function TaskForm({
  categories,
  formData,
  setFormData,
}: {
  categories: Category[];
  formData: Task;
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
}) {
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(categories);
  const formattedStartTime = useMemo(
    () => formatTime(formData?.startTime),
    [formData?.startTime]
  );
  const formattedEndTime = useMemo(
    () => formatTime(formData?.endTime),
    [formData?.endTime]
  );
  const formattedDueDate = useMemo(
    () => formatDate(formData?.dueDate),
    [formData?.dueDate]
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { name: string; value: string | Nullable<Date> | Category[] }
  ) => {
    const { name, value } = "target" in e ? e.target : e;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const search = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    if (categories) {
      setFilteredCategories(
        categories.filter((category) =>
          category.title.toLowerCase().includes(query)
        )
      );
    }
  };

  const categoryOptionTemplate = (option: Category) => {
    return (
      <>
        {option && (
          <div className="flex align-items-center gap-2">
            {option.iconType === "emoji" ? (
              <span className="text-xl">{option.icon}</span>
            ) : (
              <div
                className="border-round-md"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  border: `2px solid #${option.icon}`,
                }}
              ></div>
            )}
            <div className="text-sm">{option.title}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <span className="relative col-12">
        <label
          htmlFor="title"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          Title
        </label>
        <InputText
          size="small"
          name="title"
          placeholder="Create a new task"
          className="w-full p-inputtext-sm"
          style={
            formData?.startTime && formData?.endTime
              ? { paddingRight: "16.3rem" }
              : { paddingRight: "7rem" }
          }
          value={formData?.title}
          onChange={handleChange}
        />
        <div
          className="absolute flex gap-1 transition-all"
          style={{ right: "0.8rem", top: 0, transform: "translateY(64%)" }}
        >
          <Chip
            label={formattedDueDate}
            className="mt-2 text-xs px-3 py-0 border-round-md select-none"
          />
          {formData?.startTime && formData?.endTime && (
            <Chip
              label={`${formattedStartTime} - ${formattedEndTime}`}
              className={`mt-2 text-xs px-3 py-0 border-round-md select-none`}
            />
          )}
        </div>
      </span>
      <span className="col-12 flex flex-column">
        <label
          htmlFor="category"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          Category
        </label>

        <AutoComplete
          multiple
          dropdown
          value={formData?.categories}
          name="category"
          placeholder="Category"
          className="category"
          suggestions={filteredCategories}
          onChange={(e) => handleChange({ name: "categories", value: e.value })}
          completeMethod={search}
          style={{ fontSize: "0.75rem !important", fontSizeAdjust: "0.5" }}
          field="title"
          itemTemplate={categoryOptionTemplate}
        />
      </span>
      <span className="col-12 flex flex-column">
        <label
          htmlFor="dueDate"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          Due date
        </label>
        <Calendar
          value={formData?.dueDate}
          name="dueDate"
          onChange={(e) => handleChange({ name: "dueDate", value: e.value })}
          showWeek
          showIcon
          minDate={new Date()}
        />
      </span>
      <span className="col-6">
        <label
          htmlFor="startTime"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          Start time
        </label>
        <Calendar
          name="startTime"
          value={formData?.startTime}
          onChange={(e) => handleChange({ name: "startTime", value: e.value })}
          timeOnly
          stepMinute={5}
          className="w-full"
          placeholder="Start Time"
        />
      </span>
      <span className="col-6">
        <label
          htmlFor="endTime"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          End time
        </label>
        <Calendar
          name="endTime"
          value={formData?.endTime}
          onChange={(e) => handleChange({ name: "endTime", value: e.value })}
          timeOnly
          stepMinute={5}
          className="w-full"
          placeholder="End Time"
        />
      </span>
      <div className="col-12">
        <label
          htmlFor="description"
          className="sr-only text-xs font-semibold text-gray-500"
        >
          Task description
        </label>
        <InputTextarea
          name="description"
          value={formData?.description}
          onChange={(e) =>
            handleChange({ name: "description", value: e.target.value })
          }
          placeholder="Description (optional)"
          className="w-full p-inputtext-sm max-h-24rem"
        />
      </div>
    </>
  );
}
