import { Category } from "@/models/Category";
import { Task } from "@/models/Task";
import { DateTime } from "luxon";

export const initializeTask = (): Task => {
    const now = new Date();
    const id = Math.floor(Math.random() * 1000);
    const roundedStartTime = new Date(now);
    roundedStartTime.setMinutes(0, 0, 0);

    const endTime = new Date(roundedStartTime);
    endTime.setHours(endTime.getHours() + 1);

    return new Task(id, "", "", "Pending", new Date(), roundedStartTime, endTime);
};

export const filterTasksByCategory = (tasks: Task[], category: Category): Task[] => {
    if (category.id === 0) {
        return tasks;
    } else {
        return tasks.filter((task) => task.categories?.includes(category));
    }
}

export const defaultCategory = (): Category => {
    return new Category(0, "All", "📝", "emoji");
} 

export const initializeCategory = (): Category => {
    return new Category(0, "", "000", "color");
}

export const formatTime = (date: Date): string => {
    return DateTime.fromISO(date?.toISOString()).toFormat("t");
}

export const formatDate = (date: Date): string => {
    return DateTime.fromISO(date?.toISOString()).toFormat("dd LLL yyyy");
}