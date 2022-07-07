import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { BsCart } from 'react-icons/bs'
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
} from '../actions'
//import { clearPageBookDetails, getBookDetails } from "../actions";
import { Link } from 'react-router-dom'
import styles from '../Styles/bookDetails.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'

export default function BookDetails() {
  
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsAmount=useSelector((state)=>state.cartAmount)
  const isLogged = useSelector(state => state.userLogged)
  const products = useSelector(state => state.cart);
  const { loginWithRedirect } = useAuth0()
  const [render,setRender]=useState(0)

  const usuario = useSelector ( state => state.userLogged)

  const [comment,setComment]=useState({
    comment:'',
    nickname:'',
    title:'',
  })

  useEffect(() => {
    dispatch(getBookDetails(id))
    dispatch(getBookComments(id))
    scroll.scrollToTop()
  }, [dispatch])

  function handleClick(event, e) {
    event.preventDefault()
    dispatch(getBookGenre(e))
    navigate('/home')
    scroller.scrollTo('gaston')
  }
  function handleAddToCart(e) {
    e.preventDefault()
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(id))
    dispatch(updateAmount(productsAmount+1))
    alert('Libro agregado al carrito!')
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

  useEffect(() => {
    return () => {
      dispatch(clearPageBookDetails())
      dispatch (clearComments())
    }
  }, [dispatch])

  const handleClickFav = () => {
    if (isLogged.length === 0) return loginWithRedirect()
    const iduser = isLogged[0]._id
    dispatch(addFav(id, iduser))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
  }

  function handleChange(e){
    e.preventDefault();
    setComment({
      comment:e.target.value,
      nickname:usuario[0].nickname,
      title:book.title,
    })
    console.log('comment :',comment)
  }
  function handlePost(e){
    e.preventDefault();
    console.log('comment :',comment)
    axios.post('https://ecommercehenryx.herokuapp.com/comments/addComment',comment).then((response)=>{
        console.log('axios response',response)
    }).then(()=>{
      setTimeout(function () {
        dispatch(getBookComments(id)),500
      })
    })
  }

  function handleDelete(e){
    e.preventDefault();
    axios.delete('https://ecommercehenryx.herokuapp.com/comments/deleteComment/'+e.target.value).then(()=>{
      setTimeout(function () {
        dispatch(getBookComments(id)),500
      })
    })
  }

  const book = useSelector((state) => state.bookDetails)
  const comments=useSelector((state)=>state.comments)
  console.log('comments:',comments)
  const author = book.authors


  return (
    <div className={styles.container}>
      <Link to='/cart'>
        <div className={styles.containerCart}>
          <BsCart className={styles.cart} />
          <h4 className={styles.productsAmount}>{productsAmount}</h4>
        </div>
      </Link>
      <img src={book.cover} alt='Not Found ):' className={styles.img} />

      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>

        {author ? (
          <Link to={'/author/' + author._id}>
            <h2 className={styles.title}>
              {author?.name} {author?.surname}{' '}
            </h2>
          </Link>
        ) : (
          'N'
        )}

        <span>Generos :</span>

        {book?.genres?.map((e) => {
          return (
            <button
              onClick={(event) => handleClick(event, e.genre)}
              className={styles.genres}
            >
              {e.genre}
            </button>
          )
        })}

        <p>{book.review}</p>
      </div>

      <div className={styles.buy}>
        <h3 className={styles.price}>{book.price}$</h3>
        <h4>
          Stock:
          {book.stock > 3
            ? 'Disponible'
            : book.stock === 3
            ? '¡Quedan 3!'
            : book.stock === 2
            ? '¡Quedan 2!'
            : book.stock === 1
            ? '¡Ultimo disponible!'
            : 'No hay Stock'}
        </h4>
        {book.stock > 1
        ? <button className={styles.button} onClick={(e) => handleAddToCart(e)}>
          Añadir al carrito
          </button>
        : ''
        }
        <button className={styles.button} onClick={() => handleClickFav()}>
          Añadir a lista de desesados
        </button>
      </div>

      <div className={styles.details}>
        <h4>Detalles del producto</h4>
        <p className={styles.detail}>Paginas : {book.pages}</p>
        <p className={styles.detail}>Año : {book.year}</p>
        <p className={styles.detail}>Editorial : {book.editorial}</p>
      </div>

      <div className={styles.space} />

      <div className={styles.postComments}>
        <textarea
          cols='80'
          rows='4'
          placeholder='Comenta!'
          className={styles.textArea}
          value={comment.comment}
          onChange={e=>handleChange(e)}
        ></textarea>
        
        {
          (isLogged.length === 0)?<button onClick={()=>loginWithRedirect()} className={styles.postButton}>{'>'}</button>:
          <button onClick={e=>handlePost(e)} className={styles.postButton} >{'>'}</button>
        }
      </div>
        {
          comments.map(e=>{
            return(
            <div className={styles.commentContainer}>
            {
              (e.users[0]._id===usuario[0]?._id)?<button value={e._id} onClick={e=>handleDelete(e)} className={styles.delete}>x</button>:null
            }
            <h4>{e.users[0].nickname}</h4>
            <p>{e.comment}</p>
            </div>
            )
          })
        }
    </div>
  )
}
