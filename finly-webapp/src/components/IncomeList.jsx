import { Download, Mail } from "lucide-react";
import TransactionInfo from "./TransactionInfo";
import moment from "moment";


const IncomeList=({transactions,onDelete})=>{

    return(
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-800">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Mail size={16} className="text-gray-600"/> Email
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Download size={16} className="text-gray-600"/> Download
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((transaction) => (
                    <TransactionInfo 
                        key={transaction.id}
                        type="income"
                        title={transaction.name}
                        date={moment(transaction.date).format("MMM DD, YYYY")}
                        amount={transaction.amount}
                        icon={transaction.icon}
                        onDelete={() => onDelete(transaction.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IncomeList;