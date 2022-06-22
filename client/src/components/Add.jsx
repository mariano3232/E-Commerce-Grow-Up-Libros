import React from 'react';
import { getBooks } from '../actions';
import Card from './Card';
import SideBar from './SideBar';
import BottomBar from './BottomBar'
import { Routes, Route, Link, Navigate } from 'react-router-dom'


//1) SIN WRAPPER PROTECTED ROUTE
// export default function Add({ user }){
//         if (!user) {
//           return <Navigate to="/home" replace />;
//         }
//     return(
//         <div>
//             <h2>
//         Admin (Protected: authenticated user with role 'admin' required)
//       </h2>

//              <Link to="/addauthor">
//             <button>Add Author</button>
//             </Link>
//             <Link to="/addbook">
//             <button>Add Book</button>
//             </Link>
//         </div>

        

        
//     )
// }


//2)CON WRAPPED PROTECTED ROUTE

export default function Add(){
   
return(
    <div>
        <h2>
    Admin (Protected: authenticated user with role 'admin' required)
  </h2>

         <Link to="/addauthor">
        <button>Agregar Autor</button>
        </Link>
        <Link to="/addbook">
        <button>Agregar Libro</button>
        </Link>
    </div>

    

    
)
}