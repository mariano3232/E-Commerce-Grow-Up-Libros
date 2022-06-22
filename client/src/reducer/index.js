const initialState = {
    books: [],
    booksCopy: [],
    bookDetails:{},
    authors: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_BOOKS':
            return{
                ...state,
                books: action.payload,
                booksCopy: action.payload,
            }
        case 'GET_BOOK_DETAILS':
            return{
                ...state,
                bookDetails:action.payload
            }

        case 'GET_BOOK_TITLE':
            return {
                ...state,
                books: action.payload
            }

        case 'GET_BOOK_GENRE':
            return {
                ...state,
                books: action.payload
            }

        case 'POST_BOOK':
            return({
                ...state,
                books:[...state.books,action.payload],
                booksCopy:[...state.booksCopy,action.payload]                        
            })


        case 'POST_AUTHOR':
            return({
                ...state,
                authors:[...state.books,action.payload],
                //booksCopy:[...state.booksCopy,action.payload]                        
            })
            
        default:
            return state;
    }
}

export default rootReducer;