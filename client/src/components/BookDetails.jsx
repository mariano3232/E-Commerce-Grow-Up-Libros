import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import axios from 'axios'

import {
  getBookDetails,
  getBookGenre,
  clearPageBookDetails,
  addToCart,
  addFav,
  getUsers,
  updateAmount,
  purchaseOrder,
  getBookComments,
  clearComments,
  changeGenreTitle,
  putRating,
} from '../actions'

import { Link } from 'react-router-dom'
import styles from '../Styles/bookDetails.module.css'
import s from '../Styles/Home.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Fav from './Fav'
import Alert from '../functions/Alert'
import Cart from './Cart'
import { Avatar, Rating } from '@mui/material'

export default function BookDetails() {
  const id = useParams().id
  const book = useSelector((state) => state.bookDetails)
  const comments = useSelector((state) => state.comments)
  const { userLogged } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsAmount = useSelector((state) => state.cartAmount)
  const isLogged = useSelector((state) => state.userLogged)
  const products = useSelector((state) => state.cart)
  const { loginWithRedirect } = useAuth0()
  const [render, setRender] = useState(0)
  const usuario = useSelector((state) => state.userLogged)
  const ifRating = changeRating(id)

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
    dispatch(getBookDetails(id))
  }

  const uBooksFav = useSelector((state) => state.userLoggedFavsBooksShowed)
  //console.log('uBooksFavs:',uBooksFav)

  //const bookAdded = uBooksFav.filter((e) => e._id === id)
  const bookAdded = uBooksFav.map((book) => book._id)
  // console.log('bookAdded:,',bookAdded)

  const [comment, setComment] = useState({
    comment: '',
    nickname: '',
    title: '',
  })

  useEffect(() => {
    dispatch(getBookDetails(id))
    dispatch(getBookComments(id))
    scroll.scrollToTop()
  }, [dispatch])

  function handleClick(event, e) {
    event.preventDefault()
    dispatch(getBookGenre(e))
    dispatch(changeGenreTitle(e))
    navigate('/home')
    scroller.scrollTo('gaston')
  }
  function handleAddToCart(e) {
    e.preventDefault()
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(id))
    dispatch(updateAmount(productsAmount + 1))
    setTimeout(function () {
      dispatch(
        purchaseOrder({
          email: isLogged[0].email,
          name: isLogged[0].name,
          title: products[products.length - 1].title,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].amount,
        })
      )
    }, 500)
  }

  useEffect(() => {
    return () => {
      dispatch(clearPageBookDetails())
      dispatch(clearComments())
    }
  }, [])

  /* const handleClickFav = () => {
   
    if (isLogged.length === 0) return loginWithRedirect()
    if (bookAdded.length) return alert('Ya es un libro favorito');
     const iduser = isLogged[0]._id
    dispatch(addFav(id, iduser))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
  } */

  function handleChange(e) {
    e.preventDefault()
    setComment({
      comment: e.target.value,
      nickname: usuario[0].nickname,
      title: book.title,
    })
  }
  function handlePost(e) {
    if (isLogged.length === 0) {
      loginWithRedirect()
    } else {
      axios
        .post(
          'https://ecommercehenryx.herokuapp.com/comments/addComment',
          comment
        )
        .then((response) => {
          console.log('axios response', response)
        })
        .then(() => {
          setTimeout(function () {
            dispatch(getBookComments(id)), 500
          })
        })
      setComment({
        comment: '',
        nickname: '',
        title: '',
      })
    }
  }

  function handleDelete(e) {
    e.preventDefault()
    axios
      .delete(
        'https://ecommercehenryx.herokuapp.com/comments/deleteComment/' +
          e.target.value
      )
      .then(() => {
        setTimeout(function () {
          dispatch(getBookComments(id)), 500
        })
      })
  }

  const author = book.authors

  const hola = () => {
    loginWithRedirect()
  }

  return (
    <div className={styles.main_container}>
      <Link to='/cart'>
        <div className={s.containerCart}>
          <BsCart className={s.cart} />
          <div className={s.productsAmount}>
            <p className={s.productsAmountNumber}>{productsAmount}</p>
          </div>
        </div>
      </Link>

      <Link to='/user'>
        <div className={s.containerHeart}>
          <BsHeart className={s.heart} />
          {isLogged.length ? (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{uBooksFav.length}</p>
            </div>
          ) : (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{0}</p>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.containerBookDetails}>
        <div className={styles.bookInfo}>
          <div className={styles.containerBookImage}>
            <img src={book?.cover} alt='book-cover' />
          </div>
          <div className={styles.containerBookData}>
            <h1 className={styles.titleBook}>{book?.title}</h1>
            <div className={styles.containerRating_Genero}>
              <div className={styles.containerRating}>
                <span className={styles.numberRating}>{book?.rating}</span>
                {ifRating ? (
                  <Rating
                    name='half-rating'
                    value={Number(book?.rating)}
                    precision={0.5}
                    onChange={(event, value) => handleRating(event, value)}
                    readOnly
                  />
                ) : (
                  <Rating
                    name='half-rating'
                    value={rating}
                    precision={0.5}
                    onChange={(event, value) => handleRating(event, value)}
                  />
                )}
              </div>
              <span className={styles.span}>|</span>
              <div className={styles.containerBookGeneros}>
                <div className={styles.containerGenerosBtn}>
                  {book?.genres?.map((e) => {
                    return (
                      <button onClick={(event) => handleClick(event, e.genre)}>
                        {e.genre}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.containerPriceBook}>
              <h3>${book?.price}.00</h3>
            </div>
            <div className={styles.containerAuthor}>
              <NavLink to={`/author/${book?.authors?._id}`}>
                <h3>
                  {book?.authors?.name} {book?.authors?.surname}
                </h3>
              </NavLink>
            </div>
            <div className={styles.containerBookDetailsMin}>
              <ul>
                <li>Páginas: {book?.pages}</li>
                <li>Editorial: {book?.editorial}</li>
                <li>Año: {book?.year}</li>
                <li>
                  Stock:{' '}
                  {book.stock > 3
                    ? '  Disponible'
                    : book.stock === 3
                    ? '  ¡Quedan 3!'
                    : book.stock === 2
                    ? '  ¡Quedan 2!'
                    : book.stock === 1
                    ? '  ¡Ultimo disponible!'
                    : '  No hay Stock'}
                </li>
              </ul>
            </div>

            <div className={styles.containerAddBtns}>
              <div>
                <Cart
                  color='white'
                  title={book.title}
                  stock={book.stock}
                  id={id}
                />
              </div>
              <div>
                <Fav
                  book={book._id}
                  painted={`${
                    bookAdded.includes(book._id) ? 'secondary' : 'disabled'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        {/* SINOPSIS */}
        <div className={styles.containerBookSinopsis}>
          <h3>Sinopsis del libro:</h3>
          <p>{book.review}</p>
        </div>
        {/* COMENTARIOS */}
        <div className={styles.containerComentarios}>
          <h3>Comentarios</h3>
          <div className={styles.postComments}>
            <div className={styles.containerComentarioHabilitado}>
              <div className={styles.containerComentarioAvatar}>
                <Avatar src={isLogged[0]?.picture} />
                <span>{isLogged[0]?.nickname || 'usuario'}</span>
              </div>
              <textarea
                cols='80'
                rows='4'
                value={comment.comment}
                onChange={(e) => handleChange(e)}
              />
              <button
                onClick={(e) => handlePost(e)}
                className={styles.postComentarioBtn}
              >
                Publicar
              </button>
            </div>
          </div>
          <div className={styles.mainContainerComentarios}>
            {comments.map((e) => {
              if (e.users.length > 0 && e.isHidden === false) {
                return (
                  <div className={styles.containerComentario}>
                    <div className={styles.containerComentarioAvatar}>
                      <Avatar src={e.users[0]?.picture} />
                      <span>{e.users[0]?.nickname}</span>
                    </div>
                    <div className={styles.containerComent}>
                      <p>{e.comment}</p>
                      <span className={styles.comentarioFecha}>
                        {e.createdAt?.slice(0, 10)}
                      </span>
                    </div>
                    {e.users[0]._id === usuario[0]?._id ? (
                      <button
                        className={styles.eliminarComentarioBtn}
                        value={e._id}
                        onClick={(e) => handleDelete(e)}
                      >
                        x
                      </button>
                    ) : null}
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/*  <div className={styles.postComments}>
        {isLogged.length === 0 ? (
          <button className={styles.login} onClick={() => loginWithRedirect()}>
            Ingresa a tu cuenta para comentar
          </button>
        ) : (
          <textarea
            cols='80'
            rows='4'
            placeholder='Comenta!'
            className={styles.textArea}
            value={comment.comment}
            onChange={(e) => handleChange(e)}
          ></textarea>
        )}

        {isLogged.length === 0 ? null : (
          <button onClick={(e) => handlePost(e)} className={styles.postButton}>
            {'>'}
          </button>
        )}
      </div>
      {comments.map((e) => {
        if (e.users.length > 0 && e.isHidden === false) {
          return (
            <div className={styles.commentContainer}>
              {e.users[0]._id === usuario[0]?._id ? (
                <button
                  value={e._id}
                  onClick={(e) => handleDelete(e)}
                  // className={styles.delete}
                >
                  x
                </button>
              ) : null}
              <span className={styles.nickname}>{e.users[0].nickname}</span>
              <span>{e.createdAt?.slice(0, 10)}</span>
              <p>{e.comment}</p>
            </div>
          )
        }
      })}
      <div className={styles.space} /> */
