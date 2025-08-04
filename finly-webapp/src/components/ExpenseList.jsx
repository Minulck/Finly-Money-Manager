import { Download, Mail } from "lucide-react";
import TransactionInfo from "./TransactionInfo";
import moment from "moment";


const ExpenseList=({transactions,onDelete,onEdit,onDownload,onEmail})=>{

    return(
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-800">Expense Sources</h5>
                <div className="flex items-center justify-end gap-2">

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((transaction) => (
                    <TransactionInfo 
                        key={transaction.id}
                        type="Expense"
                        title={transaction.name}
                        date={moment(transaction.date).format("MMM DD, YYYY")}
                        amount={transaction.amount}
                        icon={transaction.icon}
                        onDelete={() => onDelete(transaction.id)}
                        onEdit={()=>onEdit(transaction)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;