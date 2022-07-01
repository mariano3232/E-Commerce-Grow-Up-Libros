import React from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../actions";
import { Link } from "react-router-dom";


export default function AdminRefreshUsers(){


    const dispatch = useDispatch()


    const handleClickUsers = (e) => {
        e.preventDefault();
        dispatch(getUsers());
        scroller.scrollTo("gaston");
    };



    return(
        <div>
    
         <button onClick={handleClickUsers}>Todos los Usuarios</button>
     
     </div>
    )
}