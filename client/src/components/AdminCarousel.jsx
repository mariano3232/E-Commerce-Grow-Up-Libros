import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBook from "./CardBook";
import styles from '../Styles/adminCarousel.module.css'
import { addBookCarousel } from "../actions";

export default function AdminCarousel(){

    const dispatch=useDispatch();
    const books=useSelector(state=>state.books)
    const carousel=useSelector(state=>state.carousel)
    console.log('state.carousel =',carousel)

    const [state,setState]=useState({
        addbook:false,
        addBookOffer:false,
        addPackage:false,
        custom:false,
    })

    const [addForm,setAddForm]=useState(false)
    const [currentBook,setCurrentBook]=useState({
        title:'',
        _id:'',
        price:'',
    })

    function addBook(e){
        e.preventDefault();
        setState({
            addbook:true,
            addBookOffer:false,
            addPackage:false,
            custom:false,
        })
    }
    function addBookOffer(e){
        e.preventDefault();
        setState({
            addbook:false,
            addBookOffer:true,
            addPackage:false,
            custom:false,
        })
    }
    function addPackage(e){
        e.preventDefault();
        setState({
            addbook:false,
            addBookOffer:false,
            addPackage:true,
            custom:false,
        })
    }
    function addCustom(e){
        e.preventDefault();
        setState({
            addbook:false,
            addBookOffer:false,
            addPackage:true,
            custom:false,
        })
    }
    function handleAdd(e){
        e.preventDefault();
        setAddForm(true);
        let book=e.target.value.split(',')
        setCurrentBook({title:book[0],_id:book[1]})
        console.log('currentBook',currentBook)
    }
    function handlePrice(e){
        e.preventDefault();
        setCurrentBook({...currentBook,price:e.target.value})
        console.log('currentBook',currentBook)
    }
    function handleSend(e){
        e.preventDefault();
        dispatch(addBookCarousel(currentBook))
    }

    return(
        <div>
            <h1>Manejo de Carrusel</h1>
            <h3>Opciones:</h3>
            <button onClick={e=>addBook(e)}>Agregar Libro</button>
            {/* <button onClick={e=>addBookOffer(e)}>Agregar libro con descuento</button> */}
            <button onClick={e=>addPackage(e)}>Agregar paquete</button>
            <button onClick={e=>addCustom(e)}>Agregar personalizado</button>
            {
                addForm?<div>
                   <h4> Añadiendo {currentBook.title} al carousel </h4>
                   <p>Precio:</p>
                   <input type="number" value={currentBook.price} onChange={e=>handlePrice(e)}/>
                   <button onClick={e=>handleSend(e)}>Añadir</button>
                </div>:null
            }
            {
                state.addbook?books.map((book, index) => {
                    return (
                      <div key={index} className={styles.cardsContainer}>
                        <div className={styles.cards}>
                            <h3>{book.title}</h3>
                            <button value={[book.title,book._id]} onClick={e=>handleAdd(e)}>Add</button>
                            <img src={book.cover} width='200px' alt="not Found" />
                        </div>
                      </div>
                    )
                  })
                    
                :null
            }
        </div>
    )
}