import { Category } from "./Category";

export class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    categories?: Category[];
    dueDate: Date;
    startTime: Date;
    endTime: Date;

    constructor(
        id: number,
        title: string,
        description: string,
        status: string,
        dueDate: Date,
        startTime: Date,
        endTime: Date,
        categories?: Category[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.categories = categories;
    }
}