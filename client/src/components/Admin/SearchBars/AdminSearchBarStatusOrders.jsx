import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getStatusOrders } from '../../../actions'

export default function AdminSearchBarStatusOrders(){
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getStatusOrders(input))
    scroller.scrollTo('gaston')
    setInput('')
  }

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Estado de orden'
        value={input}
        onChange={(e) => handleChange(e)}
        className={styles.input}
      />
      <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className={styles.button}
      >
        Buscar
      </button>
    </div>
  )
}


