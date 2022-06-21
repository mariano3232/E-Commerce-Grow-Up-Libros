const initialState = {
  bookDetails: {},
  books: [],
  booksCopy: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BOOKS":
      if (action.price !== undefined) {
        action.price === "Asc"
          ? price.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : price.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });
      } else if (action.title !== undefined) {
        action.title === "Asc"
          ? title.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : title.sort(function (a, b) {
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
        books: action.payload,
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

    default:
      return state;
  }
}

export default rootReducer;
