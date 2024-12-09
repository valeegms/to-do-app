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

export const formatTime = (date: Date): string => {
    return DateTime.fromISO(date?.toISOString()).toFormat("t");
}

export const formatDate = (date: Date): string => {
    return DateTime.fromISO(date?.toISOString()).toFormat("dd LLL yyyy");
}