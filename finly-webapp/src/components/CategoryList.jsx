import { Layers2, Pencil, Trash2 } from "lucide-react";

const CategoryList = ({ categories, onAddCategory, onEditCategory,onDelete }) => {
  return (
    <>
      <div className="mt-4 card p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Category Sources</h4>
        </div>

        {/* Category List */}
        {categories && categories.length === 0 ? (
          <p className="text-gray-500">
            No categories available. Please add a category.
          </p>
        ) : (
          <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200/60"
              >
                <div className="w-12 h-12 flex  items-center justify-center text-xl text-gray-800 bg-emerald-100 rounded-full">
                  {category.icon ? (
                    <span className="2xl">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-8 h-8"
                      />
                    </span>
                  ) : (
                    <Layers2
                      className="text-primary text-emerald-600"
                      size={24}
                    />
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      {category.name}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 capitalize">
                      {category.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  
                  <button
                    onClick={() => onEditCategory(category)}
                    className="text-gray-400 hover:text-green-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-gray-400 hover:text-red-800  opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
