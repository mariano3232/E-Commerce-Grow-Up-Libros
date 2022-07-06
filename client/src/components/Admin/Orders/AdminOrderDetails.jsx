import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from '../../../Styles/adminUserProfile.module.css'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AdminOrderStatusCancelled from "./ManejoDeEstados/AdminOrderStatusCancelled";
import AdminOrderStatusCreated from "./ManejoDeEstados/AdminOrderStatusCreated";
import AdminOrderStatusComplete from "./ManejoDeEstados/AdminOrderStatusComplete";
import AdminOrderStatusProcessing from "./ManejoDeEstados/AdminOrderStatusProcessing";
import { useState } from "react";

export default function AdminOrderDetails(){

    const allOrders = useSelector(state=>state.orders)
    const id = useParams().id 
    const order = allOrders.filter((order) => order._id === id)[0]
    
    const seleccionados = [id]

    
    // const [seleccionados, setSeleccionados] = useState([id])
    const [changed, setChanged] = useState(false)


    return(
        <div className={styles.containerAdminProfile}>

        <NavLink className={` ${styles.buttonBack}`} to='/adminorders'>
                  <button className={`${styles.button} `}>Volver</button>
          </NavLink>
          <AdminOrderStatusCreated
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
             <AdminOrderStatusProcessing
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
             <AdminOrderStatusComplete
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
             <AdminOrderStatusCancelled
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
        <div className={styles.containerAdmin}>
         <h1>Detalles de Orden</h1>
            <p className={styles.h2}>Orden Id: {order._id}</p>
           
                 <Link to={`/adminuserprofile/${order.usuario[0]._id}`}>
                          {order.usuario[0].email}
                </Link>
            <p className={styles.h2}>Fecha: {order.fecha}</p>
            <p className={styles.h2}>Total precio : {order.total}</p>
            <p className={styles.h2}>Producto: {order.produt}</p>
            <p className={styles.h2}>Cantidad: {order.quantity}</p>
            <p className={styles.h2}>Direccion: {order.usuario[0].address}</p>
            <p className={styles.h2}>Estado de Pago: {order.phone}</p>
            <p className={styles.h2}>Estado de Orden: {order.status}</p>
      
            </div>
        </div>
    )
}

//CAMBIAR EL ESTADO