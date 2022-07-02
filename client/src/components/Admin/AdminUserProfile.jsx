
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../../Styles/adminUserProfile.module.css"


export default function AdminUserProfile(){

  const id = useParams().id

  const allUsers = useSelector(state=> state.users)

  const usuario = allUsers.filter(usuario=>usuario._id===id)[0]

  console.log('wwww:',usuario)
  

  console.log('aaaa',id)
  return(
    <div>
      <h1>Manejo Perfil usuario</h1>

       <h2 className={styles.h2} >Name:{usuario.name}</h2> 
       <h2 className={styles.h2} >Surname:{usuario.surname}</h2> 
       <h2 className={styles.h2} >Email:{usuario.email}</h2> 
       <h2 className={styles.h2} >Dni:{usuario.dni}</h2> 
       <h2 className={styles.h2} >Nickname:{usuario.nickname}</h2> 
       <h2 className={styles.h2} >Birthday:{usuario.birthday}</h2> 
       <h2 className={styles.h2} >Country:{usuario.country}</h2> 
       <h2 className={styles.h2} >Phone:{usuario.phone}</h2> 
       <h2 className={styles.h2} >Address:{usuario.address}</h2> 
                    
      <h1>ORDENES</h1>
    
    </div>
  )
}