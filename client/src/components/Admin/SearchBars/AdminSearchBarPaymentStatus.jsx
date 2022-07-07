import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getPaymentStatus} from '../../../actions'

export default function AdminSearchBarPaymentStatus(){
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getPaymentStatus(input))
    scroller.scrollTo('gaston')
    setInput('')
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13){
        e.preventDefault();
        dispatch(getPaymentStatus(input));
        scroller.scrollTo("gaston");
        setInput('');
    }
}

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Estado de pago'
        value={input}
        onChange={(e) => handleChange(e)}
        className={styles.input}
        onKeyPress={(e) => handleKeyPress(e)}
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


