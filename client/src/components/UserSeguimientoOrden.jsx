import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserSeguimientoOrden = () => {
  const dispatch = useDispatch()
  const allOrders = useSelector((state) => state.orders)
  const logged = useSelector((state) => state.userLogged)

  const ordersWithUsers = allOrders.filter((order) => order.usuario.length > 0)
  console.log('SOY ORDER WITH USER', ordersWithUsers)
  const userOrders = ordersWithUsers.filter(
    (order) => order.usuario[0]._id === logged[0]._id
  )
  console.log('SOY userOrders', userOrders)

  const ultimaOrden = []

  if (userOrders.length !== 0) {
    ultimaOrden = userOrders.pop()
  }
  console.log('SOY ultimaOrden', ultimaOrden)

  return (
    <div>
      {ultimaOrden ? (
        <div>
          <h1>Detalles de Orden</h1>
          <p>Orden Id: {ultimaOrden._id}</p>

          {ultimaOrden.usuario[0].email}

          <p>Fecha: {ultimaOrden.fecha}</p>
          <p>Total precio : {ultimaOrden.total}</p>
          <p>
            Producto:
            {ultimaOrden.produt.map((product) => (
              <li>{product}</li>
            ))}
          </p>
          <p>Cantidad: {ultimaOrden.quantity}</p>
          <p>Direccion: {ultimaOrden.usuario[0].address}</p>
          <p>Codigo Postal: {ultimaOrden.usuario[0].postal}</p>
          <p>Ciudad: {ultimaOrden.usuario[0].ciudad}</p>
          <p>Pais: {ultimaOrden.usuario[0].country}</p>
          <p>Telefono: {ultimaOrden.usuario[0].phone}</p>
          <p>Estado de Pago: {ultimaOrden.status}</p>
          <h1>Estado de Orden: {ultimaOrden.status_order}</h1>
        </div>
      ) : (
        <p>No tienes ordenes</p>
      )}
    </div>
  )
}

export default UserSeguimientoOrden
