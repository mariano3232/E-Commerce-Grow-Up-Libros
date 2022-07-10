import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from '../../../Styles/adminUserProfile.module.css'
import { NavLink } from 'react-router-dom'
import style from '../../../Styles/AdminUser2.module.css'
import { Link } from 'react-router-dom'
import AdminOrderStatusCancelled from '../Orders/ManejoDeEstados/AdminOrderStatusCancelled'
import AdminOrderStatusProcessing from '../Orders/ManejoDeEstados/AdminOrderStatusProcessing'
import AdminOrderStatusCreated from '../Orders/ManejoDeEstados/AdminOrderStatusCreated'
import AdminOrderStatusComplete from '../Orders/ManejoDeEstados/AdminOrderStatusComplete'
import { getAllOrders, getUsers , deleteUser , orderByDate} from '../../../actions'
import AdminSearchBarStatusOrders from '../SearchBars/AdminSearchBarStatusOrders'
import AdminSearchBarPaymentStatus from '../SearchBars/AdminSearchBarPaymentStatus'
import AdminRefreshOrders from '../RefreshButtons/AdminRefreshOrders'
import { animateScroll as scroll, Element } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import Alert from "../../../functions/Alert";


export default function AdminUserProfile() {
  const id = useParams().id;
  // console.log('id:',id)

  const allUsers = useSelector((state) => state.users);
  // console.log('allUsers:',allUsers)

  const usuario = allUsers.filter((usuario) => usuario._id === id)[0];
  // console.log('usuario:',usuario)

  const allOrders = useSelector((state) => state.orders);
  //  console.log('allOrders:',allOrders)

  //const userOrders = allOrders.filter(order => order.usuario[0]._id === id)

  const ordersWithUsers = allOrders.filter((order) => order.usuario.length > 0);

  const userOrders = ordersWithUsers.filter(
    (order) => order.usuario[0]._id === id
  );

  //console.log('userOrders:',userOrders)


  const userL = useSelector(state => state.userLogged)

  const navigate = useNavigate()
 

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  //Manejo de estado de la orden-------------------------------------------------------

  const dispatch = useDispatch();

  const [seleccionados, setSeleccionados] = useState([]);

  const [changed, setChanged] = useState(false);

  function selectOrder(e) {
    var orderId = e.target.value;
    console.log("estoy:", orderId);
    if (!e.target.checked) {
      let seleccion = seleccionados.filter((order) => order._id !== orderId);
      setSeleccionados(seleccion);
    } else {
      let orderCheck = userOrders.find((order) => order._id === orderId);
      setSeleccionados([...seleccionados, orderCheck]);
    }
  }

  useEffect(() => {
    var checkeds = document.getElementsByClassName("checkbox");
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setSeleccionados([]);
    dispatch(getAllOrders());
  }, [changed]);

  useEffect(() => {}, [userOrders]);
  //----------------------------------------------------------------------

  //------------PAGINADO------------------------------------------------
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
  for (let i = 1; i <= Math.ceil(userOrders.length / rows); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = userOrders.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLmit) {
      return (
        <li
          key={number}
          id={number}
          onClick={(e) => handleClick(e)}
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

  function handleDeleteUser(id) {
    dispatch(deleteUser(id));
    Alert("Usuario Eliminado", "success");
    navigate("/admin");
    dispatch(getUsers());
  }
  const [order, setOrder] = useState(true);

  function handleOrderByDate(e) {
    //e.preventDefault()
    dispatch(orderByDate(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

});
//-------------------------------------------------------------------

function handleDeleteUser(id) {
  dispatch(deleteUser(id))
  alert('Usuario Eliminado')
  navigate('/admin')
  dispatch(getUsers())
}

const [order, setOrder] = useState(true)


function handleOrderByDate(e) {
  //e.preventDefault()
  dispatch(orderByDate(e.target.value))
  setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
}


  return (
    <div className={styles.containerAdminProfile}>
      <Link to="/adminusers2">
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>

      <h1>Manejo Perfil de Usuario</h1>

      <div className={styles.containerAdmin}>
        <p className={styles.h2}>Name: {usuario.name}</p>
        <p className={styles.h2}>Surname: {usuario.surname}</p>
        <p className={styles.h2}>Email: {usuario.email}</p>
        <p className={styles.h2}>Dni: {usuario.dni}</p>
        <p className={styles.h2}>Nickname: {usuario.nickname}</p>
        <p className={styles.h2}>Birthday: {usuario.birthday}</p>
        <p className={styles.h2}>Country: {usuario.country}</p>
        <p className={styles.h2}>Phone: {usuario.phone}</p>
        <p className={styles.h2}>Address: {usuario.address}</p>
      </div>

      {userL[0].isAdminOrders === true ? (
        <div>
          <div>
            <h2>ORDENES</h2>

            <NavLink className={` ${style.buttonBack}`} to="/adminorders">
              <button className={`${style.button} `}>
                Ver Las Ordenes de Todos Los Usuarios
              </button>
            </NavLink>

            <AdminRefreshOrders />
            <AdminSearchBarStatusOrders />
            <AdminSearchBarPaymentStatus />

            <p>
              <select
                onChange={(e) => handleOrderByDate(e)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Orden por Fecha
                </option>
                <option value="desc">Mas antiguas</option>
                <option value="Asc">Mas nuevas</option>
              </select>
            </p>

            <AdminOrderStatusCreated
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminOrderStatusProcessing
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminOrderStatusComplete
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminOrderStatusCancelled
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />

            <div class="container">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Nº Orden</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado de Pago</th>
                    <th>Estado de Orden</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length > 0 &&
                    currentItems.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <Link to={`/adminorderdetails/${order._id}`}>
                            {order._id}
                          </Link>
                        </td>

                        <td>{order.fecha}</td>

                        <td>{order.total}</td>

                        <td>{order.status}</td>

                        <td>{order.status_order}</td>

                        <td>
                          <input
                            className="checkbox"
                            type="checkbox"
                            value={order._id}
                            onChange={(e) => selectOrder(e)}
                            defaultChecked={false}
                          ></input>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
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
      ) : (
        ""
      )}

      <button onClick={() => handleDeleteUser(id)}>Eliminar Usuario</button>
    </div>
  );
}
