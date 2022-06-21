import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../actions";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import Paginado from "./Paginado";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage] = useState(10);
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

  useEffect(() => {
    dispatch(getBooks("Asc"));
  }, [dispatch]);

  function handleSort(e) {
    dispatch(getBooks(e.target.value));
    setCurrentPage(1);
  }

  function handleRating(e) {
    dispatch(getBooks(e.target.value));
    setCurrentPage(1);
  }

  function handlePrice(e) {
    dispatch(getBooks(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <SideBar />

      <Paginado
        bookPerPage={bookPerPage}
        books1={allBooks.length}
        paginado={paginado}
        page={currentPage}
      />

      <div>
        <div>
          <p>
            Order by:
            <select onChange={(e) => handleSort(e)}>
              <option value="Asc">Name Ascending</option>
              <option value="desc">Name Descending</option>
            </select>
            {/* <select onChange={(e) => handleRating(e)}>
              <option value="Asc">Higher Rating</option>
              <option value="desc">Lower Rating</option>
            </select> */}
            <select onChange={(e) => handlePrice(e)}>
              <option value="Asc">Higher Price</option>
              <option value="desc">Lower Price</option>
            </select>
          </p>
        </div>

        <div>
          {allBooks.length ? (
            allBooks.map((book) => {
              return (
                <Link to={"/book/" + book.id}>
                  <Card
                    title={book.title}
                    cover={book.cover}
                    price={book.price}
                    rating={book.rating}
                    id={book.id}
                    key={book.id}
                  />
                </Link>
              );
            })
          ) : (
            <h5>Book Not Found!</h5>
          )}
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
