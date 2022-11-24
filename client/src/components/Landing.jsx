
import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";
import treehead from "../assets/imgs/pngwing.com.png";

export default function Landing() {

  const usuario = useSelector ( state => state.userLogged)  
 
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2 className={styles.frase}>
          "Dicen que la felicidad no se puede comprar, pero siempre puedes encontrarla en un libro"
        </h2>
        {
          usuario.length===1
          ?(usuario[0].name?<h1>Bienvenido {usuario[0].name}!!!</h1>
          :<h1>Bienvenido {usuario[0].nickname}!!!</h1>)
          :''
        }
        <Link to="/home">
          <button className={styles.btn}>¡Vamos!</button>
        </Link>
      </div>
      <img src={treehead} alt="treehead" className={styles.img}/>
    </div>
  );
}
