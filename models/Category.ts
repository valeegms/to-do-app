export class Category {
    id: number;
    title: string;
    icon: string;
    iconType: "emoji" | "color";

  constructor(
    id: number,
    title: string,
    icon: string,
    iconType: "emoji" | "color"
  ) {
    this.id = id;
    this.title = title;
    this.icon = icon;
    this.iconType = iconType;
  }
}