import React, { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import styles from '../../Styles/FAQ.module.css'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function FAQ() {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Stack alignItems='center' p={2}>
      <Box width={{ xs: '100%', md: '50%' }}>
        <Typography variant='h4' fontWeight={'bold'}>
          Preguntas frecuentes
        </Typography>
        <p className={styles.subtitle}>
          <strong>Acerca de Grow-Up Libros</strong>
        </p>
        <div>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: 'white',
                  }}
                />
              }
              sx={{
                backgroundColor: '#3bc9db',
                color: 'white',
              }}
            >
              <Typography fontWeight={'bold'}>
                ¿Qué beneficios tengo por ser miembro de Grow-Up Libros?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Por ser miembro de Grow-Up Libros vas a poder reseñar y puntuar
                libros, y marcar libros como favoritos para cuando te decidas a
                comprarlos. Además, completando tu perfil vas a poder ver tus
                libros comprados y todo relacionadas con tus gustos e intereses.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: 'white',
                  }}
                />
              }
              aria-controls='panel2bh-content'
              id='panel2bh-header'
              sx={{
                backgroundColor: '#3bc9db',
                color: 'white',
              }}
            >
              <Typography fontWeight={'bold'}>
                ¿Cómo hago para ser miembro de Grow-Up Libros?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                ¡Es muy simple! Registrándote ya sos miembro de Grow-Up Libros.
                Sólo vas a necesitar ingresar tu nombre y apellido, tu mail y
                una clave. ¡Registrarse es totalmente gratuito!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: 'white',
                  }}
                />
              }
              aria-controls='panel3bh-content'
              id='panel3bh-header'
              sx={{
                backgroundColor: '#3bc9db',
                color: 'white',
              }}
            >
              <Typography fontWeight={'bold'}>
                ¿Cómo hago para darme de baja del newsletter?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunca vamos a querer que dejes de recibir los newsletters de
                Grow-Up Libros, pero si en algún momento querés dejar de
                hacerlo, vas a poder darlo de baja ingresando a: Mi cuenta -
                “Editar perfil” - “Recibir newletter” - SI / NO.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <p className={styles.subtitle}>
            <strong>Tienda</strong>
          </p>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: 'white',
                  }}
                />
              }
              aria-controls='panel4bh-content'
              id='panel4bh-header'
              sx={{
                backgroundColor: '#3bc9db',
                color: 'white',
              }}
            >
              <Typography fontWeight={'bold'}>
                ¿Cómo realizo una compra?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {' '}
                Si es tu primera compra, vas a necesitar registrarte completando
                tu mail, nombre, apellido, y contraseña. Si ya estás registrado,
                simplemente vas a tener que loguearte. Una vez que hayas
                agregado en el carrito los libros que te gustan, los pasos a
                seguir son los siguientes: Cliqueá en el botón Comprar. En el
                siguiente paso vas a poder elegir el Método de envío Completá el
                Domicilio de envío y los datos de facturación Por último,
                cliqueá en el botón Finalizar compra. Y listo. ¡Comprar en
                Grow-Up Libros es rápido e intuitivo, para que pueda empezar a
                leer tu libro preferido cuanto antes!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Stack>
  )
}
