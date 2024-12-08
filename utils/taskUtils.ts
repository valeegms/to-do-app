import { Task } from "@/models/Task";
import { DateTime } from "luxon";

export const initializeFormData = (): Task => {
    const now = new Date();
    const id = Math.floor(Math.random() * 1000);
    const roundedStartTime = new Date(now);
    roundedStartTime.setMinutes(0, 0, 0);

    const endTime = new Date(roundedStartTime);
    endTime.setHours(endTime.getHours() + 1);

    return new Task(id, "", "", "", new Date(), roundedStartTime, endTime);
};

export const formatTime = (date: Date): string => {
    return DateTime.fromISO(date.toISOString()).toFormat("t");
}