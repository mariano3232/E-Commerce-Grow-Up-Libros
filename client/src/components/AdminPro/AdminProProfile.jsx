import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUsers, postUserData } from '../../actions'
import styles from '../../Styles/AdminProProfile.module.css'
import Alert from '../../functions/Alert'

export function AdminProProfile() {
  const allUsers = useSelector((state) => state.users)
  const adminProLogged = useSelector((state) => state.userLogged)
  //const adminProLogged = allUsers.filter((usuario) => usuario.isSuperAdmin === true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //console.log(adminProLogged)

  useEffect(() => {
    return () => {
      dispatch(getUsers())
    }
  }, [dispatch])

  return (
    <div className={styles.containerAll}>
      <NavLink className={` ${styles.buttonBack}`} to='/adminpro'>
        <button className={`${styles.button} `}>Volver</button>
      </NavLink>

      <div className={styles.containerUserProfile}>
        <h2>Mi perfil</h2>
        <div className={styles.containerUser}>
          <p>Nombre: {adminProLogged[0].name}</p>
          <p>Apellido: {adminProLogged[0].surname}</p>
          <p>Email: {adminProLogged[0].email}</p>
          <p>Usuario: {adminProLogged[0].nickname}</p>
          <p>DNI: {adminProLogged[0].dni}</p>
          <p>País: {adminProLogged[0].country}</p>
          <p>Tel: {adminProLogged[0].phone}</p>
          <p>Dirección: {adminProLogged[0].address}</p>
          <p>Fecha de nacimiento: {adminProLogged[0].birthday}</p>
        </div>
      </div>
    </div>
  )
}
