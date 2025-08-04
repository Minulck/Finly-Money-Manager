import React, { useEffect, useState } from 'react';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({totalIncome, totalExpense, totalBalance}) => {
    const balanceData = [
        {name: "Total Income", value: totalIncome},
        {name: "Total Expense", value: totalExpense},
        {name: "Total Balance", value: totalBalance},
    ]
    
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Finance Overview
                </h5>
            </div>
            <CustomPieChart 
              totalAmount={totalBalance}
              data={balanceData} />

        </div>
    )
}


export default FinanceOverview;