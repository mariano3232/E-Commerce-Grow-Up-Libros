import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material'

export default function LogInButton() {
  const { loginWithRedirect } = useAuth0()

  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt='icon_profile' />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        keepMounted
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
      >
        <MenuItem onClick={() => loginWithRedirect()}>Iniciar Sesión</MenuItem>
      </Menu>
    </Box>
  )
}
/* onClick={() => loginWithRedirect()} */
