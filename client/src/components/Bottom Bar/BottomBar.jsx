import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/BottomBar.module.css'
import InfoIcon from '@mui/icons-material/Info'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import PaymentIcon from '@mui/icons-material/Payment'
import ShareIcon from '@mui/icons-material/Share'
import DraftsIcon from '@mui/icons-material/Drafts'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import mercado from '../../imgs/mercadoPago.webp'
import facebook from '../../imgs/facebook.png'
import instagram from '../../imgs/instagram.png'
import { getUsers, setUserNews } from '../../actions'
import { useAuth0, User } from '@auth0/auth0-react'
import { Images } from '../../assets'
import Alert from '../../functions/Alert'

import {
  Box,
  Stack,
  Typography,
  Input,
  Button,
  Grid,
  IconButton,
} from '@mui/material'

import { Instagram, Facebook, WhatsApp } from '@mui/icons-material'

export default function BottomBar() {
  const [input, setInput] = useState('')
  const { user, isAuthenticated, isLoading } = useAuth0()
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.users)
  const isLogged = useSelector((state) => state.userLogged)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const usuario = allUsers.filter((u) => u._id === isLogged[0]._id)
    console.log(usuario)
    /* if(isLogged.length === 0) {
      setInput('');
      return alert('Para suscribirte a nuestro newsletter necesitas estar logeado'); 
    } */
    if (usuario[0].isSubscribeNewsLetter === true) {
      setInput('')
      return Alert('Ya estas subscipto!!', 'email')
    }

    const id = [isLogged[0]._id]
    dispatch(setUserNews(id))
    Alert(
      `Gracias ${input} Suscripción exitosa a nuestro newsletters.`,
      'email'
    )
    setInput('')
    navigate('/user')
    setTimeout(function () {
      dispatch(getUsers())
    }, 1000)
  }

  return (
    <Grid
      alignItems={'center'}
      container
      spacing={2}
      columns={9}
      className={styles.container}
    >
      <Grid width={'100%'} xs={1} item>
        <Stack spacing={1} direction={'row'} alignItems={'center'}>
          <IconButton as={Link} to='/'>
            <img src={Images.logoBook} alt='logo' />
          </IconButton>
          <Stack spacing={1}>
            {/* <Typography color='white' fontSize={'24px'}>
              Grow-Up Libros
            </Typography> */}
            <Stack spacing={2} direction={'column'}>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Instagram sx={{ fontSize: '32px', color: 'white' }} />
              </a>
              <a
                href='https://www.facebook.com/'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Facebook sx={{ fontSize: '32px', color: 'white' }} />
              </a>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid width={'50%'} xs={2} item>
        <Stack 
          direction={'row'}
          spacing={1}
          alignItems={'flex-end'}
        >
          <img className={styles.imgEmail} src={Images.email} alt=''/>
          {isLogged.length === 0 ? (
            <Typography
            className={styles.newsLetter}
              sx={{
                textDecoration: 'inherit',
                color: 'white',
                fontSize: '18px',
              }}
            >
              Para suscribirse debes estar logeado
            </Typography>
          ) : (
            <Button
              sx={{ fontWeight: 'bold' }}
              onClick={handleSubmit}
              color='secondary'
            >
              Suscribete
            </Button>
          )}
        </Stack>
      </Grid>
      <Grid xs={2} item></Grid>
      <Grid xs={3} item>
        <Stack alignItems={'flex-start'}>
          <Stack as={Link} to='/aboutus' direction={'row'} alignItems='center'>
            <IconButton>
              <InfoIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography sx={{ textDecoration: 'inherit', color: 'white' }}>
              Sobre nosotros
            </Typography>
          </Stack>
          <Stack as={Link} to='/faq' direction={'row'} alignItems='center'>
            <IconButton>
              <LiveHelpIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography sx={{ textDecoration: 'inherit', color: 'white' }}>
              Preguntas frecuentes
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      {/* <Grid item xs={1}>
        <img style={{ maxWidth: '50%' }} src={mercado} alt='mercadopago-logo' />
      </Grid> */}
      
    </Grid>
  )
}

{
  /* <Input
  type='text'
  placeholder='Email'
  value={input}
  onChange={(e) => handleChange(e)}
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
/> */
}
