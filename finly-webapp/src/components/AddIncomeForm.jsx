import { useState, useEffect } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";


const AddIncomeForm = ({ onAddIncome, categories, isEditing, initialIncomeData }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    categoryId: categories.length > 0 ? categories[0].id : "",
    icon: "",
  });

  useEffect(() => {
    // Set initial data when editing
    if (isEditing && initialIncomeData) {
      setIncome({
        id: initialIncomeData.id,
        name: initialIncomeData.name,
        amount: initialIncomeData.amount,
        date: initialIncomeData.date,
        categoryId: initialIncomeData.categoryId,
        icon: initialIncomeData.icon,
      });
    }
  }, [isEditing, initialIncomeData]);

  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div>
      <EmojiPickerPopup
        onSelect={(emoji) => handleChange("icon", emoji)}
        icon={income.icon}
      />
      <Input
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Name"
        placeholder="e.g Salary, Freelancing"
        value={income.name}
        type="text"
      />
      <Input
        label="Income Category"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect
        option={categoryOptions}
      />
      <Input
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Income Amount"
        placeholder="e.g 5000, 200"
        value={income.amount}
        type="number"
      />
        <Input
            onChange={({ target }) => handleChange("date", target.value)}
            label="Income Date"
            value={income.date}
            type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition-colors"
        >
          {isEditing ? 'Update Income' : 'Save Income'}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
