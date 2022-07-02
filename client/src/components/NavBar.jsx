import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBookGenre, getBooks } from '../actions'
import { scroller } from 'react-scroll'
import LogInButton from './LogIn'
import LogOutButton from './LogOut'
import { useAuth0 } from '@auth0/auth0-react'
import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'

const StyledSelect = styled(Select)({
  ':hover:not(.Mui-disabled)::before': {
    borderColor: 'red',
  },
  '&:before': {
    borderColor: 'white',
  },
  '&:before &:hover': {
    borderColor: 'red',
  },
})

const NavBar = () => {
  const [state, setState] = useState('default')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getBooks())
    navigate('/home/')
    scroller.scrollTo('gaston')
    setState('default')
  }

  const handleSelectGenre = (e) => {
    e.preventDefault()
    dispatch(getBookGenre(e.target.value))
    navigate('/home/')
    scroller.scrollTo('gaston')
    setState(e.target.value)
  }

  /* Styles Select */

  const genres = [
    'Salud',
    'Deportes',
    'Biografia',
    'Nutricion',
    'Filosofia',
    'Ensayo',
    'Desarrollo Personal',
    'Economia',
    'Espiritualidad',
    'Historia',
    'Negocios',
    'Psicologia',
    'Neurociencia',
  ]

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: '#8D6A9F',
        }}
      >
        <Typography variant='h5'>PG-11 Books</Typography>

        <NavLink style={{ textDecoration: 'none' }} to='/home'>
          <Button
            sx={{ color: 'white', fontSize: '16px' }}
            variant='text'
            onClick={handleClick}
          >
            Todos los libros
          </Button>
        </NavLink>

        <NavLink style={{ textDecoration: 'none' }} to='/home'>
          <Button
            sx={{ color: 'white', fontSize: '16px', textDecoration: 0 }}
            variant='text'
          >
            Inicio
          </Button>
        </NavLink>

        <div>
          <NavLink style={{ textDecoration: 'none' }} to='/author'>
            <Button sx={{ color: 'white', fontSize: '16px' }} variant='text'>
              Autores
            </Button>
          </NavLink>
        </div>

        <div>
          <FormControl
            color='secondary'
            variant='filled'
            sx={{ m: 1, minWidth: 200 }}
          >
            <InputLabel id='select-genero'>Genero</InputLabel>
            <StyledSelect
              labelId='select-genero'
              onChange={(e) => handleSelectGenre(e)}
            >
              <MenuItem value=''>
                <em>Generos:</em>
              </MenuItem>
              {genres.map((genre) => (
                <MenuItem value={genre} key={genre}>
                  {genre}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </div>
        <SearchBar />

        <NavLink style={{ textDecoration: 'none' }} to='/user'>
          <Typography variant='h5'>Mi cuenta</Typography>
        </NavLink>

        {/* <Link to='/user'><h3 >Login</h3></Link> */}

        {isAuthenticated ? <LogOutButton /> : <LogInButton />}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
