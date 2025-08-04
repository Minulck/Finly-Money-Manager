import React, { useEffect, useState, useContext } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserHook";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import { Delete, icons, Plus } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import toast from "react-hot-toast";
import ExpenseOverview from "../components/ExpenseOverview";
import { AppContext } from "../context/AppContext";

const Expense = () => {
  const { triggerRefresh } = useContext(AppContext);
  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState({
    show: false,
    data: null,
  });

  const handleDownload = () => {
    try{
        
    }catch (error) {
      console.error("Error downloading expense data:", error);
      toast.error("Failed to download expense data");
    }
  }

  const handleEmail = () => {
    console.log("Email Expense Data");
  };

  const fetchExpenseData = async () => {
    if (loading) return;

    try {
      const response = await axiosConfig.get(`${API_ENDPOINTS.EXPENSE}/all`);
      if (response.status === 200) {
        setExpenseData(response.data);
        console.log("Expense Data: ", response.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
      toast.error("Failed to fetch expense data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axiosConfig.get(
        `${API_ENDPOINTS.CATEGORY}/Expense`
      );
      if (response.status === 200) {
        setCategoryData(response.data);
        console.log("Category Data: ", response.data);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Failed to fetch category data");
    }
  };

  useEffect(() => {
    fetchExpenseData();
    fetchCategoryData();
  }, []);

  useUser();

  const handleAddExpense = async (expenseData) => {
    setLoading(true);
    const { name, amount, date, categoryId, icon } = expenseData;
    if (!name || !amount || !date || !categoryId) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    if (Number(amount) <= 0) {
      toast.error("Amount should be greater than 0");
      setLoading(false);
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (today < date) {
      toast.error("Date cannot be in the future");
      setLoading(false);
      return;
    }

    try {
      console.log("Adding expense with data:", {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      const response = await axiosConfig.post(`${API_ENDPOINTS.EXPENSE}/add`, {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      if (response.status === 201) {
        toast.success("Expense added successfully");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
      setOpenExpenseModal(false);
      fetchExpenseData();
      triggerRefresh();
    }
  };

  const handleEditExpense = async (expenseData) => {
    setLoading(true);
    setSelectedExpense(expenseData);
    const { id, name, amount, date, categoryId, icon } = expenseData;
    if (!name || !amount || !date || !categoryId) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    if (Number(amount) <= 0) {
      toast.error("Amount should be greater than 0");
      setLoading(false);
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (today < date) {
      toast.error("Date cannot be in the future");
      setLoading(false);
      return;
    }

    try {
      console.log("Adding expense with data:", {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      const response = await axiosConfig.put(`${API_ENDPOINTS.EXPENSE}/${id}`, {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      if (response.status === 201) {
        toast.success("Expense Updated successfully");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
      setOpenEditExpenseModal(false);
      fetchExpenseData();
      setSelectedExpense(null);
      triggerRefresh();
    }
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    try {
      const response = await axiosConfig.delete(
        `${API_ENDPOINTS.EXPENSE}/${id}`
      );
      if (response.status === 204) {
        toast.success("Expense deleted successfully");
        fetchExpenseData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    } finally {
      setLoading(false);
      setOpenDeleteModal({ show: false, data: null });
      triggerRefresh();
    }
  };

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <button
              onClick={() => setOpenExpenseModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} />
              Add Expense
            </button>
            <ExpenseOverview
              transactions={expenseData}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteModal({ show: true, data: id });
            }}
            onEdit={(transaction) => {
              setOpenEditExpenseModal(true);
              setOpenExpenseModal(false);
              setSelectedExpense(transaction); // Fixed: using correct setState
            }}
            onDownload={handleDownload}
            onEmail={handleEmail}
          />

          <Model
            isOpen={openExpenseModal}
            onClose={() => setOpenExpenseModal(false)}
            title="Add Expense Transaction"
          >
            <AddExpenseForm
              onAddExpense={(expenseData) => handleAddExpense(expenseData)}
              categories={categoryData}
              loading={loading}
            />
          </Model>

          <Model
            isOpen={openEditExpenseModal}
            onClose={() => {
              setOpenEditExpenseModal(false);
              setSelectedExpense(null);
            }}
            title="Edit Expense Transaction"
          >
            <AddExpenseForm
              onAddExpense={handleEditExpense}
              categories={categoryData}
              initialExpenseData={selectedExpense}
              isEditing={true}
              loading={loading}
            />
          </Model>

          <Model
            isOpen={openDeleteModal.show}
            onClose={() => setOpenDeleteModal({ show: false, data: null })}
            title="Delete Income Transaction"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense transaction?"
              onDelete={() => handleDeleteExpense(openDeleteModal.data)}
              onClose={() => setOpenDeleteModal({ show: false, data: null })}
              loading={loading}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
