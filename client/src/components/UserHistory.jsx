import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../Styles/UserHistory.module.css'

const userHistory = () => {
  const dispatch = useDispatch()
  const allOrders = useSelector((state) => state.orders)
  const logged = useSelector((state) => state.userLogged)
  const ordersWithUsers = allOrders.filter((order) => order.usuario.length > 0)
  const userOrders = ordersWithUsers.filter(
    (order) => order.usuario[0]._id === logged[0]._id
  )

  return (
    <div className={styles.ordenes}>
      <h1>Historial de compras</h1>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Titulo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.length > 0 &&
            userOrders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.fecha.slice(0, 10)}</td>
                  {order.produt.map((p) => (
                    <td>
                      <li>{p}</li>
                    </td>
                  ))}
                  <td>$ {order.total.toFixed(2)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default userHistory
