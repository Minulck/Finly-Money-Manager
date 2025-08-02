import React, { useEffect } from "react";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserHook";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  }, [])

  const handleEditCategory = (category) => {

  }
  

  const handleAddCategory = async(categorey) => {
    const {name,type,icon} = categorey;

    if(name.trim()){
        toast.error("Category name is required");
    }
    try{
        const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
            name,
            type,
            icon
        })
        if(response.status===200){
            toast.success("Category added sucessfully")
            setOpenAddCategoryModal(false);
            fetchCategories();
        }
    }catch (error) {
        console.error("Error adding category:", error);
        toast.error("Failed to add category");
    }
    finally{
        console.log("Category added: ", categorey);
        setOpenAddCategoryModal(false);
        fetchCategories();
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

          <CategoryList className="bg-white" categories={categories} />

          {/* Adding category modal */}

          <Model title={"Add Category"} 
          isOpen={openAddCategoryModal} 
          onClose={()=>setOpenAddCategoryModal(false)}
          >
            <AddCategoryForm 
             onAddCategory={handleAddCategory}
            />

          </Model>

          {/* Updating category modal */}
        </div>
      </div>
    </Dashboard>
  );
};

export default Category;
