import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUserHook';

const Expensw=()=>{
    useUser();
    return(
        <div>
             <Dashboard activeMenu="Expenses">
                This is the Expense Page
            </Dashboard>
        </div>
    )

}

export default Expensw;