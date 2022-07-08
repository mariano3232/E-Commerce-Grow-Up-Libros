import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBooksAdmin } from '../../../../actions'
import { Link , NavLink} from 'react-router-dom'

import { animateScroll as scroll, Element } from 'react-scroll'


import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'





export default function StockTable2() {

  const dispatch = useDispatch()

  const books = useSelector((state) => state.booksAdmin)

  console.log('libros:',books)

  const [input , setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBookTitleAdmin(input));
    scroller.scrollTo("gaston");
    setInput('');
}



  //---------------------CON CHECKBOX------------------

  // const [seleccionados, setSeleccionados] = useState([])

  // const [changed, setChanged] = useState(false)

  // function selectUser(e) {
  //   var userId = e.target.value
  //   console.log('userId:', userId)

  //   if (!e.target.checked) {
  //     let seleccion = seleccionados.filter((usuario) => usuario._id !== userId)
  //     console.log('seleccion:', seleccion)
  //     setSeleccionados(seleccion)
  //   } else {
  //     let usuarioCheck = usuarios.find((usuario) => usuario._id === userId)
  //     console.log('usuarioCheck:', usuarioCheck)

  //     setSeleccionados([...seleccionados, usuarioCheck])
  //   }
  // }

  // useEffect(() => {
  //   var checkeds = document.getElementsByClassName('checkbox')
  //   for (let i = 0; i < checkeds.length; i++) {
  //     checkeds[i].checked = false
  //   }
  //   setSeleccionados([])
  //   dispatch(getUsers())
  // }, [changed])

  // useEffect(() => {}, [usuarios])
  ///-----------------------------------cambiar la logica en el render

  
//   useEffect(() => {
//     dispatch(getBooksAdmin())
//   }, [])



//   useEffect(() => {
//     scroll.scrollToTop()
//   }, [])


  //------------PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(10); //modificamos esto si queremos mostrar mas filas
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLmit, setMinPageNumberLmit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLmit(minPageNumberLmit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLmit(minPageNumberLmit - pageNumberLimit);
    }
  };
 
  const pages = [];
  for (let i = 1; i <= Math.ceil(books.length / rows); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLmit) {
      return (
        <li
          key={number}
          id={number}
          onClick={e=>handleClick(e)}
          className={currentPage === number ? "activo" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  //-------------------------------------------------------------------


 
  return books.length?(
    <div >
      <h1>Stock</h1>
     
      <div>

     
         <div id='tableleft'>
                <div >  
                    <h2 >Agregar Stock</h2>             
                    {/* <SuperAdminProSet
                        users={seleccionados}
                        changed={changed}
                        setChanged={setChanged}
                        />            */}
                 <button type='submit' onClick={(e) => handleSubmit(e)} >Agregar</button>
                </div>
        </div> 


        <div >

          <NavLink to='/admin'>
                  <button >Volver</button>
          </NavLink>

          <AdminRefreshBooks />
          <AdminSearchBarBooks />


          <div class='container'>
            <table class='content-table'>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Escritor</th>
                  <th>Editorial</th>
                  <th>Stock</th>
                  <th>Agregar Stock</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((book) => (
                  <tr key={book._id}>


                    <td>{book.title}</td>
                    <td>{book.price}</td>
                    <td>{book.editorial}</td>
                    <td>{book.stock}</td>

                    <td>
                        <input
                        type='number'
                        key={book._id}
                        value={input} 
                        onChange={e=>handleChange(e)} 
                        >
                        </input>

                     
            
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
        {
          <ul>
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                prev
              </button>
            </li>
            {renderPageNumbers}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                next
              </button>
            </li>
          </ul>
        }
      </div>
    </div>
  ) 
  :'loading'
}
