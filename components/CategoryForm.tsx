import { Category } from "@/models/Category";
import EmojiPicker, { EmojiStyle, SuggestionMode } from "emoji-picker-react";
import { Button } from "primereact/button";
import {
  ColorPicker,
  ColorPickerHSBType,
  ColorPickerRGBType,
} from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { ChangeEvent } from "react";

export default function CategoryForm({
  formData,
  setFormData,
}: {
  formData: Category;
  setFormData: React.Dispatch<React.SetStateAction<Category>>;
}) {
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const emoji = emojiObject.emoji;
    setFormData({ ...formData, icon: emoji });
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | {
          name: string;
          value: string | ColorPickerRGBType | ColorPickerHSBType;
        }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    if (value === "emoji" && formData.iconType === "color") {
      setFormData((prevData) => {
        return {
          ...prevData,
          icon: "📝",
          iconType: "emoji",
        };
      });
    } else if (value === "color" && formData.iconType === "emoji") {
      setFormData((prevData) => {
        return {
          ...prevData,
          icon: "000",
          iconType: "color",
        };
      });
    } else {
      console.log(name, value);

      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };

  return (
    <>
      <header className="flex align-items-center gap-2">
        <span className="text-left">
          {formData.iconType == "emoji" ? (
            formData.icon
          ) : (
            <ColorPicker value={formData?.icon} disabled />
          )}
        </span>
        <InputText
          type="text"
          name="title"
          placeholder="Category title"
          className="flex-1 p-inputtext-sm"
          onChange={(e) => handleChange(e)}
          value={formData?.title}
        />
      </header>
      <section className="flex gap-2">
        <Button
          text
          name="iconType"
          type="button"
          value={"color"}
          icon="pi pi-palette"
          className={`${
            formData?.iconType === "color" && "bg-indigo-100"
          } block px-5 m-auto mt-2 border-round-lg w-fit`}
          onClick={() => handleChange({ name: "iconType", value: "color" })}
        />
        <Button
          text
          name="iconType"
          type="button"
          icon="pi pi-face-smile"
          className={`${
            formData?.iconType === "emoji" && "bg-indigo-100"
          } block px-5 m-auto mt-2 border-round-lg w-fit`}
          onClick={() => handleChange({ name: "iconType", value: "emoji" })}
        />
      </section>
      {formData?.iconType === "emoji" && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          className="col-12"
          suggestedEmojisMode={SuggestionMode.RECENT}
          emojiStyle={EmojiStyle.NATIVE}
          lazyLoadEmojis
        />
      )}
      {formData?.iconType === "color" && (
        <ColorPicker
          name="icon"
          value={formData.icon}
          onChange={(e) =>
            e.value && handleChange({ name: "icon", value: e.value })
          }
          inline
          className="col-12"
        />
      )}
    </>
  );
}
