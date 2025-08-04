import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserHook";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { icons, Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import toast from "react-hot-toast";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeData = async () => {
    if (loading) return;

    try {
      const response = await axiosConfig.get(`${API_ENDPOINTS.INCOME}/all`);
      if (response.status === 200) {
        setIncomeData(response.data);
        console.log("Income Data: ", response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
      toast.error("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axiosConfig.get(
        `${API_ENDPOINTS.CATEGORY}/Income`
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
    fetchIncomeData();
    fetchCategoryData();
  }, []);

  useUser();

  const handleAddIncome = async (incomeData) => {
    setLoading(true);
    const { name, amount, date, categoryId, icon } = incomeData;
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
      console.log("Adding income with data:", {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      const response = await axiosConfig.post(`${API_ENDPOINTS.INCOME}/add`, {
        name,
        amount,
        date,
        categoryId,
        icon,
      });
      if (response.status === 201) {
        toast.success("Income added successfully");
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income");
    } finally {
      setLoading(false);
      setOpenIncomeModal(false);
      fetchIncomeData();
    }
  };

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <button
              onClick={() => setOpenIncomeModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} />
              Add Income
            </button>
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteModal({ show: true, data: id });
            }}
          />

          <Model
            isOpen={openIncomeModal}
            onClose={() => setOpenIncomeModal(false)}
            title="Add Income Transaction"
          >
            <AddIncomeForm
              onAddIncome={(incomeData) => handleAddIncome(incomeData)}
              categories={categoryData}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
