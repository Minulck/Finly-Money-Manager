import Dashboard from "../components/Dashboard";
import {useUser} from "../hooks/useUserHook";

const Home=() =>{
    useUser();
    return(
        <div>
            <Dashboard activeMenu="Dashboard">
                This is the Home Page
            </Dashboard>
        </div>
    )
}

export default Home;
