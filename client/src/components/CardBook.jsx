import React from "react";
import styles from "../Styles/CardBook.module.css";

export default function CardBook({ title, cover, price, rating }) {
  return (
    <div className={styles.container}>
      <img src={cover} alt="Not Found ):" width="150x" height="230" />
      <div>
        <h2>{title}</h2>
        <p className={styles.info}>{rating}</p>
        <p className={styles.info}>{price}$</p>
      </div>
    </div>
  );
}
