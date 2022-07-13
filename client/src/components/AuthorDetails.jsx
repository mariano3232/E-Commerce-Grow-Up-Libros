import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  addToCart,
  clearPageAuthorDetails,
  getAuthorDetails,
  purchaseOrder,
  updateAmount,
} from '../actions'
import { Link } from 'react-router-dom'
import style from '../Styles/authorDetails.module.css'
import s from '../Styles/Home.module.css'
import styledButton from '../Styles/Button.module.css'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { animateScroll as scroll } from 'react-scroll'
import CarrouselBookEnAuthor from './CarrouselBooksEnAuthor'
import Fav from './Fav'
import { useAuth0 } from '@auth0/auth0-react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Alert from '../functions/Alert'
import CardBook from './CardBook'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const AuthorDetails = () => {
  const dispatch = useDispatch()
  const authorDetails = useSelector((state) => state.authorDetails)
  //console.log('soyAutorDetalles:',authorDetails)
  const books = useSelector((state) => state.books)
  const productsAmount = useSelector((state) => state.cartAmount)
  const isLogged = useSelector((state) => state.userLogged)
  const products = useSelector((state) => state.cart)

  const authorBooks = authorDetails.books

  const userFavBooksShowed = useSelector(
    (state) => state.userLoggedFavsBooksShowed
  )

  const myFavsBooksIds = userFavBooksShowed.map((book) => book._id)

  // console.log('soyAllBook:',authorAllBooks)
  // const authorBooksNotHidden = authorBooks.filter( book =>{book.isHidden === false} )
  //console.log('soyBook:',authorBooks)

  // console.log('soyBookNoH:',authorBooksNotHidden)

  const { loginWithRedirect } = useAuth0()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getAuthorDetails(id))
    scroll.scrollToTop()
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearPageAuthorDetails())
    }
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault()
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(authorBooks[0]._id))
    dispatch(updateAmount(productsAmount + 1))
    Alert('Libro añadido al carrito!', 'success')
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
    }, 200)
  }

  return (
    <div className={style.container}>
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
              <p className={s.productsAmountNumber}>
                {userFavBooksShowed.length}
              </p>
            </div>
          ) : (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{0}</p>
            </div>
          )}
        </div>
      </Link>

      <div className={style.btnUbi}>
        <Link to='/author'>
          <button className={styledButton.button}>Volver</button>
        </Link>
      </div>
      <div className={style.widthScreen}>
        <div className={style.containerInfo}>
          <div className={style.contentData}>
            <div className={style.info}>
              <div className={style.containerAuthorData}>
                <h1 className={style.authorName}>
                  {authorDetails.name} {authorDetails.surname}
                </h1>
              </div>
              <div className={style.imageContainer}>
                <img
                  className={style.image}
                  src={authorDetails.picture}
                  alt='buscando img'
                />
                <p>País: {authorDetails.country}</p>
                <p>Fecha de nacimiento: {authorDetails.birth}</p>
              </div>
            </div>
            <div className={style.containerBiography}>
              <p className={style.biography}>{authorDetails.biography}</p>
            </div>
          </div>
          <div className={style.containerSlide}>
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className={style.mySwipper}
            >
              {authorBooks &&
                authorBooks?.map((book) =>
                  book.isHidden === false ? (
                    <SwiperSlide>
                      <CardBook
                        id={book._id}
                        title={book.title}
                        cover={book.cover}
                        rating={book.rating}
                        price={book.price}
                        stock={book.stock}
                      />
                    </SwiperSlide>
                  ) : (
                    ''
                  )
                )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorDetails

/* 
<button
                    className={styledButton.button}
                    value={book._id}
                    onClick={(e) => handleClick(e)}
                  >
                    Añadir al carrito
                  </button>
*/
