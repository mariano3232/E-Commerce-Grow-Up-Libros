
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getBookGenre, getBooks , changeGenreTitle } from '../actions'
import { scroller } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'
import SearchBar from './SearchBar'
import LogInButton from './LogIn'
import LogOutButton from './LogOut'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';



import styles from '../Styles/nav.module.css'
import { TornadoSharp } from '@mui/icons-material'
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavBar() {

  const [state, setState] = useState('default')  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  const usuario = useSelector((state) => state.userLogged)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getBooks())
    dispatch(changeGenreTitle(''))
    setAnchorElNav(null)
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Stack  justifyContent={'space-between'} direction={'row'} width='100%'>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {/* Burger */}
                <Link to='/home' className={styles.Link}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Inicio</Typography>
                    </MenuItem>
                </Link>
                <MenuItem key={TornadoSharp} onClick={handleClick}>
                  <Typography textAlign="center">Todos los libros</Typography>
                </MenuItem>
                <Link to='/author' className={styles.Link}>
                    <MenuItem key={TornadoSharp} onClick={handleClick}>
                        <Typography textAlign="center">Autores</Typography>
                    </MenuItem>
                </Link>
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
            </Menu>
            {isAuthenticated ? <LogOutButton/> : <LogInButton/>}
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Stack
          width='100%'
          direction={'row'}
          alignItems='center'
          justifyContent={'space-between'}
          >
                <MenuItem key={TornadoSharp} onClick={handleCloseNavMenu}>
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
                </MenuItem>
                <MenuItem>
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
                </MenuItem>
                <MenuItem>
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
                </MenuItem>
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
            <SearchBar />
            {isAuthenticated ? <LogOutButton/> : <LogInButton/>}
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  );
}
