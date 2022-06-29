// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setToAdmin } from "../actions";
// import { postUser } from "../actions";


// export default function CreateAdmin(){

//     const dispatch = useDispatch()
//     const navigate = useNavigate()


//     const usuarios = useSelector( state => state.users )

//     const usuario = useSelector ( state => state.userLogged )

//     function handleClick(id){
//         //console.log('id:',id)       
//         dispatch(setToAdmin(id))
//         alert('Nuevo Admin')
//         navigate('/home')
//         //dispatch(postUser(usuario))       
//     }

    

//     // function handleClickAdmin(id){
//     //     e.preventDefault()
//     //     dispatch(setToUser(id))
//     //     alert('Nuevo Admin')
//     // }

//     return (
//         <div>

//             <div>Create Admin</div>

//             <div>

//                 {usuarios.map(usuario =>{
//                     return(
//                         <li key={usuario._id}>{usuario.name} : {
//                             <button onClick={()=>handleClick(usuario._id)}>{!usuario.isAdmin 
//                             ?'USUARIO'
//                             :'ADMINISTRADOR'}</button>
//                         }</li>
                            
                            
                            
//                     )
//                 })}

//             </div>
            
          
        
    
    
//     </div>
    
//     )
    
// }



 import { useNavigate } from "react-router-dom";
import { postUser, getUsers, setToAdmin } from "../actions";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProSet from "./AdminProSet";



// import SetAdminUser from "./SetAdminUser";
// import BannAdminUser from "./BannUser";
// import ForcePasswordResetButton from "./ForcePSWreset";

// {id: userId, changes:{isAdmin:true}}



export default function AdminUsers(props) {

  const dispatch = useDispatch(); 
  
  const usuarios = useSelector((state) => state.users);

  const [seleccionados, setSeleccionados] = useState([]);

  const [changed, setChanged] = useState(false);

 
  



  function selectUser(e) {
    const userId = e.target.value;
   
    if (!e.target.checked) {
      let seleccionados = uSelected.filter(usuario => usuario._id !== userId);
      setSeleccionados(seleccionados);
    } else {
    const uCheck = usuarios.find(usuario => usuario._id === userId);

      setSeleccionados([...seleccionados, uCheck]);
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
            <AdminProSet
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
             
              <th>Administrador</th>
              <th>check</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
             
             <tr key={usuario.id}>
                <td>{usuario.email}</td>
                <td>{usuario.name}</td>
                
                <td>{usuario.isAdmin ? "Si" : "No"}</td>
                <td>
                  {usuario.isSuperAdmin != "isSuperAdmin"?
                  <input
                  className="checkbox"
                    type="checkbox"
                    value={usuario._id}
                    onChange={(e) => selectUser(e)}
                    defaultChecked={false}
                  ></input> : null}
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




