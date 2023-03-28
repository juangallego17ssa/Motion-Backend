import Header from "../../components/Header";

import { Outlet} from "react-router-dom";
import MainTop from "./Components/MainTop/MainTop";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import motionAPI from "../../axios/motionAPI";
import { updateUserData } from "../../redux/slices/user";





const Posts = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return;
        }

        const getMe = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                };

                const response = await motionAPI.get("users/me", config);
                dispatch(updateUserData(response.data));
            } catch (error) {
                console.log(error);
            }
        }

        getMe();

    }, []);
    
    

    return (
        <>
         <Header />
        <MainTop/>

        <Outlet/>


        </>
    )
}

export default Posts;
