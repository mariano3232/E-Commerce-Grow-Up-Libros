import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PutBook(){

    const allBooks= useSelector( state => state.books)


    return(

        <div>
            
            {
                allBooks.map(book => {
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