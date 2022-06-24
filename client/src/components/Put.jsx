import React from 'react';
import { getBooks } from '../actions';
import CardBook from './CardBook';
import SideBar from './SideBar';
import BottomBar from './BottomBar'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Put(){

    // const allBooks = useSelector( state => state.books)
    // const allAuthors = useSelector( state => state.authors)
   
return(
    <div>
        <h2>
    Administrador (Protected: authenticated user with role 'admin' required)
        </h2>

         <Link to="/putauthor">
        <button>Modificar Autor</button>
        </Link>
        
        <Link to="/putbook">
        <button>Modificar Libro</button>
        </Link>
        
    </div>

    

    
)
}