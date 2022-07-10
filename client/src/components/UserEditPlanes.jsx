import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, setUserNews, setUserPlan } from "../actions";
import axios from "axios";
import styles from "../Styles/UserDatos.module.css";
import Alert from "../functions/Alert";

const UserEditPlanes = () => {
  const allUsers = useSelector((state) => state.users);
  const logged = useSelector((state) => state.userLogged);
  const userId = allUsers.filter((u) => u._id === logged[0]._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlanDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserPlan(id));
    Alert('Desuscripción a "Soy Premium" con éxito', "success");
    setTimeout(function () {
      dispatch(getUsers()), 100;
    });
  };

  const handleNewsDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserNews(id));
    Alert("Desuscripción a nuestro Newsletter con éxito", "success");
    setTimeout(function () {
      dispatch(getUsers()), 100;
    });
  };

  const handleDeleteUser = async () => {
    console.log("hola");
    const id = [logged[0]._id];
    const json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/users/deleteUser/",
      id
    );
    navigate("/home");
  };

  return (
    <div className={styles.containerAll}>
      <div className={styles.containerUserPlan}>
        <h3>Plan</h3>

        <div className={styles.userPlan}>
          <p>Usuario: {userId[0].nickname} </p>
          <p>NewsLetter: {userId[0].isSubscribeNewsLetter ? "Si" : "No"} </p>
          <p>Premium: {userId[0].isPremiun ? "Si" : "No"} </p>
        </div>

        <div className={styles.buttonUserContainer}>
          {userId[0].isSubscribeNewsLetter === false ? (
            <button className={styles.button} disabled>
              Baja al NewsLetter
            </button>
          ) : (
            <button className={styles.button} onClick={handleNewsDelete}>
              Baja al NewsLetter
            </button>
          )}

          {userId[0].isPremiun === false ? (
            <button className={styles.button} disabled>
              Baja a Soy Premium
            </button>
          ) : (
            <button className={styles.button} onClick={handlePlanDelete}>
              Baja a Soy Premium
            </button>
          )}
        </div>

        <div>
          <p>
            Si quieres modificar tu forma de pago favor escríbenos a:
            growup@gmail.com
          </p>
        </div>

        <h3>Baja de usuario</h3>

        <button className={styles.button} onClick={handleDeleteUser}>
          Baja como usuario
        </button>
      </div>
    </div>
  );
};

export default UserEditPlanes;
