const initialState = {
  bookDetails: {},
  books: [],
  booksCopy: [],
  authors: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BOOKS":
      const allBooks = action.payload;
      let booksOrder =
        action.genres === "All"
          ? allBooks
          : allBooks.filter((element) =>
              element.genres.find((e) => e.genres === action.genres)
            );
      if (action.price !== undefined) {
        booksOrder =
          action.price === "Asc"
            ? booksOrder.sort(function (a, b) {
                if (a.price > b.price) {
                  return 1;
                }
                if (b.price > a.price) {
                  return -1;
                }
                return 0;
              })
            : booksOrder.sort(function (a, b) {
                if (a.price > b.price) {
                  return -1;
                }
                if (b.price > a.price) {
                  return 1;
                }
                return 0;
              });
      } else if (action.title !== undefined) {
        booksOrder =
          action.title === "Asc"
            ? booksOrder.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return 1;
                }
                if (b.title.toLowerCase() > a.title.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : booksOrder.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return -1;
                }
                if (b.title.toLowerCase() > a.title.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
      } /* else {
        action.rating === "Asc"
          ? rating.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : rating.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      } */
      return {
        ...state,
        books: booksOrder,
        booksCopy: action.payload,
      };
    case "GET_BOOK_TITLE":
      return {
        ...state,
        books: action.payload,
      };
    case "GET_BOOK_DETAILS":
      return {
        ...state,
        bookDetails: action.payload,
      };

    case "GET_BOOK_TITLE":
      return {
        ...state,
        books: action.payload,
      };

    case "GET_BOOK_GENRE":
      return {
        ...state,
        books: action.payload,
      };
    case "ERROR_MESSAGE":
      alert(action.payload);
      return {
        ...state,
        food: {},
      };

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
