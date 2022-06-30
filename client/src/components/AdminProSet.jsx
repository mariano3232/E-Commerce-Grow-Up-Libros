import { useDispatch } from "react-redux";
import { setToAdmin ,getUsers } from "../actions";


export default function AdminProSet(props) {
  const dispatch = useDispatch();

  const users = props.users;
  const setChanged = props.setChanged;
  const changed = props.changed;
  //console.log("changed es: ", changed);
  var userIds = [];

  function toogleAdmin(e, users) {
    users.forEach(usuario => {
      userIds.push(  usuario._id );
    });
    setTimeout(function(){
        dispatch(setToAdmin(userIds))
    }, 5000);
    
    
    dispatch(getUsers())
    setChanged(!changed);
   // console.log("changed AHORA ES es: ", changed);
    userIds = [];
  }

  return (
    <div>
      <button onClick={(e) => toogleAdmin(e, users)}>
       Permisos de Administrador
      </button>
    </div>
  );
}