import { useDispatch } from "react-redux";
import { setUserPlan ,getUsers } from "../actions";


export default function AdminUserChangePlan({users , setChanged , changed}) {
  const dispatch = useDispatch();

  var userIds = [];

  function toogleAdmin(e, users) {
    users.map(usuario => {
      userIds.push(  usuario._id );
    });
    
        dispatch(setUserPlan(userIds))
  
    
    
    dispatch(getUsers())
    setChanged(!changed);
   // console.log("changed AHORA ES es: ", changed);
    userIds = [];
  }

  return (
    <div>
      <button onClick={(e) => toogleAdmin(e, users)}>
       Cambiar Plan
      </button>
    </div>
  );
}