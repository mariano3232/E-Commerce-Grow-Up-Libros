import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserNewsLetter,getUsers } from "../../actions";


export default function AdminUserNewsLetter({users , setChanged , changed}) {
  const dispatch = useDispatch();

  var userIds = [];

  function toogleAdmin(e, users) {
    users.map(usuario => {
      userIds.push(  usuario._id );
    });
   dispatch(setUserNewsLetter(userIds))

  setTimeout(function(){
    dispatch(getUsers())
  }, 500);
 
    setChanged(!changed);

    userIds = [];
  }


  return (
    <div>
      <button onClick={(e) => toogleAdmin(e, users)}>
       Suscribir/Desuscribir NewsLetter
      </button>
    </div>
  );
}