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

export function getBookTitle(title) {
  return async function (dispatch) {
    const json = await axios.get();

    return {
      type: "GET_BOOK_TITLE",
      payload: json.data,
    };
  };
}
