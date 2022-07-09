import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
export default function LogOutButton() {
  const { logout } = useAuth0()
  const user = useSelector((state) => state.userLogged)[0]
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={user?.nickname}
          src={user?.picture}
        />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
      >
        {!user?.isBanned ? (
          <MenuItem onClick={handleCloseUserMenu} as={Link} to='/user'>
            <Typography color='#212529' textAlign={'center'}>
              Mi cuenta
            </Typography>
          </MenuItem>
        ) : (
          ''
        )}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography color='#212529' textAlign={'center'}>
            Mis compras
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography color='#212529' textAlign={'center'}>
            Libros favoritos
          </Typography>
        </MenuItem>
        <Divider />
        {user?.isAdmin && !user.isBanned ? (
          <MenuItem onClick={handleCloseUserMenu} as={Link} to='/admin'>
            <Typography color='#212529' textAlign={'center'}>
              Administrador
            </Typography>
          </MenuItem>
        ) : (
          ''
        )}
        {user?.isSuperAdmin && !user.isBanned ? (
          <MenuItem onClick={handleCloseUserMenu} as={Link} to='/adminpro'>
            <Typography color='#212529' textAlign={'center'}>
              Super Administrador
            </Typography>
          </MenuItem>
        ) : (
          ''
        )}
        <Divider />
        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
          <Typography color='#212529' textAlign={'center'}>
            Cerrar Sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
