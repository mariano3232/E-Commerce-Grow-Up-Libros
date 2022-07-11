import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../Styles/adminUserProfile.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AdminOrderStatusCancelled from "./ManejoDeEstados/AdminOrderStatusCancelled";
import AdminOrderStatusCreated from "./ManejoDeEstados/AdminOrderStatusCreated";
import AdminOrderStatusComplete from "./ManejoDeEstados/AdminOrderStatusComplete";
import AdminOrderStatusProcessing from "./ManejoDeEstados/AdminOrderStatusProcessing";
import { useState } from "react";
import { setOrderStatus , getAllOrders , deleteOrder} from "../../../actions";
import { animateScroll as scroll, Element } from 'react-scroll'
import Alert from "../../../functions/Alert";

export default function AdminOrderDetails(){

    const allOrders = useSelector(state=>state.orders)
    const dispatch = useDispatch()

    const id = useParams().id 
    const order = allOrders.filter((order) => order._id === id)[0]
    
    const ordersIds= [id]

    
    // const [seleccionados, setSeleccionados] = useState([id])
    const [changed, setChanged] = useState(false)

    function changeCreated(){
      console.log('estoy')
      dispatch(setOrderStatus({ordersIds,status:'Creada'}))
      setTimeout(function () {
        dispatch(getAllOrders())
      }, 1000)
      
     }
     function changeProcessing(){
      console.log('estoy')
      dispatch(setOrderStatus({ordersIds,status:'Procesando'}))
      setTimeout(function () {
        dispatch(getAllOrders())
      }, 1000)
      
     }

     function changeShipped(){
      console.log('estoy')
      dispatch(setOrderStatus({ordersIds,status:'Enviada'}))
      setTimeout(function () {
        dispatch(getAllOrders())
      }, 1000)
      
     }

     function changeCompletada(){
      console.log('estoy')
      dispatch(setOrderStatus({ordersIds,status:'Completada'}))
      setTimeout(function () {
        dispatch(getAllOrders())
      }, 1000)
      
     }

    
    function changeCancelled(){
      console.log('estoy')
      dispatch(setOrderStatus({ordersIds,status:'Cancelada'}))
      setTimeout(function () {
        dispatch(getAllOrders())
      }, 1000)
      
     }

     useEffect(() => {
      scroll.scrollToTop()
    }, [])
  
    function handleDeleteOrder(id) {
      dispatch(deleteOrder(id))
      Alert('Orden Eliminada', 'success')
      navigate('/admin')
      dispatch(getAllOrders())
    }


    return(
        <div className={styles.containerAdminProfile}>

        <NavLink className={` ${styles.buttonBack}`} to='/adminorders'>
              <button className={`${styles.button} `}>Ir a Todas Las Ordenes</button>
        </NavLink>

        <h2>Cambiar el Estado de la orden</h2>
        <div className={styles.containerAdmin}>
        <button className={`${styles.button} `} onClick={()=>changeCreated(ordersIds)}>Creada</button>
        <button  className={`${styles.button} `} onClick={()=>changeProcessing(ordersIds)}>Procesando</button>
        <button className={`${styles.button} `} onClick={()=>changeShipped(ordersIds)}>Enviada</button>
        <button className={`${styles.button} `} onClick={()=>changeCompletada(ordersIds)}>Completada</button>
        <button className={`${styles.button} `} onClick={()=>changeCancelled(ordersIds)}>Cancelada</button>
        </div>
        <div>
         <h1>Detalles de Orden</h1>
         <div  className={styles.containerAdmin}>
            <p className={styles.h2}>Orden Id: {order._id}</p>
           
                 <Link to={`/adminuserprofile/${order.usuario[0]._id}`}>
                          {order.usuario[0].email}
                </Link>
            <p className={styles.h2}>Fecha: {order.fecha}</p>
            <p className={styles.h2}>Total precio : {order.total}</p>
            <p className={styles.h2}>Producto: 
              {order.produt.map(product=>
              <li>{product}</li>
              )}
            </p>
            <p className={styles.h2}>Cantidad: {order.quantity}</p>
            <p className={styles.h2}>Direccion: {order.usuario[0].address}</p>
            <p className={styles.h2}>Codigo Postal: {order.usuario[0].postal}</p>
            <p className={styles.h2}>Ciudad: {order.usuario[0].ciudad}</p>
            <p className={styles.h2}>Pais: {order.usuario[0].country}</p>
            <p className={styles.h2}>Telefono: {order.usuario[0].phone}</p>
            <p className={styles.h2}>Estado de Pago: {order.status}</p>
            <p className={styles.h2}>Estado de Orden: {order.status_order}</p>
            </div>
            </div>
            <button className={`${styles.button} `} onClick={()=>handleDeleteOrder(id)}>Borrar Orden</button>
        </div>
    )
}

//CAMBIAR EL ESTADO
