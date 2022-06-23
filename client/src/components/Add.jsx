import React from 'react';
import { getBooks } from '../actions';
import CardBook from './CardBook';
import SideBar from './SideBar';
import BottomBar from './BottomBar'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

export default function Add(){
   
return(
    <div>
        <h2>
    Administrador (Protected: authenticated user with role 'admin' required)
        </h2>

         <Link to="/addauthor">
        <button>Agregar Autor</button>
        </Link>
        
        <Link to="/addbook">
        <button>Agregar Libro</button>
        </Link>

        <Link to="/admin">
        <button>Administrador</button>
        </Link>
    </div>

    

    
)
}