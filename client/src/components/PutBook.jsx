import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PutBook(){

    const allBooks= useSelector( state => state.books)
    const ordereBooks = allBooks.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      })

    return(

        <div>
            
            {
                ordereBooks.map(book => {
                    return(
                        <div>
                        <h5>{book.title} </h5>
                        <Link to ={'/putBookID/' + book._id}>
                        <button>Modificar</button>
                        </Link>
                        </div>
                    )
                })

            }
        </div>
    )
}