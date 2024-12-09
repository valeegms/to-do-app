import { Task } from "@/models/Task";
import { formatDate, formatTime } from "@/utils/taskUtils";
import { Calendar } from "primereact/calendar";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useMemo } from "react";

export default function TaskForm({
  formData,
  setFormData,
}: {
  formData: Task;
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
}) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      <Calendar
        value={formData?.dueDate}
        name="dueDate"
        className="col-12 pt-4"
        onChange={(e) =>
          handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        showWeek
        showIcon
        minDate={new Date()}
      />
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
          onChange={(e) =>
            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
          }
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
          onChange={(e) =>
            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
          }
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
            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          placeholder="Description (optional)"
          className="w-full p-inputtext-sm max-h-24rem"
        />
      </div>
    </>
  );
}
