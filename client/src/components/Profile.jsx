import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Profile(){

    const{ user , isAuthenticated , isLoading} = useAuth0()

    if(isLoading){
        return <di>Cargando...</di>
    }

    return (
        isAuthenticated && (
            <div>
                {/* {JSON.stringify(user)} */}

                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}