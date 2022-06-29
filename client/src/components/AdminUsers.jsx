import React from "react";
import DataTable from 'react-data-table-component'
import { DataGrid} from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";



export default function StockTable(){

    const usuarios= useSelector(state=>state.users)

    
    

    const tablaUsers = usuarios.map(usuario=>
        {
        return(
        {
            id:usuario._id,
       name : usuario.name,
       email  : usuario.email,
       isAdmin : usuario.isAdmin
    }
    )})
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: true,
      
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
      
    },
    {
        field: 'isAdmin',
        headerName: 'IsAdmin',
        width: 150,
        editable: true,
      
    }
   ]


    // const paginacionOpciones = {
    //     rowsPerPageText: 'Filas Por Pagina',
    //     rangeSeparatorText: 'de',
    //     selectAllRowsItem: true,
    //     selectAllRowsItemText: 'todos'

    // }
function onClick(e){
    console.log('dajksbdkasjbdjks')
}
console.log('SSSSSSSS:',DataGrid.SelectedItems )

    return(
        <div>
            <Box sx={{ height:600, width: '100%' }}>
           <DataGrid
            rows={tablaUsers}
            columns={columns}
            //data={tablaUsers}
            checkboxSelection
            disableSelectionOnClick
            //title='Stock Libros'
            //pagination
            pageSize={8}
            rowsPerPageOptions={[5]}
           // paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="600px"/>
            </Box>
        </div>
    )
}

