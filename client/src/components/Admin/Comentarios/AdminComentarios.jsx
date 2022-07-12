import React from "react";
import { useDispatch, useSelector} from 'react-redux'
import { Link ,NavLink } from "react-router-dom";
import './adminComment.css'
import { getComments , hideComment , orderCommentsByDate } from "../../../actions";
import AdminRefreshComments from "../RefreshButtons/AdminRefreshComments";
import AdminSearchBarUserComment from "../SearchBars/AdminSearchBarUserComment";
import AdminSearchBarBooksComment from "../SearchBars/AdminSearchbarBooksComments";
import AdminSearchBarCommentWord from "../SearchBars/AdminSearchBarCommentWord";
import { useEffect } from "react";
import DeleteComments from "./DeleteComments";
import { useState } from "react";
import styles from '../../../Styles/AdminUser2.module.css'


export default function AdminComentarios(){

    const dispatch = useDispatch()
    const comments = useSelector(state=>state.commentsAdmin)

    //  const allBooks = useSelector(state=>state.books)
    //  console.log('allBooks:',allBooks)
    //  const allBooksComments = allBooks.filter(book => book.comments)
    //  console.log('all:',allBooksComments)

     
    // CHECKBOX------------------
  
    const [seleccionados, setSeleccionados] = useState([])
    const [changed, setChanged] = useState(false)
  
    function selectComment(e) {
    var commentId = e.target.value
    if (!e.target.checked) {
    let seleccion = seleccionados.filter((comment) => comment._id !== commentId)
      setSeleccionados(seleccion)
       } else {
     let commentCheck = comments.find((comment) => comment._id === commentId)
         setSeleccionados([...seleccionados, commentCheck])
       }
     }
  
     useEffect(() => {
       var checkeds = document.getElementsByClassName('checkbox')
      for (let i = 0; i < checkeds.length; i++) {
        checkeds[i].checked = false
      }
       setSeleccionados([])
       dispatch(getComments())
   }, [changed])
  
    useEffect(() => {}, [comments])
    
  
    //SWITCH-----------------------------------------
  
    function handleHide(e){
      var commentId = [e.target.value]
      dispatch(hideComment(commentId))
      setTimeout(function () {
        dispatch(getComments())
      }, 500)
    }
   //-------------------------------------------------------------
  
    useEffect(() => {
      dispatch(getComments())
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
  for (let i = 1; i <= Math.ceil(comments.length / rows); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = comments.slice(indexOfFirstItem, indexOfLastItem);
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

  const [order, setOrder] = useState(true)

  function handleOrderByDate(e) {
    //e.preventDefault()
    dispatch(orderCommentsByDate(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }


  
  return currentItems && currentItems.length > 0 ?(
    <div className={styles.containerAll}>
         <h1>Control de Comentarios</h1>
         <div className={styles.containerActions}>
         <div className={styles.containerButtonsActions}>
         <div className={styles.containerUsersData}>
         <NavLink to='/admin'>
            <button >Panel Administrador</button>
         </NavLink>

         <AdminRefreshComments />
         <AdminSearchBarUserComment />
         <AdminSearchBarBooksComment/>
         <AdminSearchBarCommentWord/>

          <DeleteComments
                comments={seleccionados}
                changed={changed}
                setChanged={setChanged}
              />           
             <p>
              <select
                      onChange={(e) => handleOrderByDate(e)}
                      defaultValue='default'
                    >
                      <option value='default' disabled>
                        Orden por Fecha
                      </option>
                      <option  value='desc'>
                       Mas antiguos
                      </option>
                      <option  value='Asc'>
                        Mas nuevos
                      </option>
                    </select>
              </p>
        
        <div class='container'>
            <table class='content-table'>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Libro</th>
                    <th>Comentarios</th>
                    <th>Fecha</th>
                    <th>Bloquear</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                    {currentItems.length 
                     ? currentItems.map(comment=>
                        <tr key={comment._id}>
                            <td>{comment.users.length>0
                                ?
                                <Link to={`/adminuserprofile/${comment.users[0]._id}`}>
                                    {comment.users[0].nickname}
                                </Link>
                                :'No tiene user'}
                            </td> 
                            {comment.books.length>0
                            ?
                            <td>{comment.books[0].title}</td>
                            : 'No tiene Libro'}
                            <td>{comment.comment}</td>
                            <td>{comment.createdAt}</td>
                            <td> {comment.isHidden?
                             <label class='switch'>

                                <input 
                                    type="checkbox"
                                    value={comment._id}
                                    onChange={(e) => handleHide(e)}
                                    defaultChecked={true}
                                    />
                                <span class="slider round"></span>
                                </label>
                                : <label class='switch'>
                                
                                <input 
                                type="checkbox"
                                value={comment._id}
                                onChange={(e) => handleHide(e)}
                                defaultChecked={false}
                                />
                                <span class="slider round"></span>                          
                             </label>}
                            </td>

                            <td class='active'>
                                <input
                                    className='checkbox'
                                    type='checkbox'
                                    value={comment._id}
                                    onChange={(e) => selectComment(e)}
                                    defaultChecked={false}
                                ></input>
                      
                            </td>

                        </tr>)
                        :'N'

                    }
                </tbody>
            </table>
         </div>
         </div>
         {
          <ul className="pageNumbers">
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
    </div>
  ):(
    <div>
    <p>Busqueda sin exito</p>
    <NavLink className={` ${styles.buttonBack}`} to='/admin'>
            <button className={`${styles.button} `}>Volver</button>
    </NavLink>
    </div>
  )
 }
   
    
  
           

           

        
  


/*

// export default function AdminComentarios(){

//     const comments = useSelector(state=>state.commentsAdmin)
//     console.log('comment:',comments)


//     function handleDelete(id) {
//         dispatch(deleteComment(id))
//         alert('Comentario Eliminado')
//         setTimeout(function () {
//           dispatch(getComments()), 500
//         })
//       }

//       function handleHide(id) {
//         dispatch(hideComment(id))
//         alert('Comentario Ocultado')
//         setTimeout(function () {
//           dispatch(getComments()), 500
//         })
//       }

//     return(
//         <div>
//            <h1>COMENTARIOS</h1> 
//            {comments.length 
//            ? comments.map( comment =>
//             <li>
//                <h2 class='text'>{comment.comment}</h2>
//                <div>{comment.users.length>0
//                     ?
//                     <Link to={`/adminuserprofile/${comment.users[0]._id}`}>
//                         {comment.users[0].nickname}
//                     </Link>
//                     :'No tiene user'}
//                 </div> 
//                 <button onClick={()=>handleDelete(comment._id)}>Borrar</button>
//                 <button onClick={()=>handleHide(comment._id)}>Ocultar</button>
//             </li>)
//             :'No hay nada'
//            }           
//         </div>

//     )
// }

*/