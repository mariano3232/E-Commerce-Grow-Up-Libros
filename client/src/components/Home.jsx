import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../actions";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import Paginado from "./Paginado";
import CardBook from "./CardBook";
import Carousel from "./carousel";
import styles from "../Styles/Home.module.css";
import Shop from "./Shop";
import { Admin } from "./Admin";
import OrderBooks from "./OrderBooks";

export default function Home() {
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getBooks());
  };

  /* const [order, setOrder] = useState("Asc"); */
  /* const [rating, setRating] = useState(""); */
  /* const [price, setPrice] = useState(""); */

  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage] = useState(9);
  var lastBook = currentPage * bookPerPage;
  var firstBook = lastBook - bookPerPage;
  var currentBooks = allBooks.slice(firstBook, lastBook);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
    lastBook = currentPage * bookPerPage;
    firstBook = lastBook - bookPerPage;
    currentBooks = allBooks.slice(firstBook, lastBook);
  }, [allBooks]);

  // useEffect(() => {
  //   dispatch(getBooks("Asc"));
  // }, [dispatch]);

  /* function handleSort(e) {
    setOrder(e.target.value);
    dispatch(getBooks(e.target.value));
    setCurrentPage(1);
  } */

  /* function handleRating(e) {
    setRating(e.target.value);
    dispatch(getBooks(order, e.target.value));
    setCurrentPage(1);
  } */

  /* function handlePrice(e) {
    setPrice(e.target.value);
    dispatch(getBooks(order, e.target.value));
    setCurrentPage(1);
  } */

  // return (
  //   <div>
  //     <Link to="/admin">
  //       <button>Administrador</button>
  //     </Link>
  //     <Link to="/shop">
  //       <button>Compras</button>
  //     </Link>

  //     <p onClick={handleClick}>Refrescar</p>

  //    <p onClick={handleClick}>Refrescar</p>

  return (
    <div className={styles.home}>
      <Link to="/admin">
        <button>Administrador</button>
      </Link>
      <Link to="/shop">
        <button>Compras</button>
      </Link>
      <p onClick={handleClick}>Ver todos los Libros</p>
      <Carousel />

      <div>
        <Paginado
          bookPerPage={bookPerPage}
          books1={allBooks.length}
          paginado={paginado}
          page={currentPage}
        />

        <OrderBooks/>

        {/* <div className={styles.ubiOptions}>
          <p className={styles.p}>
            Ordenar Por:
            <select className={styles.options} onChange={(e) => handleSort(e)} defaultValue="default">
              <option value="default" disabled>Orden alfabético</option>
              <option className={styles.options} value="Asc">
                Nombre Ascendente
              </option>
              <option className={styles.options} value="desc">
                Nombre Descendente
              </option>
            </select>

            <select onChange={(e) => handleRating(e)}>
              <option value="Asc">Higher Rating</option>
              <option value="desc">Lower Rating</option>
            </select> 
            

            <select className={styles.options} onChange={(e) => handlePrice(e)} defaultValue="default">
              <option value="default" disabled>Orden por precio</option>
              <option className={styles.options} value="Asc">
                Precio mas Bajo
              </option>
              <option className={styles.options} value="desc">
                Precio mas Alto
              </option>
            </select>
          </p>
        </div> */}

        <SideBar />
        <div className={styles.card}>
          {currentBooks.length ? (
            currentBooks.map((book, index) => {
              return (
                <div key={index}>
                  <Link className={styles.link} to={"/book/" + book._id}>
                    <CardBook
                      title={book.title}
                      cover={book.cover}
                      price={book.price}
                      rating={book.rating}
                      id={book._id}
                    />
                  </Link>
                </div>
              );
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
  );
}
