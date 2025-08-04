import { Trash, Trash2, TrendingUp, UtensilsCrossed } from "lucide-react";

const TransactionInfo = ({ icon,title,date,amount,type,hideDeletebtn,onDelete}) => {
    
    const getAmountStyle = () => {
        return type === 'income' ? 'text-green-700 bg-emerald-100' : 'text-red-700 bg-red-100';
    };

    return (
       <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl text-gray-800">
                {icon ? (
                    <img src={icon} alt={title} className="w-8 h-8" />
                ) : (
                    <UtensilsCrossed className="w-8 h-8 text-emerald-00" />
                )}
            </div>
            <div className="flex-1 flex flex-items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!hideDeletebtn && (
                        <button className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onDelete}>
                           <Trash2 size={18}/>
                        </button>
                    )}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-lg font-semibold ${getAmountStyle()}`}>
                        <h6 className="text-xs font-medium">
                            {type=== 'income' ? '+' : '-'}  {amount}
                        </h6>
                        {type === 'income' ? (
                            <TrendingUp size={15} />
                        ) : (
                            <TrendingDown size={15} />
                        )}
                    </div>
                </div>
            </div>
       </div>
    );
}

export default TransactionInfo;