import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUserHook';


const Income=() => {
    useUser();
    return(
        <div>
              <Dashboard activeMenu="Income">
                This is the Income Page
            </Dashboard>
        </div>
    )
}

export default Income;