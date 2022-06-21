const initialState = {
    books: [],
    booksCopy: [],
    details:{},
}
function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_BOOKS':
            return{
                ...state,
                books: action.payload,
                booksCopy: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details:action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;