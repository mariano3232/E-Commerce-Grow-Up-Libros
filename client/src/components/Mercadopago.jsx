import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Stack, Grid, Button, Container } from '@mui/material'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Images } from '../assets'

import { Link } from 'react-router-dom'

const Mercadopago = () => {
  const [successInfo, setSucessInfo] = useState(null)
  const url = window.location.href.split('?')[1]

  useEffect(() => {
    axios
      .get(`https://ecommercehenryx.herokuapp.com/mercadopago/success?${url}`)
      .then((res) => setSucessInfo(res.data))
  }, [])

  console.log(successInfo)

  return (
    <div>
      {successInfo ? (
        <Box>
          <Container
            sx={{
              padding: '20px 10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            maxWidth='md'
          >
            <Stack
              justifyContent={'space-between'}
              direction={'row'}
              alignItems='center'
              spacing={2}
            >
              <Typography fontSize={'24px'} variant='h4'>
                Compra exitosa
              </Typography>
              <BsFillCheckCircleFill fontSize={'32'} color='#66d9e8' />
            </Stack>
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems={'center'}
              sx={{ padding: '12px 0', width: '100%' }}
            >
              <Stack>
                <Typography variant='h4'>Grow-Up Libros</Typography>
                <Typography variant='p'>Av. No se donde</Typography>
              </Stack>
              <img
                src={Images.logoBook}
                alt='logo-book'
                style={{ maxWidth: '100%' }}
              />
            </Stack>
            <Grid container columns={3}>
              <Grid width={'100%'} xs={1} item>
                <Stack>
                  <Typography fontWeight={'bold'} variant='h6'>
                    Facturar A
                  </Typography>

                  <Typography variant='p'>
                    Nombre: {successInfo.usuario[0].name}{' '}
                    {successInfo.usuario[0].surname}
                  </Typography>

                  <Typography variant='p'>
                    Nickname: {successInfo.usuario[0].nickname}
                  </Typography>
                  <Typography variant='p'>
                    Correo: {successInfo.usuario[0].email}
                  </Typography>
                  <Typography variant='p'>
                    Telefono: {successInfo.usuario[0].phone}
                  </Typography>
                </Stack>
              </Grid>
              <Grid width={'100%'} xs={1} item>
                <Stack>
                  <Typography fontWeight={'bold'} variant='h6'>
                    ENVIAR A
                  </Typography>
                  <Typography variant='p'>
                    Dirección: {successInfo.usuario[0].address} -{' '}
                    {successInfo.usuario[0].ciudad} -{' '}
                    {successInfo.usuario[0].country}
                  </Typography>
                </Stack>
              </Grid>
              <Grid width={'100%'} xs={1} item>
                <Stack spacing={2}>
                  <Stack>
                    <Typography fontWeight={'bold'} variant='h6'>
                      N° DE FACTURA
                    </Typography>
                    <Typography variant='p'>{successInfo._id}</Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={'bold'} variant='h6'>
                      FECHA
                    </Typography>
                    <Typography variant='p'>{successInfo.fecha}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid sx={{ padding: '10px 0' }} container columns={2}>
              <Grid item xs={1}>
                <Typography
                  fontWeight={'bold'}
                  sx={{
                    color: 'white',
                    backgroundColor: '#12b886',
                    padding: '2px 6px',
                  }}
                >
                  Cantidad
                </Typography>
                {successInfo.libros.map((lb) => (
                  <Typography>{lb.cantidad}</Typography>
                ))}
              </Grid>
              <Grid item xs={1}>
                <Typography
                  fontWeight={'bold'}
                  sx={{
                    color: 'white',
                    backgroundColor: '#12b886',
                    padding: '2px 6px',
                  }}
                >
                  Libro
                </Typography>
                {successInfo.libros.map((lb) => (
                  <Typography>{lb.title}</Typography>
                ))}
                <Typography
                  fontWeight={'bold'}
                  sx={{
                    color: 'white',
                    backgroundColor: '#12b886',
                    padding: '2px 6px',
                  }}
                >
                  Total: ${successInfo.total}
                </Typography>
              </Grid>
            </Grid>
            <Button
              as={Link}
              to='/'
              sx={{
                backgroundColor: '#66d9e8',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 6px',
                ':hover': {
                  backgroundColor: '#66d9e8',
                },
                marginTop: '20px',
                textDecoration: 'none',
              }}
            >
              Volver a inicio
            </Button>
          </Container>
        </Box>
      ) : null}
    </div>
  )
}

export default Mercadopago

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
