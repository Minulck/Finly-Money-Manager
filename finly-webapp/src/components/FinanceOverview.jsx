import CustomPieChart from './CustomPieChart';


const FinanceOverview = ({ totalIncome }) => {
    // Calculate 50/30/20 rule
    const needs = totalIncome * 0.5;
    const wants = totalIncome * 0.3;
    const savings = totalIncome * 0.2;

    const ruleData = [
        { name: "Needs (50%)", value: needs },
        { name: "Wants (30%)", value: wants },
        { name: "Savings (20%)", value: savings },
    ];

    return (
        <div className="card bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    50/30/20 Rule Overview
                </h5>
            </div>
            <div className="w-full ">
                <CustomPieChart
                    totalAmount={totalIncome}
                    data={ruleData}
                />

            </div>
        </div>
    );
}


export default FinanceOverview;