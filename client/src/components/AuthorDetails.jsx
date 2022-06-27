
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPageAuthorDetails, getAuthorDetails } from '../actions';
import { Link } from 'react-router-dom';
import style from '../Styles/authorDetails.module.css';
import { animateScroll as scroll} from "react-scroll";
import { useState } from 'react';
import CarrouselBookEnAuthor from './CarrouselBooksEnAuthor';

const AuthorDetails = () => {

    const dispatch = useDispatch();
    const authorDetails = useSelector(state => state.authorDetails);
    const books = useSelector(state =>state.books)
    const authorBooks = authorDetails.books
    
    
    const {id} = useParams();
   
    useEffect(() => {
        dispatch(getAuthorDetails(id));
        scroll.scrollToTop();
    }, [dispatch]);
    
    useEffect(() => {
        return () => {
            dispatch(clearPageAuthorDetails());
        }
    }, [dispatch]);
    
   

    return (
        <div>

            <Link to='/author'><p>Volver</p></Link>
            <div>
                <span>Autor: {authorDetails.name} </span>
                <span>{authorDetails.surname}</span>
            </div>
            <div className={style.imageContainer}>
                <img className={style.image} src={authorDetails.picture} alt="buscando img"/>
            </div>
            <div>
                <h4>País: {authorDetails.country}</h4>
                <p>Fecha de nacimiento: {authorDetails.birth}</p>
            </div>
            <div>
                <p>Biografiía: {authorDetails.biography}</p>
            </div>

            <div>
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


                    { authorBooks && authorBooks.length>1                                          
                        ? <CarrouselBookEnAuthor booksEscritor={authorBooks}/>
                        : (authorBooks && authorBooks.length  
                            ? authorBooks.map(book => 
                                <Link to={'/book/' + book._id}>
                                    <li>
                                    <h4>{book.title}</h4>
                                    <img src={book.cover}></img>
                                    </li>
                                </Link>)
                            :'N'
                            )
                    }
            </div>
      
        </div>
    )
}

export default AuthorDetails;
