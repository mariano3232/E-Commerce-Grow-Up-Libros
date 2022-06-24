import React from "react";
import styles from "../Styles/CardBook.module.css";

export default function CardBook({ title, cover, price, rating }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={cover}
        alt="Not Found ):"
        width="200x"
        height="300"
      />
      <div className={styles.block}>
        <h2>{title}</h2>
        <div className={styles.ubiInfo}>
          <p className={styles.info}>{rating}</p>
          <p className={styles.info}>{price}$</p>
        </div>
      </div>
    </div>
  );
}
