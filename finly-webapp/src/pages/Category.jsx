import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUserHook';

const Category=() =>{
    useUser();
    return(
        <div>
             <Dashboard activeMenu="Category">
                This is the Category Page
            </Dashboard>
        </div>
    )
}

export default Category;