import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0, User } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { postUser } from '../actions'
import { useSelector } from 'react-redux'
import styles from '../Styles/UserPerfil.module.css'
import s from '../Styles/Home.module.css'
import UserDatos from './UserDatos'
import UserPlanLectura from './UserPlanLectura'
import UserSuscripcion from './UserSuscripcion'
import UserHistory from './UserHistory'
import UserFav from './UserFav'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import style from '../Styles/bookDetails.module.css'
import UserEditDatos from './UserEditDatos'
import UserEditPlanes from './UserEditPlanes'
import { animateScroll as scroll } from 'react-scroll'
import { Button } from '@mui/material'
import UserSeguimientoOrden from './UserSeguimientoOrden'

const UserPerfil = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useAuth0()
  const usuarios = useSelector((state) => state.users)
  //const usuario = usuarios.filter((u) => u.email === user.email);
  const [component, setComponent] = useState('')
  const productsAmount = useSelector((state) => state.cartAmount)
  const isLogged = useSelector((state) => state.userLogged)

  const userFavBooksShowed = useSelector(
    (state) => state.userLoggedFavsBooksShowed
  )

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  const handleInput = (e) => {
    e.preventDefault()
    const name = e.target.name
    if (name === 'userData') setComponent(<UserDatos />)
    if (name === 'userEditData') setComponent(<UserEditDatos />)
    if (name === 'userSubscripcion') setComponent(<UserSuscripcion />)
    if (name === 'userEditPlan') setComponent(<UserEditPlanes />)
    if (name === 'userPlanLectura') setComponent(<UserPlanLectura />)
    if (name === 'userFav') setComponent(<UserFav />)
    if (name === 'userSeguimientoOrden') setComponent(<UserSeguimientoOrden />)
    if (name === 'userHistory') setComponent(<UserHistory />)
  }

  return (
    <div className={styles.containerUserPerfil}>
      {isAuthenticated && (
        <div className={styles.containerTitle}>
          <h1 className={styles.titlePerfil}>Bienvenido:</h1>
          <h3 className={styles.nicknamePerfil}>
            {user.name} {user.surname}
          </h3>
        </div>
      )}
      <Link to='/cart'>
        <div className={s.containerCart}>
          <BsCart className={s.cart} />
          <div className={s.productsAmount}>
            <p className={s.productsAmountNumber}>{productsAmount}</p>
          </div>
        </div>
      </Link>

      <Link to='/user'>
        <div className={s.containerHeart}>
          <BsHeart className={s.heart} />
          {isLogged.length ? (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>
                {userFavBooksShowed.length}
              </p>
            </div>
          ) : (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{0}</p>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.containerUserGrid}>
        <div className={styles.containerButtons}>
          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            name='userData'
            onClick={handleInput}
          >
            Datos personales
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            name='userEditData'
            onClick={handleInput}
          >
            Editar Datos personales
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userSubscripcion'
          >
            Plan Soy Premium
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userEditPlan'
          >
            Editar Suscripcion
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userFav'
          >
            Libros deseados
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userPlanLectura'
          >
            Plan de lectura
          </Button>
        
          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userSeguimientoOrden'
          >
            Seguimiento de compra
          </Button>

          <Button
            sx={{ fontWeight: 'bold' }}
            className={styles.button}
            onClick={handleInput}
            name='userHistory'
          >
            Historial de compras
          </Button>
        </div>
        <div className={styles.containerSection}>{component}</div>
      </div>
    </div>
  )
}

export default UserPerfil

// export default function Profile(){

//     const{ user , isAuthenticated , isLoading} = useAuth0()

//     if(isLoading){
//         return <div>Cargando...</div>
//     }

//     return (
//         isAuthenticated && (
//             <div>
//                  {JSON.stringify(user)}

//                 {/* <img src={user.picture} alt={user.name}/>
//                 <h2>{user.name}</h2>
//                 <p>Email: {user.email}</p> */}
//             </div>
//         )
//     )
// }

// {"nickname":"guillermobr88",
// "name":"guillermobr88@gmail.com",
// "picture":"https://s.gravatar.com/avatar/13aa6d5b3b0c99cc535fed7a2abf7d87?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgu.png",
// "updated_at":"2022-06-27T18:15:56.384Z",
// "email":"guillermobr88@gmail.com",
// "email_verified":true,
// "sub":"auth0|62b829304dd722e042fa9e14"}
