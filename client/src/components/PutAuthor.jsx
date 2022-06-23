import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PutAuthor(){

    const allAuthors = useSelector( state => state.authors)


    return(

        <div>
            
            {
                allAuthors.map(author => {
                    return(
                        <div>
                        <h5>{author.name} {author.surname} </h5>
                        <Link to ={'/putAuthorID/' + author._id}>
                        <button>Modificar</button>
                        </Link>
                        </div>
                    )
                })

            }
        </div>
    )
}