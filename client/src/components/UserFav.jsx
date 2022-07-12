import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  addToCart,
  deleteBookFav,
  getUsers,
  orderByStockAdminBooks,
  purchaseOrder,
  updateAmount,
} from '../actions'
import style from '../Styles/userFav.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Alert from '../functions/Alert'

const UserFav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allUsers = useSelector((state) => state.users)
  //console.log('allUsers:',allUsers)

  const users = useSelector((state) => state.userLogged)
  //console.log('userLogged:',users)

  const userId = allUsers.filter((u) => u._id === users[0]._id)
  //console.log('userId:',userId)

  const userFavBooksShowed = useSelector(
    (state) => state.userLoggedFavsBooksShowed
  )
  //console.log('favEstadto:',userFavBooksShowed)

  const products = useSelector((state) => state.cart)
  const productsAmount = useSelector((state) => state.cartAmount)

  const handleDeleteFav = (book) => {
    const id = users[0]._id
    dispatch(deleteBookFav(book, id))
    Alert('Libro Favorito Eliminado', 'fav')
    //navigate('/user')
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function handleAddToCart(e) {
    e.preventDefault()
    if (users.length === 0) return loginWithRedirect()
    dispatch(addToCart(e.target.id))
    dispatch(updateAmount(productsAmount + 1))
    Alert('Libro agregado al carrito!', 'cart')
    setTimeout(function () {
      dispatch(
        purchaseOrder({
          email: users[0].email,
          name: users[0].name,
          title: products[products.length - 1].title,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].amount,
        })
      )
    }, 200)
  }

  return (
    <div className={style.containerFavouritesBooks}>
      <h1 className={style.titleFavouritesBooks}>Mis libros favoritos:</h1>

      <ol className={style.containerGridBooks}>
        {userFavBooksShowed?.map((book) => (
          <li className={style.itemBook}>
            <p className={style.titleBook}>{book.title}</p>
            <Link to={'/book/' + book._id}>
              <img className={style.imgBook} src={book.cover} alt='buscando' />
            </Link>
            {book.stock > 1 ? (
              <AddShoppingCartIcon
                cursor='pointer'
                color='action'
                fontSize='large'
                id={book._id}
                onClick={(e) => handleAddToCart(e)}
              />
            ) : (
              ''
            )}
            <button
              className={style.button}
              onClick={() => handleDeleteFav(book._id)}
            >
              X
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default UserFav

//---
/*
return (
  <div className={style.containerFavouritesBooks}>
    <h1 className={style.titleFavouritesBooks}>Mis libros favoritos:</h1>

    <ol className={style.containerGridBooks}>
      {userId[0].favouritesBooks?.map((book) => (
        <li className={style.itemBook}>
          <p className={style.titleBook}>{book.title}</p>
          <Link to={'/book/' + book._id}>
            <img className={style.imgBook} src={book.cover} alt='buscando' />
          </Link>
          {
            book.stock > 1 ?
            <button value={book._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button> : ''
          }
          <button
            className={style.button}
            onClick={() => handleDeleteFav(book._id)}
          >
            X
          </button>
        </li>
      ))}
    </ol>
  </div>
)
}
*/

/* 
<button value={book._id} onClick={(e) => handleAddToCart(e)}>
                Añadir al carrito
              </button>
*/
