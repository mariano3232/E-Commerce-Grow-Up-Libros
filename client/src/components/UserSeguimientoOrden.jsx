import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserSeguimientoOrden = () => {
  const dispatch = useDispatch()
  const allOrders = useSelector((state) => state.orders)
  const logged = useSelector((state) => state.userLogged)

  const ordersWithUsers = allOrders.filter((order) => order.usuario.length > 0)
  const userOrders = ordersWithUsers.filter(
    (order) => order.usuario[0]._id === logged[0]._id
  )
  console.log('SOY ORDER WITH USER', ordersWithUsers)
  console.log('SOY usersOrders', userOrders)

  return (
    <div>
      {userOrders.length !== 0 ? (
        <div>
          <h1>Detalles de tu Compra</h1>
          <p>Orden Id: {userOrders.pop()?._id}</p>

          {userOrders.pop().usuario[0].email}

          <p>Fecha: {userOrders.pop().fecha}</p>
          <p>Total precio : {userOrders.pop().total}</p>
          <p>
            Producto:
            {userOrders.pop().produt.map((product) => (
              <li>{product}</li>
            ))}
          </p>
          <p>Direccion: {userOrders.pop().usuario[0].address}</p>
          <p>Codigo Postal: {userOrders.pop().usuario[0].postal}</p>
          <p>Ciudad: {userOrders.pop().usuario[0].ciudad}</p>
          <p>Pais: {userOrders.pop().usuario[0].country}</p>
          <p>Telefono: {userOrders.pop().usuario[0].phone}</p>
          <p>Estado de Pago: {userOrders.pop().status}</p>
          <h1>Estado de tu compra: {userOrders.pop().status_order}</h1>
        </div>
      ) : (
        <p>No tienes ordenes</p>
      )}
    </div>
  )
}

export default UserSeguimientoOrden
