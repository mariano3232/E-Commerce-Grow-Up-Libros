import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBooksAdmin , setStockUp , setStockChange } from '../../../../actions'
import { Link , NavLink} from 'react-router-dom'
import { animateScroll as scroll, Element } from 'react-scroll'
import { scroller } from 'react-scroll'
import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'
import { gridColumnsSelector } from '@mui/x-data-grid'





export default function StockTable2() {

  const dispatch = useDispatch()
  const books = useSelector((state) => state.booksAdmin)
  const [input , setInput] = useState([])
  const [stockC, setStockC]= useState([])
  const [changed, setChanged] = useState([false])



  function handleSetUp(e) {
    var orderId = {id:e.target.name,stock:e.target.value}
    if (!e.target.value) {
      let seleccion = input.filter((i) => i.id !== orderId.id)    
      setInput(seleccion)
    } else {
      setInput([...input, orderId])
    }
  }




const handleSubmitSetUp = (e) => {
    e.preventDefault();
    dispatch(setStockUp(input));
    setTimeout(function () {
      dispatch(getBooksAdmin())
    }, 500)

    var inputs = document.getElementsByClassName('input')
    console.log('II:',inputs)
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
      console.log('tt:',inputs[i].value)
    }
    setChanged(!changed)
    setInput([]);
}

const handleKeyPressSetUp = (e) => {
  if(e.charCode === 13){
      e.preventDefault();
      dispatch(setStockUp(input));
      setTimeout(function () {
        dispatch(getBooksAdmin())
      }, 500)
      var inputs = document.getElementsByClassName('input')
      console.log('II:',inputs)
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
        console.log('tt:',inputs[i].value)
      }
      setChanged(!changed)
      setInput([]);
   
  }
}

function handleChange(e) {
  var orderId = {id:e.target.name,stock:e.target.value}
  if (!e.target.value) {
    let seleccionChange = stockC.filter((i) => i.id !== orderId.id)    
    setStockC(seleccionChange)
  } else {
    setStockC([...stockC, orderId])
  }
}

const handleSubmitChange = (e) => {
  e.preventDefault();
  dispatch(setStockChange(stockC));
  setTimeout(function () {
    dispatch(getBooksAdmin())
  }, 500)

  var inputs = document.getElementsByClassName('input')
  
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
    
  }
  setChanged(!changed)
  setStockC([]);
}

const handleKeyPressChange = (e) => {
if(e.charCode === 13){
    e.preventDefault();
    dispatch(setStockChange(stockC));
    setTimeout(function () {
      dispatch(getBooksAdmin())
    }, 500)
    var inputs = document.getElementsByClassName('input')
  
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
      
    }
    setChanged(!changed)
    setStockC([]);
  }
}




  useEffect(() => {
    scroll.scrollToTop()
   }, [])


  //------------PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(10); 
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

      <NavLink to='/admin'>
                  <button >Panel Administrador</button>
          </NavLink>

          <Link to='/stocktable'>
            <button >DataGrid</button>
          </Link>

          <Link to='/stock'>
            <button >Formato Cartas</button>
          </Link>



          <AdminRefreshBooks />
          <AdminSearchBarBooks />
     
      <div>

     
         <div id='tableleft'>
                <div >  
                    <h2 >Agregar Stock</h2>             
                 <button type='submit' onClick={(e) => handleSubmitSetUp(e)} >Agregar</button>
                </div>
        </div> 

        <div id='tableleft'>
                <div >  
                    <h2 >Modificar Stock</h2>             
                 <button type='submit' onClick={(e) => handleSubmitChange(e)} >Modificar</button>
                </div>
        </div> 


        <div >

         


          <div class='container'>
            <table class='content-table'>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Editorial</th>
                  <th>Stock</th>
                  <th>Agregar Stock</th>
                  <th>Modificar Stock</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((book) => (
                  <tr key={book._id}>


                    <td>{book.title}</td>
                    <td>{book.editorial}</td>
                    <td>{book.stock}</td>

                    <td>
                        <input
                        className='input'                      
                          type='text'
                          key={book._id}
                          name={book._id}  
                          defaultValue=''                     
                          onChange={e=>handleSetUp(e)} 
                          onKeyPress={(e) => handleKeyPressSetUp(e)}
                        >
                        </input>

                    </td>

                    <td>
                        <input
                         className='input'
                          type='text'
                          key={book._id}
                          name={book._id}  
                          defaultValue=''                     
                          onChange={e=>handleChange(e)} 
                          onKeyPress={(e) => handleKeyPressChange(e)}
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


/*
[{id:3124214214, stock: 50},{id:45345345, stock: 80}]
*/