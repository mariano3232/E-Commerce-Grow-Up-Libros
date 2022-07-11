import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBookGenre, getBooks , changeGenreTitle } from '../actions'
import { scroller } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import LogInButton from './LogIn'
import LogOutButton from './LogOut'
import styles from '../Styles/nav.module.css'
import { Images } from '../assets'
import {
  Stack,
  Button,
  Typography,
  Select,
  IconButton,
  MenuItem,
  FormControl,
  AppBar,
  Toolbar,
} from '@mui/material'

const NavBar = () => {
  const [state, setState] = useState('default')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  const usuario = useSelector((state) => state.userLogged)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getBooks())
    dispatch(changeGenreTitle(''))
    navigate('/home/')
    setTimeout(() => {
      scroller.scrollTo('gaston')
    }, 200)
  }

  const handleSelectGenre = (e) => {
    e.preventDefault()
    dispatch(getBookGenre(e.target.value))
    dispatch(changeGenreTitle(e.target.value))
    navigate('/home/')
    setTimeout(() => {
      scroller.scrollTo('gaston')
    }, 150)
    setState('default')
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
    <AppBar position='sticky'>
      <Toolbar disableGutters>
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems='center'
          px={2}
        >
          <Stack
            spacing={2}
            color='white'
            direction={'row'}
            alignItems='center'
          >
            <IconButton as={Link} to='/'>
              <img width={64} src={Images.logoBook} alt='book' />
            </IconButton>
            <Typography variant='h5'>Grow Up-Libros</Typography>
          </Stack>
          <Link to='/home' className={styles.Link}>
            <Button
              color='secondary'
              className={styles.navItem}
              onClick={handleClick}
              sx={{
                fontSize: '18px',
              }}
            >
              Todos los libros
            </Button>
          </Link>

          <Link to='/home' className={styles.Link}>
            <Button
              color='secondary'
              className={styles.navItem}
              onClick={handleClick}
              sx={{
                fontSize: '18px',
              }}
            >
              Inicio
            </Button>
          </Link>

          <Link to='/author' className={styles.Link}>
            <Button
              color='secondary'
              className={styles.navItem}
              sx={{
                fontSize: '18px',
              }}
            >
              Autores
            </Button>
          </Link>

          <FormControl>
            <Select
              onChange={handleSelectGenre}
              defaultValue='default'
              value={state}
              MenuProps={{ disableScrollLock: true }}
              sx={{
                backgroundColor: 'white',

                '& .MuiSvgIcon-root': {
                  color: '#74c0fc',
                },
              }}
            >
              <MenuItem value='default' disabled>
                Generos:
              </MenuItem>
              {genres?.map((e) => (
                <MenuItem as='' key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SearchBar />

          {isAuthenticated ? <LogOutButton /> : <LogInButton />}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
