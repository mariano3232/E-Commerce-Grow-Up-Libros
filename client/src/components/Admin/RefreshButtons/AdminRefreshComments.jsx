import React from 'react'
import { useDispatch } from 'react-redux'
import { getComments } from '../../../actions'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/Button.module.css'
export default function AdminRefreshComments() {
  const dispatch = useDispatch()

  const handleClickComments = (e) => {
    e.preventDefault()
    dispatch(getComments())
  }

  return (
    <div>
     
        <button className={styles.button} onClick={handleClickComments}>
          Todos los Comentarios
        </button>
      
    </div>
  )
}
