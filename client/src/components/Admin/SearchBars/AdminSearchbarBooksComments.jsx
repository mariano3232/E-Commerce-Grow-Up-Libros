import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getBookNameComment } from '../../../actions'

const AdminSearchBarBooksComment = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getBookNameComment(input))
    setInput('')
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13){
        e.preventDefault();
        dispatch(getBookNameComment(input));
        setInput('');
    }
}

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Libro'
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
        Buscar Por Libro
      </button>
    </div>
  )
}

export default AdminSearchBarBooksComment
