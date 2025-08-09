import React, { useState, useEffect, useContext } from "react";
import { prepareIncomeChartData } from "../util/chartDataPreparation";
import CustomLineChart from "./CustomLineChart";
import axiosConfig from "../util/axiosConfig";
import {API_ENDPOINTS} from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";

const IncomeOverview = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading, refreshTrigger } = useContext(AppContext);

  const fetchIncomeData = async () => {
    try {
      setError(null);
      const response = await axiosConfig.get(`${API_ENDPOINTS.INCOME}/current-month`);
      if (!response.data || response.data.length === 0) {
        setChartData([]);
        return;
      }
      const result = prepareIncomeChartData(response.data);
      setChartData(result);
    } catch (err) {
      console.error('Error fetching income data:', err);
      setError("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      // Add a small delay to ensure smooth loading state transitions
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const renderLoadingState = () => (
    <div className="card p-4">
      <div className="space-y-4 animate-pulse">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-100 rounded"></div>
        </div>
        <div className="h-[300px] w-full bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );

  if (loading || isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return <div className="card p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="card p-4">
      <div className="space-y-4">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-sm text-gray-400">
            Track your income transactions and analyze your earnings
          </p>
        </div>
        {chartData.length === 0 ? (
          <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No income data available</p>
              <p className="text-sm text-gray-400">Add your first income to see the chart</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="h-[300px] chart-container w-full overflow-x-auto">
              <div className="min-w-[600px] chart-min-width h-full">
                <CustomLineChart data={chartData} isExpense={false} isIncome={true} />
              </div>
            </div>
            {/* Mobile scroll hint */}
            <div className="md:hidden absolute top-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
              ← Scroll →
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
