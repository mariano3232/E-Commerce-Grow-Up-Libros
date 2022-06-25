import React from "react";

import { deleteBook , deleteAuthor } from "../actions";
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Delete(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allBooks = useSelector(state => state.books)
    const allAuthors = useSelector ( state => state.authors)

    const orderedBooks = allBooks.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      })

    const orderedAuthors = allAuthors.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1;
        }
        return 0;
      })


    function handleDeleteBook(id){
        
        dispatch(deleteBook(id))
        alert("Libro Eliminado")
        navigate("/admin");   
    };

    function handleDeleteAuthor(id){
        
        dispatch(deleteAuthor(id))
        alert("Escritor Eliminado")
        navigate("/admin"); 
    };

    return(
        <div>
            <div>
                <h5>Libros</h5>

                    {orderedBooks.length?
                    orderedBooks.map(book => {
                        return(
                            <li>
                                {book.title}
                                <button onClick ={()=>handleDeleteBook(book._id)}>x</button>
                            </li>
                        )
                    })
                    :'loading' 
                    }
            </div>

            <div>
                <h5>Autores</h5>

                    {orderedAuthors.length?
                    orderedAuthors.map(author => {
                        return(
                            <li>
                                {author.name} {author.surname}
                                <button onClick ={()=> handleDeleteAuthor(author._id)}>x</button>
                            </li>
                        )
                    })
                    :'loading' 
                    }
            </div>

       

            <Link to="/admin">
            <button>Administrador</button>
            </Link>

        </div>

    )
}