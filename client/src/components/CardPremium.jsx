import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, setUserPlan } from '../actions'
import style from '../Styles/cardPremium.module.css'
import Alert from '../functions/Alert'

const CardPremium = ({ mes, trimestral, anual }) => {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.users)
  const logged = useSelector((state) => state.userLogged)
  const userId = allUsers.filter((u) => u._id === logged[0]._id)

  const handleSubmit = () => {
    const id = [logged[0]._id]
    dispatch(setUserPlan(id))
    Alert('Felicidades ya sos Premium', 'success')
    setTimeout(function () {
      dispatch(getUsers()), 100
    })
  }

  return (
    <div
      className={mes ? style.container : trimestral ? style.gas : style.gaston}
    >
      <h3>Plan: Soy Premium</h3>

      <p>Herramientas para empezar a potencial tu desarrollo al máximo</p>

      <h1>
        Ars {mes} {trimestral} {anual}
      </h1>
      {mes ? (
        <ol>
          <li>Envio de podcast de interes</li>
          <li>Envio de notas de interes</li>
        </ol>
      ) : trimestral ? (
        <ol>
          <li>Envio de podcast de interes</li>
          <li>Envio de notas de interes</li>
          <li>Opiniones de las ultimas herramientas de productividad</li>
          <li>Reseñas de textos selecionadas</li>
        </ol>
      ) : anual ? (
        <ol>
          <li>Envio de podcast de interes</li>
          <li>Envio de notas de interes</li>
          <li>Opiniones de las ultimas herramientas de productividad</li>
          <li>Reseñas de textos selecionadas</li>
          <li>Resumen de tus libros favoritos</li>
          <li>Novedades de los ultimos libros de desarrollo personal</li>
        </ol>
      ) : (
        ''
      )}

      <br />

      {userId[0].isPremiun === false ? (
        <button className={style.button} onClick={() => handleSubmit()}>
          Lo quiero
        </button>
      ) : (
        <button disabled>Lo quiero</button>
      )}
    </div>
  )
}

export default CardPremium
