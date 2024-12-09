import { Category } from "@/models/Category";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { Button } from "primereact/button";
import {
  ColorPicker,
  ColorPickerHSBType,
  ColorPickerRGBType,
} from "primereact/colorpicker";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function AddNewCategory({
  isVisible,
  onHide,
  onCategoryAdd,
}: {
  isVisible: boolean;
  onHide: () => void;
  onCategoryAdd: (category: Category) => void;
}) {
  const [title, setTitle] = useState("");
  const [pickedCategoryIcon, setPickedCategoryIcon] = useState<
    "emoji" | "color"
  >("color");
  const [chosenEmoji, setChosenEmoji] = useState("📝");
  const [color, setColor] = useState<
    string | ColorPickerRGBType | ColorPickerHSBType | undefined
  >("000");

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const emoji = emojiObject.emoji;
    setChosenEmoji(emoji);
  };

  const handlePickedCategoryIcon = (type: "emoji" | "color") => {
    if (type === "emoji") {
      setPickedCategoryIcon("emoji");
      setColor("000");
    } else {
      setPickedCategoryIcon("color");
      setChosenEmoji("📝");
    }
  };

  const handleSubmit = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (title.trim() === "") return;

    const newCategory = new Category(
      Math.floor(Math.random() * 1000),
      title,
      pickedCategoryIcon === "emoji" ? chosenEmoji : (color as string),
      pickedCategoryIcon
    );

    onCategoryAdd(newCategory);

    setTitle("");
    setChosenEmoji("📝");
    setColor("000");
    setPickedCategoryIcon("color");
  };

  const footer = (
    <section className="flex gap-2">
      <Button
        type="submit"
        label="Create"
        className="flex-1"
        onClick={(e) => handleSubmit(e)}
      />
      <Button
        text
        label="Cancel"
        className="flex-1"
        onClick={onHide}
        severity="danger"
      />
    </section>
  );

  const header = (
    <div className="flex align-items-center gap-2">
      <span className="">
        {pickedCategoryIcon == "emoji" ? (
          chosenEmoji
        ) : (
          <ColorPicker value={color} disabled />
        )}
      </span>
      <InputText
        type="text"
        name="category"
        placeholder="Category title"
        className="flex-1 p-inputtext-sm"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );

  return (
    <Dialog
      visible={isVisible}
      onHide={onHide}
      header={header}
      footer={footer}
      modal={false}
    >
      <form className="grid gap-2 p-2 border-1 border-gray-200 border-round-md">
        <section className="col-12 flex gap-2">
          <Button
            text
            type="button"
            icon="pi pi-palette"
            className={`${
              pickedCategoryIcon === "color" && "bg-indigo-100"
            } block px-5 m-auto mt-2 border-round-lg flex-1`}
            onClick={() => handlePickedCategoryIcon("color")}
          />
          <Button
            text
            type="button"
            icon="pi pi-face-smile"
            className={`${
              pickedCategoryIcon === "emoji" && "bg-indigo-100"
            } block px-5 m-auto mt-2 border-round-lg flex-1`}
            onClick={() => handlePickedCategoryIcon("emoji")}
          />
        </section>
        {pickedCategoryIcon === "emoji" && (
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            className="col-12 w-full"
            emojiStyle={EmojiStyle.NATIVE}
            lazyLoadEmojis
          />
        )}
        {pickedCategoryIcon === "color" && (
          <ColorPicker
            value={color}
            onChange={(e) => e.value && setColor(e.value)}
            inline
            className="col-12"
          />
        )}
      </form>
    </Dialog>
  );
}
