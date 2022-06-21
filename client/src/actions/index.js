import axios from "axios";

export function getBooks () {

    return async function (dispatch) {
    const json = await axios.get('https://ecommercehenryx.herokuapp.com/books');
    
    console.log('hola')
        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
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