import { AppContext } from "../context/AppContext";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

export const useUser=()=>{

   const {user,setUser,clearUser} = useContext(AppContext);
   const navigate = useNavigate();

   useEffect(()=>{
    if(user){
        return;
    }

    let isMounteed=true;    

    const fetchUser=async()=>{
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
            if(isMounteed && response.data){
                setUser(response.data);
            }
        }catch(error){
            console.log("Error fetching user data:", error);
            if(isMounteed){
                navigate("/login");
            }
        }
    };
    fetchUser();
    return () => {
        isMounteed = false;
    };
   },[setUser,clearUser,navigate]);

}
