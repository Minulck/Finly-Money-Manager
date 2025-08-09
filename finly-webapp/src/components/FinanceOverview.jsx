import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({totalIncome, totalExpense, totalBalance}) => {
    const balanceData = [
        {name: "Total Income", value: totalIncome},
        {name: "Total Expense", value: totalExpense},
        {name: "Total Balance", value: totalBalance},
    ]
    
    return(
        <div className="card bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Finance Overview
                </h5>
            </div>
            <div className="w-full  relative">
                <CustomPieChart 
                  totalAmount={totalBalance}
                  data={balanceData} />

            </div>
        </div>
    )
}


export default FinanceOverview;