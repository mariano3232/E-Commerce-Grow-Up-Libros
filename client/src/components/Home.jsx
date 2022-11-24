import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SideBar from './Side Bar/SideBar'
import Paginado from './Paginado'
import CardBook from './CardBook'
import Carousel from './Carousel'
import styles from '../Styles/Home.module.css'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { animateScroll as scroll, Element } from 'react-scroll'
import {
  getBooks,
  orderByName,
  orderByPrice,
  orderByRating,
  postUser,
  setToSuperAdmin,
} from '../actions'
import Profile from './Profile'
import { useAuth0 } from '@auth0/auth0-react'
import { formControlClasses } from '@mui/material'
import GenerosTitle from './GenerosTitle'
//import { unstable_renderSubtreeIntoContainer } from 'react-dom'

export default function Home() {
  const dispatch = useDispatch()

  const productsAmount = useSelector((state) => state.cartAmount)

  const { user, isAuthenticated } = useAuth0()

  const allBooks = useSelector((state) => state.books)
  console.log('allBooks:', allBooks)

  const usuario = useSelector((state) => state.userLogged)

  const userFavBooksShowed = useSelector(
    (state) => state.userLoggedFavsBooksShowed
  )

  const [order, setOrder] = useState(true)

  // const usuarioAllFavBooks = usuario.favouritesBooks

  //const usuarioFavBookNotHidden = usuarioAllFavBooks.filter(books=>books.isHidden===false)

  // useEffect(() => {
  //   dispatch(getBooks())
  //   console.log('HOOOOOME');
  // }, []);

  //useEffect(()=>{dispatch(setToSuperAdmin(['62c452c8f0db62a9421601fb']))},[])

  const [currentPage, setCurrentPage] = useState(1)
  const [bookPerPage, setbookPerPage] = useState(15)
  const lastBook = currentPage * bookPerPage
  const firstBook = lastBook - bookPerPage
  const currentBooks = allBooks.slice(firstBook, lastBook)
  console.log('current:', currentBooks)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //   function returnToFirstPage() {
  //     setCurrentPage(1)
  // }

  useEffect(() => {
    setCurrentPage(1)
    // lastBook = currentPage * bookPerPage
    // firstBook = lastBook - bookPerPage
    // currentBooks = allBooks.slice(firstBook, lastBook)
  }, [allBooks])

  function handleOrderByName(e) {
    //console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleOrderByPrice(e) {
    //e.preventDefault()
    dispatch(orderByPrice(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleOrderByRating(e) {
    //e.preventDefault()
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  {
    useEffect(() => {
      if (user) {
        dispatch(postUser(user))
      }
    }, [user])
  }

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  return (
    <div className={styles.home}>
      <Link to='/cart'>
        <div className={styles.containerCart}>
          <BsCart className={styles.cart} />
          <div className={styles.productsAmount}>
            <p className={styles.productsAmountNumber}>{productsAmount}</p>
          </div>
        </div>
      </Link>

      <Link to='/user'>
        <div className={styles.containerHeart}>
          <BsHeart className={styles.heart} />
          {usuario.length ? (
            <div className={styles.productsAmount}>
              <p className={styles.productsAmountNumber}>
                {userFavBooksShowed.length}
              </p>
            </div>
          ) : (
            <div className={styles.productsAmount}>
              <p className={styles.productsAmountNumber}>{0}</p>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.color}>
        <div className={styles.container__components}>
          <div className={styles.carrousel__containerCards}>
            <Carousel />
            <div className={styles.containerActionsAndCards}>
              <div className={styles.containerOrderAndPaginado}>
                <div className={styles.ubiOptions}>
                    <select
                      className={styles.options}
                      onChange={(e) => handleOrderByName(e)}
                      defaultValue='default'
                    >
                      <option value='default' disabled>
                        Orden alfabético
                      </option>
                      <option className={styles.options} value='AscAlf'>
                        Nombre Ascendente
                      </option>{' '}
                      <option className={styles.options} value='descAlf'>
                        Nombre Descendente
                      </option>
                    </select>
                    <select
                      className={styles.options}
                      onChange={(e) => handleOrderByPrice(e)}
                      defaultValue='default'
                    >
                      <option value='default' disabled>
                        Orden por precio
                      </option>
                      <option className={styles.options} value='descPrice'>
                        Precio mas Bajo
                      </option>
                      <option className={styles.options} value='AscPrice'>
                        Precio mas Alto
                      </option>
                    </select>
                    <select
                      className={styles.options}
                      onChange={(e) => handleOrderByRating(e)}
                      defaultValue='default'
                    >
                      <option value='default' disabled>
                        Orden por Rating
                      </option>
                      <option className={styles.options} value='descRat'>
                        Rating mas Bajo
                      </option>
                      <option className={styles.options} value='AscRat'>
                        Rating mas Alto
                      </option>
                    </select>
                </div>
              </div>
              <GenerosTitle />
              <div className={styles.card}>
                {currentBooks.length ? (
                  currentBooks.map((book, index) => {
                    return (
                      <div key={index}>
                        <div className={styles.link}>
                          <CardBook
                            title={book.title}
                            cover={book.cover}
                            price={book.price}
                            rating={book.rating}
                            id={book._id}
                            stock={book.stock}
                          />
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <h5>No se encontro el libro</h5>
                )}
              </div>
              <Paginado
                bookPerPage={bookPerPage}
                books1={allBooks.length}
                paginado={paginado}
                page={currentPage}
              />
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  )
}
