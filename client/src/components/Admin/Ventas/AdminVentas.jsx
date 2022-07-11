import React from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AdminSearchBarBooks from '../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../RefreshButtons/AdminRefreshBooks'
import { Link } from 'react-router-dom'
import { animateScroll as scroll, Element } from 'react-scroll'
import styledButton from '../../../Styles/Button.module.css'

export default function AdminVentas() {
  const books = useSelector((state) => state.booksAdmin)

  const tabla = books.map((book) => {
    return {
      title: book.title,
      authorSurname: book.authors.surname,
      editorial: book.editorial,
      stock: book.soldCount,
    }
  })

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  const columnas = [
    {
      name: 'Titulo',
      selector: 'title',
      sortable: true,
    },
      {
        name: 'Apellido',
        selector: 'authorSurname',
        sortable: true,
      },
    {
      name: 'Editorial',
      selector: 'editorial',
      sortable: true,
    },
    {
      name: 'Ventas',
      selector: 'stock',
      sortable: true,
    },
  ]

  const paginacionOpciones = {
    rowsPerPageText: 'Filas Por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'todos',
  }

  return (
    <div>
        <Link to='/admin'>
            <button className={styledButton.button}>Panel Administrador</button>
        </Link>

      <div>
        <AdminSearchBarBooks />
        <AdminRefreshBooks />
        <DataTable
          columns={columnas}
          data={tabla}
          title='Ventas'
          pagination
          paginationComponentOptions={paginacionOpciones}
          fixedHeader
          fixedHeaderScrollHeight='600px'
        />
      </div>
    </div>
  )
}
