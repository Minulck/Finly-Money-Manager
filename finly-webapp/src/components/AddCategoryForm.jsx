import { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = () => {
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
    </div>
  );
};

export default AddCategoryForm;
