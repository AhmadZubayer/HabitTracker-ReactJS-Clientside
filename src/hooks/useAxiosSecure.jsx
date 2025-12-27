import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  
});

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();

    // set token in the header for all the api call using axiosSecure hook

    useEffect(() => {

        //  request interceptor

        const requestInterceptor = instance.interceptors.request.use((config => {

            const token = user?.accessToken; 
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }

            return config;
        }));

        // response interceptor 

        instance.interceptors.response.use(res => {

            return res;
        }) , (error) => {

            const status = error.status
            if(status === 401 || status === 403){

            console.log('log out the user for bad request')
            signOutUser()
            .then (() => {
                navigate('/register')
            })
        }
        
        };
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject();
        }

    }, [user, signOutUser, navigate]);

    return instance;
};

export default useAxiosSecure;
