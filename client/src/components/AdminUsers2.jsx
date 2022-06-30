import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postUser, getUsers, setToAdmin } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import AdminProSet from "./AdminProSet";
import AdminUserChangePlan from "./AdminUserChangePlan";
import AdminUserBanned from "./AdminUserBanned";
import AdminUserProfile from "./AdminUserProfile";



// import SetAdminUser from "./SetAdminUser";
// import BannAdminUser from "./BannUser";
// import ForcePasswordResetButton from "./ForcePSWreset";

// {id: userId, changes:{isAdmin:true}}



export default function AdminUsers2(props) {

  const dispatch = useDispatch(); 
  
  const usuarios = useSelector((state) => state.users);

  const [seleccionados, setSeleccionados] = useState([]);

  const [changed, setChanged] = useState(false);

 
  
  function selectUser(e) {
    const userId = e.target.value;
   
    if (!e.target.checked) {
      const seleccion = seleccionados.filter(usuario => usuario._id !== userId);
      setSeleccionados(seleccion);
    } else {
    const usuarioCheck = usuarios.find(usuario => usuario._id === userId);

      setSeleccionados([...seleccionados, usuarioCheck]);
    }
}
  


  useEffect(() => {
    const checkeds = document.getElementsByClassName("checkbox");
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setSeleccionados([]);
    dispatch(getUsers());
  }, [changed]);

  useEffect(() => {}, [usuarios]);

  return usuarios.length > 0 ? (
    <div >
      <h1 >Control de usuarios</h1>
      <div >
        <div id="tableleft">
           <div >
            <AdminUserChangePlan
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div> 

          <div >
            <AdminUserBanned
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div> 

          <div >
            <AdminUserProfile
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div> 
      
        </div>

        <table id="tableright">
          <thead class="thead-warning">
            <tr>
              <th>Email</th>
              <th>Usuario</th>
             
              <th>Plan</th>
              <th>Estado</th>
              <th>Administrador</th>
              <th>check</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
             
             <tr key={usuario.id}>
                <td>{usuario.email}</td>

                <td>{usuario.name}</td>

                <td>{usuario.isPremium
                ?'Premium'
                :'Standar'}</td>

                <td>{usuario.isBanned
                ?'Bloqeuado'
                :'Activo'}</td>
                
                
                <td>{usuario.isAdmin ? "Si" : "No"}</td>
                <td>

                  
                  <input
                  className="checkbox"
                    type="checkbox"
                    value={usuario._id}
                    onChange={(e) => selectUser(e)}
                    defaultChecked={false}
                  ></input> 

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}




