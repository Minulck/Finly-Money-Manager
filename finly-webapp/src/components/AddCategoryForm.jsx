import { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = ({onAddCategory}) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const categoryTypeOption = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };
  

  const handleSubmit = () => {
    onAddCategory(category);
    onClose();
  }

  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="Salary ,Freelancing ,Food ,Shopping"
        value={category.name}
        type="text"
      />
      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect
        option={categoryTypeOption}
      />
      <div className="flex justify-end mt-6">
        <button 
        type="button"
        onClick={handleSubmit}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition-colors">
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
