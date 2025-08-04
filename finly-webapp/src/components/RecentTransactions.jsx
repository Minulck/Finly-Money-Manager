import { ArrowBigRight } from "lucide-react";
import TransactionInfo from "./TransactionInfo";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold">
                    Recent Transactions
                </h5>
                <button className="text-blue-500 hover:underline flex items-center gap-1" onClick={onMore}>
                    View All <ArrowBigRight className="inline" size={15} />
                </button>
            </div>
            <div className="space-y-2">
                {transactions?.slice(0, 5).map((transaction) => (
                    <TransactionInfo 
                        key={transaction.id} 
                        title={transaction.description || transaction.title}
                        icon={transaction.icon}
                        date={moment(transaction.date).format("DD MMM YYYY")}
                        amount={transaction.amount}
                        type={transaction.type?.toLowerCase()}
                        hideDeletebtn={true}
                    />
                ))}
                {(!transactions || transactions.length === 0) && (
                    <p className="text-center text-gray-500 py-4">No recent transactions</p>
                )}
            </div>
        </div>
    );
}


export default RecentTransactions;