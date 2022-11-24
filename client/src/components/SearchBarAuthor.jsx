import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBookTitleAdmin } from '../actions'
import styles from '../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getAuthorName } from '../actions'
import { Box, Input, Button, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchBarAuthor = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getAuthorName(input))
    scroller.scrollTo('gaston')
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault()
      dispatch(getAuthorName(input))
      scroller.scrollTo('gaston')
      setInput('')
    }
  }

  return (
    <Box display={'flex'} alignItems='center'>
      <Input
        type='text'
        placeholder='Nombre de autor'
        value={input}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
        sx={{
          color: 'rgba(27, 163, 168)',
          fontSize: '20px',
          '::placeholder': {
            color: 'rgba(27, 163, 168)',
          },
          ':hover:not(.Mui-disabled):before': {
            borderColor: 'rgba(27, 163, 168)',
          },
          ':before': {
            borderColor: 'rgba(27, 163, 168)',
          },
          ':after': {
            borderColor: 'transparent',
          },
        }}
      />

      <IconButton onClick={(e) => handleSubmit(e)}>
        <Search sx={{ fontSize: '32px', color: 'rgba(27, 163, 168)' }} />
      </IconButton>
    </Box>
  )
}

export default SearchBarAuthor
