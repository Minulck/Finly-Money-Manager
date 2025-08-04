import { useState, useEffect } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";


const AddExpenseForm = ({ onAddExpense, categories, isEditing, initialExpenseData, loading }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    categoryId: categories.length > 0 ? categories[0].id : "",
    icon: "",
  });

  useEffect(() => {
    // Set initial data when editing
    if (isEditing && initialExpenseData) {
      setExpense({
        id: initialExpenseData.id,
        name: initialExpenseData.name,
        amount: initialExpenseData.amount,
        date: initialExpenseData.date,
        categoryId: initialExpenseData.categoryId,
        icon: initialExpenseData.icon,
      });
    }
  }, [isEditing, initialExpenseData]);

  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div>
      <EmojiPickerPopup
        onSelect={(emoji) => handleChange("icon", emoji)}
        icon={expense.icon}
      />
      <Input
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeholder="e.g Salary, Freelancing"
        value={expense.name}
        type="text"
      />
      <Input
        label="Expense Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect
        option={categoryOptions}
      />
      <Input
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Expense Amount"
        placeholder="e.g 5000, 200"
        value={expense.amount}
        type="number"
      />
        <Input
            onChange={({ target }) => handleChange("date", target.value)}
            label="Expense Date"
            value={expense.date}
            type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isEditing ? 'Updating...' : 'Saving...'}
            </>
          ) : (
            isEditing ? 'Update Expense' : 'Save Expense'
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
