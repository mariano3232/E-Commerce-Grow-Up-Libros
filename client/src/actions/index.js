import axios from "axios";

export function getBooks(){
    return async function (dispatch){
    var json = await axios.get('http://localhost:3001/books');
        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
        })
    }    
}