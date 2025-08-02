import MenuBar from './MenuBar';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import SideBar from './SideBar';

const Dashboard=() =>{

    const { user } = useContext(AppContext);

    return(
        <>
            <div>
                <MenuBar />

                {user && (
                    <div className="flex">
                        <div className="max-[1080px]:hidden">
                           <SideBar/>
                        </div>

                        <div className="grow mx-5">
                            right side content
                        </div>

                    </div>
                )}
            </div>
        </>
    );

}

export default Dashboard;