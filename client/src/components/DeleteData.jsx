import React from "react";

import { deleteBook , deleteAuthor } from "../actions";
import { useDispatch , useSelector } from 'react-redux';



export default function Delete(){

    const dispatch = useDispatch()

    const allBooks = useSelector(state => state.books)
    const allAuthors = useSelector ( state => state.authors)

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
        console.log('id:',id)
        dispatch(deleteBook(id))
        alert("Successfully Deleted")
    };

    function handleDeleteAuthor(){
        e.preventDefault(e)
        dispatch(deleteAuthor(author._id))
        alert("Successfully Deleted")
    };

    return(
        <div>
            <div>
                <h5>Libros</h5>

                    {allBooks.length?
                    allBooks.map(book => {
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
                                <button onClick ={e=> handleDeleteAuthor(e)}>x</button>
                          </li>
                        )
                    })
                    :'loading' 
                    }
            </div>

        </div>



    )
}