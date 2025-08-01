import axios from "axios"; 
import {BASE_API_URL} from "./apiEndpoints.jsx";

const axiosConfig = axios.create({
    baseURL: BASE_API_URL,
    headers:{
        "Content-Type": "application/json",
        "Accept" : "application/json"
    }
})


// Exclude endpoints from token requirement
const excludeEndpoints = ["/login", "/register","/health","/activate"];


// Request interceptor to add token to headers if available

axiosConfig.interceptors.request.use(
    (config)=>{
        const shouldSkipToken = excludeEndpoints.some((endpoints)=> config.url?.includes(endpoints));
        if(!shouldSkipToken){
            const accessToken = localStorage.getItem("Token");
            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
            return config;
    },(error)=> Promise.reject(error));

// Response interceptor to handle errors globally
axiosConfig.interceptors.response.use(
    (response)=>{
        return response;
    },((error)=>{
        if(error.response && error.response.status === 401){
            console.error("Unauthorized access - redirecting to login");
            window.location.href = "/login";
        } else if(error.response && error.response.status === 403){
            console.error("Forbidden access - you do not have permission to view this resource");
        } else if(error.response && error.response.status === 404){
            console.error("Resource not found - please check the URL");
        } else if(error.response && error.response.status === 500){
            console.error("Internal server error - please try again later");
        } else {
            console.error("An error occurred:", error.message);
        }
        return Promise.reject(error);
    }
)
);

export default axiosConfig;