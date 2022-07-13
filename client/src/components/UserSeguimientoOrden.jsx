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
  console.log('hola3')
  return (
    <div>
      {userOrders.length !== 0 ? (
        <div>
          <h1>Detalles de tu Compra</h1>
          <p>Orden Id: {userOrders[userOrders.length - 1]._id}</p>

          {userOrders[userOrders.length - 1].usuario[0].email}

          <p>Fecha: {userOrders[userOrders.length - 1].fecha}</p>
          <p>Total precio : {userOrders[userOrders.length - 1].total}</p>
          <p>
            Producto:
            {userOrders[userOrders.length - 1].produt.map((product) => (
              <li>{product}</li>
            ))}
          </p>
          <p>
            Direccion: {userOrders[userOrders.length - 1].usuario[0].address}
          </p>
          <p>
            Codigo Postal: {userOrders[userOrders.length - 1].usuario[0].postal}
          </p>
          <p>Ciudad: {userOrders[userOrders.length - 1].usuario[0].ciudad}</p>
          <p>Pais: {userOrders[userOrders.length - 1].usuario[0].country}</p>
          <p>Telefono: {userOrders[userOrders.length - 1].usuario[0].phone}</p>
          <p>Estado de Pago: {userOrders[userOrders.length - 1].status}</p>
          <h1>
            Estado de tu compra:{' '}
            {userOrders[userOrders.length - 1].status_order}
          </h1>
        </div>
      ) : (
        <p>No tienes ordenes</p>
      )}
    </div>
  )
}

export default UserSeguimientoOrden
