import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Carousel.module.css'
import style from '../Styles/CarrouselBooks.module.css'
import Fav from './Fav'
import { useAuth0 } from '@auth0/auth0-react'
import { addToCart, purchaseOrder, updateAmount } from '../actions'

export default function CarrouselBookEnAuthor({ booksEscritor }) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentBook, setcurrentBook] = useState(booksEscritor[0])
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()
  const isLogged = useSelector(state => state.userLogged)
  const products = useSelector(state => state.cart)
  const productsAmount=useSelector((state)=>state.cartAmount)

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(interval)
  })

  const previus = () => {
    setLoaded(false)
    setTimeout(() => {
      if (currentIndex !== 0) {
        setCurrentIndex(currentIndex - 1)
        setcurrentBook(booksEscritor[currentIndex - 1])
      } else {
        setCurrentIndex(booksEscritor.length - 1)
        setcurrentBook(booksEscritor[booksEscritor.length - 1])
      }
    }, 500)
  }
  const next = () => {
    setLoaded(false)
    setTimeout(() => {
      if (currentIndex !== booksEscritor.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setcurrentBook(booksEscritor[currentIndex + 1])
      } else {
        setCurrentIndex(0)
        setcurrentBook(booksEscritor[0])
      }
    }, 500)
  }

  function handleClick(e) {
    e.preventDefault();
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(e.target.value))
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
    <div className={styles.all}>
      <div className={styles.container}>

        <Link to={'/book/' + currentBook?._id}>
          <img
            src={currentBook?.cover}
            alt='Cover'
            className={loaded ? styles.loaded : styles.img}
            onLoad={() => {
              setLoaded(true)
            }}
          />
        </Link>

        {
          currentBook.stock > 1 ?
          <button 
            className={style.btn}
            onLoad={() => {
              setLoaded(true)
            }}
            value={currentBook._id}
            onClick={(e) => handleClick(e)}
          >
            Añadir al carrito
          </button> : ''
        }
        
        <Fav book={currentBook._id} />

        <div>
          <button onClick={previus} className={styles.buttons}>
            {'<'}
          </button>
          <button onClick={next} className={styles.buttons}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
