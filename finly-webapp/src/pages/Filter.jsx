import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUserHook';
import { Search } from 'lucide-react';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import axiosConfig from '../util/axiosConfig';

const Filter = () => {
    useUser();

    const [type, setType] = React.useState('all');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [sortField, setSortField] = React.useState('date');
    const [sortOrder, setSortOrder] = React.useState('asc');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchTransactions = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let results = [];
            if (type === 'all' || type === 'income') {
                const incomeResponse = await axiosConfig.get(`${API_ENDPOINTS.INCOME}/all`, {
                    params: {
                        startDate,
                        endDate,
                        sortOrder,
                        search: searchTerm
                    }
                });
                results = [...results, ...incomeResponse.data.map(item => ({ ...item, type: 'income' }))];
            }
            if (type === 'all' || type === 'expense') {
                const expenseResponse = await axiosConfig.get(`${API_ENDPOINTS.EXPENSE}/all`, {
                    params: {
                        startDate,
                        endDate,
                        sortOrder,
                        search: searchTerm
                    }
                });
                results = [...results, ...expenseResponse.data.map(item => ({ ...item, type: 'expense' }))];
            }
            
            setTransactions(results);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             <Dashboard activeMenu="Filters">
                <div className="mx-auto my-5">
                   <div className="flex-justify-between items-center mb-5">
                       <h2 className="text-xl font-semibold">
                           Filter Transactions
                       </h2>
                   </div>
                   <div className="card p-4 mb-4 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select Filter</h5>
                    </div>
                    <form onSubmit={fetchTransactions} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='type'>Type</label>
                            <select 
                                id="type" 
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="all">All</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label className="block test-sm font-medium mb-1" htmlFor='start-date'>Start Date</label>
                            <input 
                                type="date" 
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border rounded px-3 py-2" 
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='end-date'>End Date</label>
                            <input 
                                type="date" 
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border rounded px-3 py-2" 
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='sortOrder'>Sort Order</label>
                            <select 
                                id="sortOrder"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className="sm:col-span-1 md:col-span-2 flex items-end">
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='search'>Search</label>
                                <input 
                                    type="text" 
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder='Search...' 
                                    className="w-full border rounded px-3 py-2" 
                                />
                            </div>
                            <button 
                                type="submit"
                                className="ml-2 mb-1 p-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded flex items-center justify-center cursor-pointer"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>
                   </div>

                   {/* Results Section */}
                   <div className="card p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Results</h3>
                        {loading ? (
                            <p className="text-center">Loading...</p>
                        ) : transactions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.map((transaction, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                                                        transaction.type === 'income' 
                                                            ? 'text-green-800 bg-green-100' 
                                                            : 'text-red-800 bg-red-100'
                                                    }`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Rs:{transaction.amount}</td>
                                                <td className="px-6 py-4">{transaction.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{transaction.category?.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No transactions found</p>
                        )}
                   </div>
                   </div>
            </Dashboard>
        </div>
    );
}

export default Filter;
