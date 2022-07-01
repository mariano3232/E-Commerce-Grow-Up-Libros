// import { useDispatch } from "react-redux";
// import { setUserPlan ,getUsers } from "../actions";


// export default function AdminUserProfile({users , setChanged , changed}) {
//   const dispatch = useDispatch();

//   var userIds = [];

//   function toogleAdmin(e, users) {
//     users.map(usuario => {
//       userIds.push(  usuario._id );
//     });
//     setTimeout(function(){
//         dispatch(setUserPlan(userIds))
//     }, 5000);
    
    
//     dispatch(getUsers())
//     setChanged(!changed);
//    // console.log("changed AHORA ES es: ", changed);
//     userIds = [];
//   }

//   return (
//     <div>
//       <button onClick={(e) => toogleAdmin(e, users)}>
//        Ver Perfil
//       </button>
//     </div>
//   );
// }


import React from "react";


export default function AdminUserProfile(){
  return(
    <div><h5>Manejo Perfil usuario</h5></div>
  )
}