import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCrd";
import { useUser } from "../hooks/useUserHook";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={dashboardData?.totalBalance || 0}
              color="bg-green-500"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={dashboardData?.totalIncome || 0}
              color="bg-blue-500"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={dashboardData?.totalExpense || 0}
              color="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions || []}
              onMore={() => navigate("/filter")}
            />
            <FinanceOverview
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              totalBalance={dashboardData?.totalBalance || 0}
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
