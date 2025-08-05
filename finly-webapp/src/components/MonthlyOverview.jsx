import React, { useState, useEffect, useContext } from "react";
import { prepareBalanceChartData } from "../util/chartDataPreparation";
import CustomLineChart from "./CustomLineChart";
import axiosConfig from "../util/axiosConfig";
import {API_ENDPOINTS} from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";


const MonthlyOverview = () =>{
  const [chartData, setChartData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading, refreshTrigger } = useContext(AppContext);

  const fetchBalanceData = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Fetch both income and expense data
      const [incomeResponse, expenseResponse] = await Promise.all([
        axiosConfig.get(`${API_ENDPOINTS.INCOME}/all`),
        axiosConfig.get(`${API_ENDPOINTS.EXPENSE}/all`)
      ]);

      const incomeData = incomeResponse.data || [];
      const expenseData = expenseResponse.data || [];

      // Prepare balance chart data based on selected time period
      const result = prepareBalanceChartData(incomeData, expenseData, timePeriod);
      setChartData(result);
    } catch (err) {
      console.error('Error fetching balance data:', err);
      setError("Failed to fetch balance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, [refreshTrigger, timePeriod]); // Refetch when refreshTrigger or timePeriod changes

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

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

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

  const getTitle = () => {
    switch (timePeriod) {
      case 'weekly':
        return 'Weekly Balance Overview';
      case 'monthly':
        return 'Monthly Balance Overview';
      case 'daily':
      default:
        return 'Daily Balance Overview';
    }
  };

  const getDescription = () => {
    switch (timePeriod) {
      case 'weekly':
        return 'Track your weekly balance progression and financial trends';
      case 'monthly':
        return 'Monitor your monthly balance growth and financial health';
      case 'daily':
      default:
        return 'View your daily balance changes and cash flow patterns';
    }
  };

  const getEmptyStateMessage = () => {
    switch (timePeriod) {
      case 'weekly':
        return 'No weekly balance data available';
      case 'monthly':
        return 'No monthly balance data available';
      case 'daily':
      default:
        return 'No daily balance data available';
    }
  };

  return (
    <div className="card p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-semibold">{getTitle()}</h5>
            <p className="text-sm text-gray-400">
              {getDescription()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="timePeriod" className="text-sm font-medium text-gray-700">
              View:
            </label>
            <select
              id="timePeriod"
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        
        {chartData.length === 0 ? (
          <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 mb-2">{getEmptyStateMessage()}</p>
              <p className="text-sm text-gray-400">Add income and expenses to see your balance chart</p>
            </div>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <CustomLineChart data={chartData} isExpense={false} isIncome={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyOverview;