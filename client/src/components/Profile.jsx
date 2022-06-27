import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Profile(){

    const{ user , isAuthenticated , isLoading} = useAuth0()

    if(isLoading){
        return <div>Cargando...</div>
    }

    return (
        isAuthenticated && (
            <div>
                 {JSON.stringify(user)}

                {/* <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p> */}
            </div>
        )
    )
}

/*
{"nickname":"guillermobr88",
"name":"guillermobr88@gmail.com",
"picture":"https://s.gravatar.com/avatar/13aa6d5b3b0c99cc535fed7a2abf7d87?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgu.png",
"updated_at":"2022-06-27T18:15:56.384Z",
"email":"guillermobr88@gmail.com",
"email_verified":true,
"sub":"auth0|62b829304dd722e042fa9e14"}
isAdmin
if name === luis --> is AdminPro

misLibrosCMprado
misLibrosleidos
mis deseado

*/