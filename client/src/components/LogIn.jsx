import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from '../Styles/nav.module.css';
import { useDispatch } from "react-redux";


export default function LogInButton(){

    const{loginWithRedirect} = useAuth0()
    
    

    // function loginWithRedirect(){
    //     dispatch (postUser())
    // }

    return (
        <div>
            <button  onClick={()=>loginWithRedirect()}>LogIn</button>
        </div>
    )
}