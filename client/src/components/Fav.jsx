import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { addFav, getUsers } from '../actions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Alert from '../functions/Alert'

const Fav = ({ book, painted }) => {
  console.log('painted<:', painted)

  const isLogged = useSelector((state) => state.userLogged)

  const uBooksFav = useSelector((state) => state.userLoggedFavsBooksShowed)

  const bookAdded = uBooksFav.filter((e) => e._id === book)

  // const [state, setState] = useState('disabled')

  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()

  const handleClick = () => {
    if (isLogged.length === 0) return loginWithRedirect()
    if (bookAdded.length) return Alert('Ya es un libro favorito', 'fav')
    const id = isLogged[0]._id
    dispatch(addFav(book, id))
    Alert('Libro agregado a favoritos', 'fav')
    dispatch(getUsers())
    // setState('secondary')
  }

  return (
    <div>
      <FavoriteIcon
        cursor='pointer'
        color={painted}
        sx={{ fontSize: 40 }}
        onClick={() => handleClick()}
      />
    </div>
  )
}

export default Fav
