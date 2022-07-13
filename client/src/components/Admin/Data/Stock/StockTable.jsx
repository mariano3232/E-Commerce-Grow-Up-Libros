import React from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'
import { Link } from 'react-router-dom'
import { animateScroll as scroll, Element } from 'react-scroll'
import styledButton from '../../../../Styles/Button.module.css'
import styles from '../../../../Styles/stockTable.module.css'
export default function StockTable() {
  const books = useSelector((state) => state.booksAdmin)

  const tabla = books.map((book) => {
    return {
      title: book.title,
      editorial: book.editorial,
      stock: book.stock,
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
      name: 'Editorial',
      selector: 'editorial',
      sortable: true,
    },
    {
      name: 'Stock',
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
    <div className={styles.containerDataGrid}>
      <h1>Stock Libros</h1>
      <div className={styles.containerButtonNavigation}>
        <Link to='/admin'>
          <button className={styledButton.button}>Panel Administrador</button>
        </Link>

        <Link to='/stock'>
          <button className={styledButton.button}>Formato Cartas</button>
        </Link>

        <Link to='/stocktable2'>
          <button className={styledButton.button}>Tabla</button>
        </Link>
      </div>
      <div className={styles.actions}>
        <AdminRefreshBooks />
        <AdminSearchBarBooks />
      </div>
      <DataTable
        columns={columnas}
        data={tabla}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight='600px'
      />
    </div>
  )
}
