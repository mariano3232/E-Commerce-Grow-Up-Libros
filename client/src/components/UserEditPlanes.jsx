import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getUsers, setUserNews, setUserPlan } from '../actions'
import { useAuth0 } from '@auth0/auth0-react'
import styles from '../Styles/UserDatos.module.css'
import Alert from '../functions/Alert'

const UserEditPlanes = () => {
  const allUsers = useSelector((state) => state.users)
  const logged = useSelector((state) => state.userLogged)
  const userId = allUsers.filter((u) => u._id === logged[0]._id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logout } = useAuth0()

  const handlePlanDelete = () => {
    const id = [logged[0]._id]
    dispatch(setUserPlan(id))
    Alert('Desuscripción a "Soy Premium" con éxito', 'success')
    setTimeout(function () {
      dispatch(getUsers()), 100
    })
  }

  const handleNewsDelete = () => {
    const id = [logged[0]._id]
    dispatch(setUserNews(id))
    Alert('Desuscripción a nuestro Newsletter con éxito', 'success')
    setTimeout(function () {
      dispatch(getUsers()), 100
    })
  }

  const handleDeleteUser = () => {
    const id = [logged[0]._id]
    dispatch(deleteUser(id))
    Alert('Usuario Eliminado', 'delete')
    logout({ returnTo: window.location.origin })
    setTimeout(function () {
      dispatch(getUsers()), 100
    })
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

          <div>
            <h3>Baja de usuario</h3>

            <div>
              <p>
                Al clikear en el boton de Baja Usuario, estarias eliminando tu
                historial de Grow-Up Libros, <br /> eliminando tus datos y
                preferencias, pero manteniendo tu usario de login.
              </p>
            </div>
          </div>
          <button className={styles.button} onClick={handleDeleteUser}>
            Baja como usuario
          </button>
          <div></div>
          <p>
            Si quieres modificar tu forma de pago favor escríbenos a:
            growup@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserEditPlanes
