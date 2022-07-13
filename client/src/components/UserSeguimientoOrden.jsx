
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserSeguimientoOrden = () => {

    const dispatch = useDispatch();
    const allOrders = useSelector(state=>state.orders);
    const logged = useSelector((state) => state.userLogged);
    const ordersWithUsers = allOrders.filter((order) => order.usuario.length > 0);
    const userOrders = ordersWithUsers.filter((order) => order.usuario[0]._id === logged[0]._id);
    const ultimaOrden = userOrders.pop();

    return (
        <div>
            <h1>Detalles de Orden</h1>
            <div>
                <p>Orden Id: {ultimaOrden._id}</p>
       
                {ultimaOrden.usuario[0].email}
           
                <p>Fecha: {ultimaOrden.fecha}</p>
                <p>Total precio : {ultimaOrden.total}</p>
                <p>Producto: 
                    {ultimaOrden.produt.map(product=>
                    <li>{product}</li>
                    )}
                </p>
                <p>Cantidad: {ultimaOrden.quantity}</p>
                <p>Direccion: {ultimaOrden.usuario[0].address}</p>
                <p>Codigo Postal: {ultimaOrden.usuario[0].postal}</p>
                <p>Ciudad: {ultimaOrden.usuario[0].ciudad}</p>
                <p>Pais: {ultimaOrden.usuario[0].country}</p>
                <p>Telefono: {ultimaOrden.usuario[0].phone}</p>
                <p>Estado de Pago: {ultimaOrden.status}</p>
                <p>Estado de Orden: {ultimaOrden.status_order}</p>
            </div>
        </div>
    )
}

export default UserSeguimientoOrden;
