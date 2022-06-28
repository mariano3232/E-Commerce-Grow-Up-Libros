import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from '../Styles/nav.module.css';

export default function LogOutButton(){

    const {logout} = useAuth0()


    return(
        <div>
            <button  onClick={()=>logout({returnTo: window.location.origin})}>LogOut</button>
        </div>
    )
}