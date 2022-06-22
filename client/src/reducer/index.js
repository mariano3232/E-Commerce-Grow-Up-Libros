const initialState = {
    books: [],
    booksCopy: [],
    bookDetails: {},
    authors: [],
    authorDetails: [],
}
console.log('estado global', initialState.authorDetails);
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

            const titleCopy = state.booksCopy;
            const title = titleCopy.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()));

            return {
                ...state,
                books: title
            }

        case 'GET_BOOK_GENRE':
            
            return {
                ...state,
                books: action.payload
            }
        
        case 'GET_AUTHORS':

            return {
                ...state,
                authors: action.payload
            }

        case 'GET_AUTHOR_DETAILS':

            return {
                ...state,
                authorDetails: action.payload
            }
            
        default:
            return state;
    }
}

export default rootReducer;