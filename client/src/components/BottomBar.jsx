import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/BottomBar.module.css";
import InfoIcon from "@mui/icons-material/Info";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PaymentIcon from "@mui/icons-material/Payment";
import ShareIcon from "@mui/icons-material/Share";
import DraftsIcon from "@mui/icons-material/Drafts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function BottomBar() {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${input}. Suscripción exitosa a nuestro newsletters.`);
    setInput('');
  }

  const instagram = "https://img.icons8.com/nolan/64/instagram-new.png";

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <ul>
          <li className={styles.about}>
            <InfoIcon />
            <Link to="/aboutus">
              <span>About us</span>
            </Link>
          </li>
          <li>
            <LiveHelpIcon />
            <Link to="/faq">
              <span>FAQ's</span>
            </Link>
          </li>
          <li className={styles.payments}>
            <PaymentIcon />
            <span>Medios de Pago:</span>
          </li>


          <Link to="/faq">
            <h5>FAQ's</h5>
          </Link>
            <h5>Medios de Pago:</h5>
         <img
          src="https://play-lh.googleusercontent.com/4hN-UTy-2_Ma1Ouye5FpN2Issj73Oms62hokLp5OZR6zdt2yzkEpGSpK0v47RK8Oc8Q"
          width="50px"
        ></img>
          <li className={styles.networks}>
            <ShareIcon />
            <span>Redes Sociales:</span>
            <a href="https://www.instagram.com/">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/">
              <FacebookIcon />
            </a>
          </li>
        <div>
          <input type="text" placeholder='mail' value={input} onChange={(e) => handleChange(e)}/>
          <button type='submit' onClick={(e) => handleSubmit(e)}>Suscribirse</button>
        </div>
          <li className={styles.info}>
            <DraftsIcon />
            <span>NewsLetter</span>
          </li>
          <li>
            <LocationOnIcon />
            <span>Dirección: Av Belgrano 444, Mendoza, Argentina</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
