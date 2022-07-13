import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CardPremium from './CardPremium'
import styles from '../Styles/UserSuscripcion.module.css'
const UserSuscripcion = () => {
  const [state, setState] = useState({
    mensual: '$599,99 / mes',
    trimestral: '',
    anual: '',
  })

  const handleChangeMonth = () => {
    setState({
      mensual: '$599,99 / mes',
    })
  }

  const handleChangeThreMonth = () => {
    setState({
      trimestral: '$999,99 / trimestral',
    })
  }

  const handleChangeYear = () => {
    setState({
      anual: '$1.599,99 / anual',
    })
  }

  return (
    <div className={styles.containerUserSuscription}>
      <h1 className={styles.titleUserSuscription}>
        Una suscripcion sin igual para potenciar tu desarrollo personal al
        máximo.
      </h1>

      <h3 className={styles.frasepromocional}>
        Mejora tu futuro con las herramientas que te ofrece Soy Premium.
      </h3>

      <h4>
        Vas a tener la gran oportunidad de alcanzar nuestra plan "Soy Premium"
        al llegar a tu compra numero 10 de nuestros libros de desarrollo
        personal y comenzaras a tener multiples beneficios.
      </h4>
      <h4>
        Queremos ofrecerte muchas herramientas para que alcances tus más altos
        niveles y seas una persona nivel top.
      </h4>
      <h4>No dejes pasar esta oportunidad de convertirte en Premium.</h4>
      <h4>Con Soy Premium vas a contar con:</h4>
      <ol>
        <li>Envio de podcast y notas de interes.</li>
        <li>Reseñas de textos selecionadas.</li>
        <li>
          Nuestras opiniones de las ultimas herramientas de productividad.
        </li>
        <li>Novedades de los ultimos libros de desarrollo personal.</li>
        <li>Resumen de tus libros favoritos.</li>
      </ol>

      <p>
        Al momento de tu compra número diez vas a estar recibiendo un mail con
        nuestras felicitaciones y dandote la bienvenida, y a partir de ese
        momento comenzarás a recibir todos los beneficios.
      </p>

      <p>Éxitos en tu Crecimiento Personal !! Equipo de Grow-Up Libros.</p>

      {/* <div className={styles.containerCards}>
        <CardPremium mes={'$599,99 / mes'} />
        <CardPremium trimestral={'$999,99 / trimestral'} />
        <CardPremium anual={'$1.599,99 / anual'} />
      </div> */}
    </div>
  )
}

export default UserSuscripcion
