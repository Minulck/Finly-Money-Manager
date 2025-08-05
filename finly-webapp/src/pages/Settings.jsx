import Dashboard from "../components/Dashboard";

const Settings = ()=>{
    return (
       <Dashboard>
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600">Manage your preferences and settings here.</p>
        </div>
       </Dashboard>
    );
}

export default Settings;