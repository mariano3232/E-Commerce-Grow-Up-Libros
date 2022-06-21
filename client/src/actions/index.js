import axios from "axios";

export const getBooks = (title, price, rating) => async (dispatch) => {
  try {
    var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
    return dispatch({
      title: title,
      price: price,
      rating: rating,
      type: "GET_BOOKS",
      payload: json.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_MESSAGE",
      payload: error,
    });
  }
};
export function getBookDetails(id) {
  return async function (dispatch) {
    var json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/books/" + id
    );
    console.log("detalles :", json.data);
    return dispatch({
      type: "GET_BOOK_DETAILS",
      payload: json.data,
    });
  };
}

export function getBookTitle(title) {
  return async function (dispatch) {
    const json = await axios.get();

    return {
      type: "GET_BOOK_TITLE",
      payload: json.data,
    };
  };
}

export function getBookGenre(value) {
  return async function (dispatch) {
    const json = await axios.get();

    return {
      type: "GET_BOOK_GENRE",
      payload: json.data,
    };
  };
}
