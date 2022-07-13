import React, { useState } from 'react'
import styles from '../Styles/CardBook.module.css'
import { Link } from 'react-router-dom'
import Fav from './Fav'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, purchaseOrder, putRating, updateAmount } from '../actions'
import { Rating } from '@mui/material'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Alert from '../functions/Alert'
import Cart from './Cart'

export default function CardBook({ title, cover, price, rating, id, stock }) {
  const dispatch = useDispatch()
  const { userLogged } = useSelector((state) => state)
  console.log('usuarioLogueado:', userLogged)
  const productsAmount = useSelector((state) => state.cartAmount)
  const products = useSelector((state) => state.cart)
  const myFavsBooks = useSelector((state) => state.userLoggedFavsBooksShowed)
  const myFavsBooksIds = myFavsBooks.map((book) => book._id)
  const algo = products.filter((e) => e.title === title)

  const { loginWithRedirect } = useAuth0()

  //const [ifRating, setIfRating] = useState();
  const ifRating = changeRating(id)
  const isBuy = changeBuy(id)

  function changeBuy(id) {
    if (userLogged.length > 0 && userLogged[0].buyBooks.length > 0) {
      let result = userLogged[0].buyBooks.indexOf(id)
      if (result === -1) {
        return false
      } else {
        return true
      }
    }
    if (userLogged.length === 0) {
      return false
    }
  }

  function changeRating(id) {
    if (userLogged.length > 0 && userLogged[0].ratingBooks.length > 0) {
      let result = userLogged[0].ratingBooks.indexOf(id)
      if (result === -1) {
        return false
      } else {
        return true
      }
    }
    if (userLogged.length === 0) {
      return true
    }
  }

  function handleRating(event, value) {
    dispatch(putRating(id, value, userLogged[0]._id))
  }

  function handleAddToCart(e) {
    e.preventDefault()
    if (userLogged.length === 0) return loginWithRedirect()
    if (algo.length) return alert('ya esta agregado')
    console.log('algo2', algo)
    dispatch(addToCart(id))
    dispatch(updateAmount(productsAmount + 1))
    Alert('Libro agregado al carrito!', 'cart')
    setTimeout(function () {
      dispatch(
        purchaseOrder({
          email: userLogged[0].email,
          name: userLogged[0].name,
          title: products[products.length - 1].title,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].amount,
        })
      )
    }, 500)
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Link to={'/book/' + id}>
          <img
            className={styles.img}
            src={cover}
            alt='Not Found ):'
            width='200x'
            height='300'
          />
        </Link>
        {userLogged ? (
          <span
            className={
              isBuy ? styles.comprado + ' ' + styles.show : styles.comprado
            }
          >
            COMPRADO
          </span>
        ) : (
          <span
            className={
              isBuy ? styles.comprado + ' ' + styles.show : styles.comprado
            }
          >
            NOOOO
          </span>
        )}
      </div>
      <div className={styles.block}>
        <div className={styles.info}>
          <div className={styles.containerRating}>
            <span>
              <Fav
                book={id}
                painted={`${
                  myFavsBooksIds.includes(id) ? 'secondary' : 'disabled'
                }`}
              />
            </span>
            <p className={styles.price}>${price}</p>
          </div>

          <div>
            <Cart title={title} stock={stock} id={id} />

            {/* {stock > 1 ? (
              <AddShoppingCartIcon
                cursor='pointer'
                color='action'
                fontSize='large'
                onClick={(e) => handleAddToCart(e)}
              />
            ) : (
              ''
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

/* 
<button
                className={styles.button}
                onClick={(e) => handleAddToCart(e)}
              >
                Añadir al carrito
              </button>
*/
