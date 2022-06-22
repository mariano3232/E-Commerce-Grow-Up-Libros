import axios from "axios";

export function getBooks () {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/books');
    
        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
        })
    } 
}
export function getBookDetails(id){
    return async function (dispatch){
        var json=await axios.get('https://ecommercehenryx.herokuapp.com/books/'+id)
        
        return dispatch({
            type:'GET_BOOK_DETAILS',
            payload:json.data
        })
    }    
}

export function getBookTitle (payload) {

    /* return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/books'); 
    }*/
        return {
            type: 'GET_BOOK_TITLE',
            payload: payload
        }
    
}

export function getBookGenre (value) {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/books/genre/' + value);

        return dispatch ({
            type: 'GET_BOOK_GENRE',
            payload: json.data
        })
    }
}

export function getAuthors () {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/authors');

        return dispatch ({
            type: 'GET_AUTHORS',
            payload: json.data
        })
    }
}

export function getAuthorDetails (id) {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/authors/' + id);
       
        return dispatch ({
            type: 'GET_AUTHOR_DETAILS',
            payload: json.data
        })
    }
}