import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { addFav, getUsers } from '../actions'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Fav = ({ book }) => {

  const isLogged = useSelector((state) => state.userLogged);
  const [state, setState] = useState('disabled')

  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()

  const handleClick = () => {
    const id = isLogged[0]._id
    if (isLogged.length === 0) return loginWithRedirect()
    if (isLogged[0].favouritesBooks.includes(book)) return alert('Ya es un libro favorito');
    dispatch(addFav(book, id))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
    setState('secondary')
  }

  return (
    <div>
      <FavoriteIcon cursor='pointer' color={state} sx={{ fontSize: 40 }} onClick={() => handleClick()}/>
    </div>
  )
}

export default Fav
