import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserHook";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import Model from "../components/Model";
import DeleteAlert from "../components/DeleteAlert";
import AddCategoryForm from "../components/AddCategoryForm";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { triggerRefresh } = useContext(AppContext);
  useUser();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState({
    show: false,
    data: null,
  });

  const fetchCategories = async () => {
    if (loading) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);
      if (response.status == 200) {
        console.log("Categories: ", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      setError("Failed to fetch categories");
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = async (category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name || !type) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await axiosConfig.put(
        `${API_ENDPOINTS.CATEGORY}/${category.id}`,
        {
          name,
          type,
          icon,
        }
      );
      console.log("Category updated: ", response.status);
      if (response.status === 201) {
        toast.success("Category updated sucessfully");
        setOpenEditCategoryModal(false);
        fetchCategories();
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Error updating category:", error.response.data);
      toast.error(error.response.data || "Failed to update category");
    } finally {
      console.log("Category updated: ", category);
      setOpenEditCategoryModal(false);
      fetchCategories();
      setSelectedCategory(null);
    }
  };

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name || !type) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await axiosConfig.post(
        `${API_ENDPOINTS.CATEGORY}/save`,
        {
          name,
          type,
          icon,
        }
      );
      if (response.status === 201) {
        toast.success("Category added sucessfully");
        setOpenAddCategoryModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response.data || "Failed to add category");
    } finally {
      console.log("Category added: ", category);
      setOpenAddCategoryModal(false);
      fetchCategories();
    }
  };

    const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      const response = await axiosConfig.delete(
        `${API_ENDPOINTS.CATEGORY}/${id}`
      );
      if (response.status === 204) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
      setOpenDeleteModal({ show: false, data: null });
      triggerRefresh();
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div>
        <div className="my-5 mx-auto">
          {/* add button to add category */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <button
              onClick={() => setOpenAddCategoryModal(true)}
              className="add-btn text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-200 px-4 py-2 rounded hover:bg-emerald-100 transition-colors"
            >
              <Plus size={15} />
              Add Category
            </button>
          </div>

          {/* Category list */}

          <CategoryList
            className="bg-white"
            categories={categories}
            onEditCategory={handleEditCategory}
            onDelete={(id) => {
              setOpenDeleteModal({ show: true, data: id });
            }}
          />

          {/* Adding category modal */}

          <Model
            title={"Add Category"}
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
          >
            <AddCategoryForm
              onAddCategory={handleAddCategory}
              loading={loading}
            />
          </Model>

          {/* Updating category modal */}

          <Model
            title={"Update Category"}
            isOpen={openEditCategoryModal}
            onClose={() => {
              setOpenEditCategoryModal(false);
              setSelectedCategory(null);
            }}
          >
            <AddCategoryForm
              category={selectedCategory}
              isEditing={true}
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpdateCategory}
              loading={loading}
            />
          </Model>

          <Model
            isOpen={openDeleteModal.show}
            onClose={() => setOpenDeleteModal({ show: false, data: null })}
            title="Delete Category"
          >
            <DeleteAlert
              content="Are you sure you want to delete this Category?"
              onDelete={() => handleDeleteCategory(openDeleteModal.data)}
              onClose={() => setOpenDeleteModal({ show: false, data: null })}
              loading={loading}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Category;
