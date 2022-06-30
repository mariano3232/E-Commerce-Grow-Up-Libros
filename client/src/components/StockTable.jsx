import React from "react";
import DataTable from 'react-data-table-component'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import AdminSearchBarBooks from './AdminSearchBarBooks'
import AdminRefreshBooks from "./AdminRefreshBooks";
import { Link } from "react-router-dom";



export default function StockTable(){

    const books = useSelector(state=>state.booksAdmin)

    const tabla = books.map(book=>{return(
        {
        title:book.title,
        editorial:book.editorial,
        stock:book.stock
    }
    )})
    
    const columnas = [{
        name:'Titulo',
        selector:'title',
        sortable:true
    },
    {
        name:'Editorial',
        selector:'editorial',
        sortable:true
    },
    {
        name:'Stock',
        selector:'stock',
        sortable:true
    }]


    const paginacionOpciones = {
        rowsPerPageText: 'Filas Por Pagina',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'

    }



    // const [stockT , setStockT ] =useState (
    //     {
    //         busqueda:'', 
    //        // libros:[]
    //     }
    // )

    
    // function onChange(e) {
        
    //  setStockT({
    //       busqueda: e.target.value,
    //     })
    //     console.log(stockT.busqueda)
    //     filtrarElementos()
    //   }

    
    //  function filtrarElementos(){
    //   const search= tabla.filter(book=>{
    //         if(book.stock.toString().includes(stockT.busqueda) ||
    //         book.title.toLowerCase().includes(stockT.busqueda) || 
    //         book.editorial.toLowerCase().includes(stockT.busqueda)){
    //             return book;
    //         }
    //     });
    //     setStockT({libros:search})
    //  }


    //  useEffect(()=>{
    //     console.log('hhhhhhhhhhhhhhh')
    //     setStockT(
    //         {libros:tabla}
    //         )
    //   })

    return(
        <div>
            <Link to='/stock'>
                <button>Formato Cartas</button>
            </Link>

            <div>
            <Link to='/stock'>
            <button>Formato Cartas</button>
            </Link>
            <AdminSearchBarBooks/>
            <AdminRefreshBooks/>
            <DataTable
            columns={columnas}
            data={tabla}
            title='Stock Libros'
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="600px"/>
            
            </div>

            
        </div>


    )
}

