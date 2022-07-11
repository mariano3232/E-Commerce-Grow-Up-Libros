import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getWordComment } from '../../../actions'

const AdminSearchBarCommentWord = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getWordComment(input))
    setInput('')
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13){
        e.preventDefault();
        dispatch(getWordComment(input));
        setInput('');
    }
}

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Palabra'
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
        Buscar por Palabra
      </button>
    </div>
  )
}

export default AdminSearchBarCommentWord

