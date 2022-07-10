import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart, clearPageAuthorDetails, getAuthorDetails,purchaseOrder,updateAmount } from '../actions'
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AuthorDetails = () => {
  const dispatch = useDispatch()
  const authorDetails = useSelector((state) => state.authorDetails)
  //console.log('soyAutorDetalles:',authorDetails)
  const books = useSelector((state) => state.books)
  const productsAmount=useSelector((state)=>state.cartAmount)
  const isLogged = useSelector(state => state.userLogged)
  const products = useSelector(state => state.cart)
  
  const authorBooks = authorDetails.books

  const userFavBooksShowed = useSelector(state=>state.userLoggedFavsBooksShowed)

  const myFavsBooksIds = userFavBooksShowed.map(book=>book._id)

  
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
    e.preventDefault();
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(authorBooks[0]._id))
    dispatch(updateAmount(productsAmount+1))
    alert('Libro añadido al carrito!')
    setTimeout(function(){
      
      dispatch(purchaseOrder({
        email: isLogged[0].email, 
        name: isLogged[0].name,
        title: products[products.length-1].title,
        unit_price: products[products.length-1].price, 
        quantity: products[products.length-1].amount,
      }))
       
    }, 200)
    
  }
  

  return (
    <div className={style.container}>
      <Link to='/cart'>
        <div className={style.containerCart}>
          <BsCart className={style.cart} />
          <h4 className={style.productsAmount}>{productsAmount}</h4>
        </div>
      </Link>

      <Link to='/user'>
        <div className={s.containerHeart}>
          <BsHeart className={s.heart} />
          {
            isLogged.length ?
            <h4 className={s.productsAmount}>{userFavBooksShowed.length}</h4>
            : <h4 className={s.productsAmount}>{0}</h4>
          }
        </div>
      </Link>

      <div className={style.btnUbi}>
        <Link to='/author'>
          <button className={styledButton.button}>Volver</button>
        </Link>
      </div>
      <div className={style.widthScreen}>
        <div className={style.content}>
          <div>
            <div>
              <h1 className={style.authorName}>
                {authorDetails.name} {authorDetails.surname}
              </h1>
            </div>
            <p>{authorDetails.biography}</p>
          </div>
          <div className={style.info}>
            <div className={style.imageContainer}>
              <img
                className={style.image}
                src={authorDetails.picture}
                alt='buscando img'
              />
            </div>

            <div>
              <p>País: {authorDetails.country}</p>
              <p>Fecha de nacimiento: {authorDetails.birth}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.carrusel}>
        {/* <h5>DEJO CODIGO SIN CARRUSEL POR LAS DUDAS(GUILLE)</h5> */}
        {/* Libros:
                    {
                        authorBooks?.map(book => 
                            <Link to={'/book/' + book._id}>
                                <li>
                                   <h4>{book.title}</h4>
                                   <img src={book.cover}></img>
                                </li>
                            </Link>
                            
                        )    
                    } */}
        {authorBooks && authorBooks.length > 1 
        ? (
          <CarrouselBookEnAuthor booksEscritor={authorBooks} />
          ) 
        :( authorBooks && authorBooks.length && authorBooks[0].isHidden === false
        ? (
            authorBooks.map((book) => (
            
            <div className={style.libro}>
              <Link className={style.Link} to={'/book/' + book._id}>
                <li>
                  <h3>{book.title}</h3>
                  <img
                    className={style.img}
                    src={book.cover}
                    alt='Not Found ):'
                    width='200x'
                    height='300'
                  ></img>
                </li>
              </Link>
              <div className={style.containerButtonsBooks}>
                {  

                  books[0].stock > 1 ?
                  <AddShoppingCartIcon
                    cursor='pointer'
                    color="action"
                    fontSize="large" 
                    onClick={(e) => handleClick(e)}
                  />
                   : ''
                }
                <Fav book={book._id} painted={`${myFavsBooksIds.includes(book._id)
                          ?'secondary'
                        :'disabled'}`} />
              </div>
            </div>
          ))
        ) : (
          ''
          ))}
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
