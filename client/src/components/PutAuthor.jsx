import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PutAuthor(){

    const allAuthors = useSelector( state => state.authors)
    const orderedAuthors = allAuthors.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1;
        }
        return 0;
      })

    return(

        <div>
            
            {
                orderedAuthors.map(author => {
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