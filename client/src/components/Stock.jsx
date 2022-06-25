import { useSelector } from "react-redux";
import React from "react";
import { Link } from "@mui/material";

export default function Stock(){

    const allBooks = useSelector(state => state.books)
    const orderedBooks = allBooks.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      })


    return (
        <div>

                    {orderedBooks.length?
                    orderedBooks.map(book => {
                        return(
                            <li>
                                {book.title} {book.editorial} {book.stock} 
                                 
                             
                            </li>
                        )
                    })
                    :'loading' 
                    }

            <Link to="/admin">
                    <button>Administrador</button>
            </Link>
        </div>
    )
}