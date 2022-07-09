import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBookTitle } from '../actions'
import { scroller } from 'react-scroll'
import styles from '../Styles/searchBar.module.css'
import { Box, Input, Button, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchBar = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getBookTitle(input))
    navigate('/home/')
    scroller.scrollTo('gaston')
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault()
      dispatch(getBookTitle(input))
      navigate('/home/')
      scroller.scrollTo('gaston')
      setInput('')
    }
  }

  return (
    <Box display={'flex'} alignItems='center'>
      <Input
        type='text'
        placeholder='Título'
        value={input}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
        sx={{
          color: 'white',
          fontSize: '20px',
          '::placeholder': {
            color: 'white',
          },
          ':hover:not(.Mui-disabled):before': {
            borderColor: 'white',
          },
          ':before': {
            borderColor: 'white',
          },
          ':after': {
            borderColor: 'transparent',
          },
        }}
      />
      <IconButton onClick={(e) => handleSubmit(e)}>
        <Search sx={{ fontSize: '32px', color: 'white' }} />
      </IconButton>
    </Box>
  )
}

export default SearchBar
