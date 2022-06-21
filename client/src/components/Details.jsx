import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails } from "../actions";
import { Link } from "react-router-dom";

export default function Details(){
    const id=useParams().id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch])

    const book=useSelector(state=>state.details)
    console.log('book :',book)
    return(
        <div>
            <h2>{book.title}</h2>
            <Link to='/Home'><h3>Home</h3></Link>
            <img src={book.cover} alt="Not Found ):" width='300px'/>
            <h3>Autor {book.author}</h3>
            <p>editorial : {book.editorial}</p>
            <span>genres :</span>
            {
                book?.genres?.map(e=>{
                    return <span key={e}>{e},  </span>
                })
            }
            <p>pages : {book.pages}</p>
            <p>price : {book.price}$</p>
            <p>year : {book.year}</p>
            <p>{book.review}</p>
        </div>
    )
}