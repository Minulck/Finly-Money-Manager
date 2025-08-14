import { useState, useEffect } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import toast from "react-hot-toast";

const AddCategoryForm = ({ onAddCategory, isEditing, initialCategoryData, loading }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
    bucket: "Needs"
  });

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({
        name: "",
        type: "income",
        icon: "",
        bucket: "Needs"
      });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOption = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = () => {
    onAddCategory(category);
    setCategory({
      name: "",
      type: "income",
      icon: "",
      bucket: "Needs"
    });
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
        placeholder="Salary, Freelancing, Food, Shopping"
        value={category.name}
        type="text"
      />

      {/* Bucket selection shows only if type is expense */}
      {category.type === "expense" && (
        <div className="mt-2">
          <label className="block mb-1 font-medium">Category Bucket</label>
          <div className="flex gap-6 mt-1 mb-2">
            <div>
              <input
                className="mr-1"
                type="radio"
                name="categoryBucket"
                value="Needs"
                checked={category.bucket === "Needs"}
                onChange={({ target }) => handleChange("bucket", target.value)}
              />
              <label>Needs</label>
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                name="categoryBucket"
                value="Wants"
                checked={category.bucket === "Wants"}
                onChange={({ target }) => handleChange("bucket", target.value)}
              />
              <label>Wants</label>
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                name="categoryBucket"
                value="Savings"
                checked={category.bucket === "Savings"}
                onChange={({ target }) => handleChange("bucket", target.value)}
              />
              <label>Savings</label>
            </div>
          </div>
        </div>
      )}

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
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {isEditing ? "Updating..." : "Saving..."}
            </>
          ) : isEditing ? (
            "Update Category"
          ) : (
            "Save Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
