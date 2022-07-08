import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminProSet from './Permisos/AdminProSet'
import { getUsers, postUser, setToAdmin, setToAdminStock, setToSuperAdmin , setToAdminData, setToAdminUsers, setToAdminOrders, setToAdminMarketing} from '../../actions'
import { Link , NavLink} from 'react-router-dom'
import SuperAdminProSet from './Permisos/SuperAdminProSet'
import AdminSearchBarUser from '../Admin/SearchBars/AdminSearchBarUser'
import AdminRefreshUsers from '../Admin/RefreshButtons/AdminRefreshUser'
import AdminDataSet from './Permisos/AdminDataSet'
import AdminUsersSet from './Permisos/AdminUsersSet'
import AdminStockSet from './Permisos/AdminStockSet'
import AdminOrdersSet from './Permisos/AdminOrdersSet'
import AdminMarketingSet from './Permisos/AdminMarketingSet'
import { animateScroll as scroll, Element } from 'react-scroll'
import styles from '../../Styles/createAdmin.module.css'
import './createAdmin.css'




// {id: userId, changes:{isAdmin:true}}

export default function CreateAdmin(props) {

  const dispatch = useDispatch()

  const usuarios = useSelector((state) => state.users)



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

  //CON SWITCH-----------------------------------------

  function changeSuperAdmin(e){
    var userId = [e.target.value]
    dispatch(setToSuperAdmin(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function changeAdmin(e){
    var userId = [e.target.value]
    dispatch(setToAdmin(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function changeData(e){
    var userId = [e.target.value]
    dispatch(setToAdminData(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function changeStock(e){
    var userId = [e.target.value]
    dispatch(setToAdminStock(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  
  function changeUsers(e){
    var userId = [e.target.value]
    dispatch(setToAdminUsers(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function changeOrders(e){
    var userId = [e.target.value]
    dispatch(setToAdminOrders(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  function changeMarketing(e){
    var userId = [e.target.value]
    dispatch(setToAdminMarketing(userId))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
  }

  
  //-------------------------------------------------------------

  useEffect(() => {
    dispatch(getUsers())
  }, [])



  useEffect(() => {
    scroll.scrollToTop()
  }, [])


 
  return usuarios.length > 0 ? (
    <div className={styles.containerAll}>
      <h1>Control de Administradores</h1>
      <h2>Quitar/Otorgar Permisos</h2>
      <div className={styles.containerActions}>

     
        {/* <div id='tableleft'>
          <div className={styles.containerButtonsActions}>  */}

          {/* <h2 className={styles.h2}>Otorgar/Quitar Permisos Para Administrar:</h2>
          
           <SuperAdminProSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminProSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <AdminDataSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <AdminStockSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <AdminUsersSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <AdminOrdersSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <AdminMarketingSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <ToggleSwitch/>

            <Apps/>
           */}
          {/* </div>
        </div> */}
        <div className={styles.containerUsersData}>

          <NavLink className={` ${styles.buttonBack}`} to='/adminpro'>
                  <button className={`${styles.button} `}>Volver</button>
          </NavLink>

          <AdminRefreshUsers />
          <AdminSearchBarUser />
          <div class='container'>
            <table class='content-table'>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Usuario</th>
                  <th>Pro</th>
                  <th>Administrador</th>
                  <th>Data</th>
                  <th>Stock</th>
                  <th>Users</th>
                  <th>Orders</th>
                  <th>Marketing</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>

                    <td>
                      <Link to={`/adminproperfilusuarios/${usuario._id}`}>
                        {usuario.email}
                      </Link>
                    </td>

                    <td>{usuario.name}</td>

                   
                    
                    
                    
                    <td> {usuario.isSuperAdmin?
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeSuperAdmin(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeSuperAdmin(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                      </label>}
                    </td>

                    


                    <td> {usuario.isAdmin?
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeAdmin(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeAdmin(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                      </label>}
                    </td>

                    <td> {usuario.isAdminData?
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeData(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeData(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                      </label>}
                    </td>



                    <td> {usuario.isAdminStock?
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeStock(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeStock(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                      </label>}
                    </td>


                    <td>{usuario.isAdminUsers ?  
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeUsers(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeUsers(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                      </label>}
                    </td>

                    <td>{usuario.isAdminOrders ?  
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeOrders(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeOrders(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                        </label>}
                      </td>


                    <td>{usuario.isAdminMarketing ? 
                      <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeMarketing(e)}
                          defaultChecked={true}
                           />
                         <span class="slider round"></span>
                         
                         </label>
                         : <label class='switch'>
                         <input 
                          type="checkbox"
                          value={usuario._id}
                          onChange={(e) => changeMarketing(e)}
                          defaultChecked={false}
                           />
                         <span class="slider round"></span>
                         
                        </label>}
                      </td>
                    
                    {/* <td class='active'>
                      {usuario.isSuperAdmin != 'isSuperAdmin' ? (
                        <input
                          className='checkbox'
                          type='checkbox'
                          value={usuario._id}
                          onChange={(e) => selectUser(e)}
                          defaultChecked={false}
                        ></input>
                      ) : null}
                    </td> */}
                    <div>
                    {/* <td>

                    {usuario.isSuperAdmin != 'isSuperAdmin' ? (
                         <label class='switch'>
                         <input type="checkbox"/>
                         <span class="slider round"></span>
                         </label>
                      ) : null}
                      
                   
                      </td> */}
                      </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}
