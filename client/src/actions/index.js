import axios from "axios";

export function getBooks () {

    return async function (dispatch) {
    const json = await axios.get('https://ecommercehenryx.herokuapp.com/books');
    
    console.log('soy json', json)

        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
        })
    } 
}
export function getBookDetails(id){
    return async function (dispatch){
        var json=await axios.get('https://ecommercehenryx.herokuapp.com/books/'+id)
        console.log('detalles :',json.data)
        return dispatch({
            type:'GET_BOOK_DETAILS',
            payload:json.data
        })
    }    
}

export function getBookTitle (title) {

    return async function (dispatch) {
        const json = await axios.get();

        return {
            type: 'GET_BOOK_TITLE',
            payload: json.data
        }
    }
}