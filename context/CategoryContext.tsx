"use client";

import { Category } from "@/models/Category";
import { defaultCategory } from "@/utils/taskUtils";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface CategoryContextType {
  categories: Category[];
  selectedCategory: Category;
  modifiedCategory: Category;
  addCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (category: Category) => void;
  selectCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    defaultCategory()
  );
  const [modifiedCategory, setModifiedCategory] = useState<Category>(
    defaultCategory()
  );

  const addCategory = (category: Category) =>
    setCategories((prevCategories) => [...prevCategories, category]);

  const editCategory = (category: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((prevCat) =>
        prevCat.id === category.id ? category : prevCat
      )
    );

    setModifiedCategory(category);
  };

  const deleteCategory = (category: Category) => {
    setCategories((prevCategories) =>
      prevCategories.filter((prevCat) => prevCat.id !== category.id)
    );
  };

  const selectCategory = (category: Category) => setSelectedCategory(category);

  const value = useMemo(
    () => ({
      categories,
      selectedCategory,
      modifiedCategory,
      addCategory,
      editCategory,
      deleteCategory,
      selectCategory,
    }),
    [categories, selectedCategory, modifiedCategory]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
