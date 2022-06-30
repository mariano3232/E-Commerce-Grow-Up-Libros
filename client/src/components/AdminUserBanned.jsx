import { useDispatch } from "react-redux";
import { setUserBanned ,getUsers } from "../actions";



export default function AdminUserBanned({users , setChanged , changed}) {
  const dispatch = useDispatch();

  const userIds = [];

  function toogleAdmin(e, users) {
    users.map(usuario => {
      userIds.push(  usuario._id );
    });
    setTimeout(function(){
        dispatch(setUserBanned(userIds))
    }, 5000);
    
    
    dispatch(getUsers())
    setChanged(!changed);
    userIds = [];
  }

  return (
    <div>
      <button onClick={(e) => toogleAdmin(e, users)}>
       Bloquear/Desbloquear Usuario
      </button>
    </div>
  );
}