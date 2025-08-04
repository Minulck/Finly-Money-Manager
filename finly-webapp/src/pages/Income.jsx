import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserHook";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import IncomeList from "../components/IncomeList";

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

  useEffect(() => {
    fetchIncomeData();
  }, []);

  useUser();
  return (
    <Dashboard activeMenu="Income">
        <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <h2 className="text-2xl font-bold">Income</h2>
                    <p className="text-gray-600">Manage your income transactions here.</p>

                </div>
                <IncomeList transactions={incomeData} 
                onDelete={(id) => {
                    console.log("Delete ID: ", id);
                }}/>
            </div>
        </div>
  </Dashboard>
  )
};

export default Income;
