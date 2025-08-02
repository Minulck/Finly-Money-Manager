import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUserHook';

const Filter = () => {
    useUser();
    return (
        <div>
             <Dashboard activeMenu="Filters">
                This is the Filter Page
            </Dashboard>
        </div>
    );
}

export default Filter;
