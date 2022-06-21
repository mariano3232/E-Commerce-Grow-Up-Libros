import axios from "axios";

export function getBooks(){
    return async function (dispatch){
    var json = await axios.get('https://ecommercehenryx.herokuapp.com/books');
    console.log('hola')
        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
        })
    } 
}
export function getDetails(id){
    return async function (dispatch){
        var json=await axios.get('https://ecommercehenryx.herokuapp.com/books/'+id)
        console.log('detalles :',json.data)
        return dispatch({
            type:'GET_DETAILS',
            payload:json.data
        })
    }
}