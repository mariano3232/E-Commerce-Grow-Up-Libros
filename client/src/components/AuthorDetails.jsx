
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPageAuthorDetails, getAuthorDetails } from '../actions';
import { Link } from 'react-router-dom';
import style from '../Styles/authorDetails.module.css';
import { animateScroll as scroll} from "react-scroll";
import { useState } from 'react';

const AuthorDetails = () => {

    const dispatch = useDispatch();
    const authorDetails = useSelector(state => state.authorDetails);
    const books = useSelector(state =>state.books)
    console.log('////////:',authorDetails.book)
    
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

    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [currentBook, setcurrentBook] = useState(authorDetails.books.title[0]);
    // const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       next();
    //     }, 5000);
    //     return () => clearInterval(interval);
    //   });

    //   const previus = () => {
    //     setLoaded(false);
    //     setTimeout(() => {
    //       if (currentIndex !== 0) {
    //         setCurrentIndex(currentIndex - 1);
    //         setcurrentBook(authorDetails.books[currentIndex - 1]);
    //       } else {
    //         setCurrentIndex(authorDetails.books - 1);
    //         setcurrentBook(authorDetails.books[authorDetails.books.length - 1]);
    //       }
    //     }, 500);
    //   };

    //   const next = () => {
    //     setLoaded(false);
    //     setTimeout(() => {
    //       if (currentIndex !== lastBooks.length - 1) {
    //         setCurrentIndex(currentIndex + 1);
    //         setcurrentBook(authorDetails.books[currentIndex + 1]);
    //       } else {
    //         setCurrentIndex(0);
    //         setcurrentBook(authorDetails.books[0]);
    //       }
    //     }, 500);
    //   };

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
                Libros:
                    {
                        authorDetails.books?.map(e => 
                            <Link to={'/book/' + e._id}>
                                <li>
                                   {/* <h4 onLoad={
                                    ()=>{setLoaded(true)}
                                   }>{e.title}</h4> */}
                                   <h4>{e.title}</h4>
                                </li>
                            </Link>
                            
                        )    
                    }
            </div>
      
        </div>
    )
}

export default AuthorDetails;
