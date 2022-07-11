
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers, setUserNews, setUserPlan } from '../actions';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../Styles/UserDatos.module.css';

const UserEditPlanes = () => {
    
    const allUsers = useSelector((state) => state.users);
    const logged = useSelector((state) => state.userLogged);
    const userId = allUsers.filter((u) => u._id === logged[0]._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logout } = useAuth0();
    
    const handlePlanDelete = () => {
        const id = [logged[0]._id];
        dispatch(setUserPlan(id));
        alert('Desuscripción a "Soy Premium" con éxito');
        setTimeout(function(){
            dispatch(getUsers()), 100
        });
    }
    
    const handleNewsDelete = () => {
        const id = [logged[0]._id];
        dispatch(setUserNews(id));
        alert('Desuscripción a nuestro Newsletter con éxito');
        setTimeout(function(){
            dispatch(getUsers()), 100
        });
    }
    
    const handleDeleteUser = () => {
        const id = [logged[0]._id];
        dispatch(deleteUser(id));
        alert('Usuario Eliminado');
        logout({ returnTo: window.location.origin });
        setTimeout(function(){
            dispatch(getUsers()), 100
        });
    }

    return (
        <div className={styles.containerAll}>
            
            <div className={styles.containerUserPlan}>
                <h3>Plan</h3>

                <div className={styles.userPlan}>
                    <p>Usuario: {userId[0].nickname} </p>
                    <p>NewsLetter: {userId[0].isSubscribeNewsLetter ? 'Si' : 'No'} </p>
                    <p>Premium: {userId[0].isPremiun ? 'Si' : 'No'} </p>
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

                <div>
                    <p>
                        Al clikear en el boton de Baja Usuario, estarias eliminando tu
                        historial de Grow-Up Libros, <br /> eliminando tus datos y preferencias, 
                        pero manteniendo tu usario de login.
                    </p>
                </div>
            
            </div>

        </div>
    )
}

export default UserEditPlanes;
