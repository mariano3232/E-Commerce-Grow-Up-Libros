import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../actions";
import { Link } from "react-router-dom";
import styles from '../Styles/bookDetails.module.css'

export default function BookDetails() {

  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetails(id));
  }, [dispatch]);


//   const handleClick = (e) => {
//     e.preventDefault();
//     dispatch(getBookGenre(e.target.value));
// }

  const book = useSelector(state=>state.bookDetails);

  return (
    <div className={styles.container}>

      <img src={book.cover} alt="Not Found ):" className={styles.img} />
      
      <div className={styles.info}>

          <h1>{book.title}</h1>

        <Link to={'/author/' + book.authors._id}>
              <h2 className={styles.title}>{book.authors?.name} {book.authors?.surname} </h2>
        </Link>

         <span>generos :</span>

         {book?.genres?.map((e) => {
            return 
            
               <span key={e.genre}>{e.genre}, </span>;
            
            
         })}

         <p>{book.review}</p>

      </div>

      <div className={styles.buy}>
        <h3 className={styles.price}>{book.price}$</h3>
        <h4>Stock:?</h4>
        <button className={styles.button}>Añadir al carrito</button>
        <button className={styles.button}>Añadir a lista de desesados</button>
      </div>
      
      <div className={styles.details}>
      <h4>Detalles del producto</h4>
        <p className={styles.detail}>Paginas : {book.pages}</p>
        <p className={styles.detail}>Año : {book.year}</p>
        <p className={styles.detail}>editorial : {book.editorial}</p>
      </div>

      <div className={styles.space}/>

      <div className={styles.comments}>
        <label>Da tu puntuacion!</label>
        <input type="number" placeholder="Puntuacion..." className={styles.rating} />
        <button>Ok</button>
        <textarea cols="30" rows="10" placeholder="Comenta!"  className={styles.comment}></textarea>
        <button>Post</button>
      </div>  

    </div>
  );
}
