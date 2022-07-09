import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Styles/UserHistory.module.css";

const userHistory = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state);

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
          {orders.length > 0 &&
            orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.fecha.slice(0, 10)}</td>
                  <td>{order.produt[0]}</td>
                  <td>$ {order.total.toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default userHistory;
