import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

export default function GenerosTitle() {
  const generoTitle = useSelector((state) => state.generosTitle)

  return (
    <div>
      <Typography
        sx={{
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          marginTop: '24px',
        }}
      >
        {generoTitle}
      </Typography>
    </div>
  )
}
