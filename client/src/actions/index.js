import { gridColumnPositionsSelector } from "@mui/x-data-grid";
import axios from "axios";

//BOOKS
export function getBooks() {
  return async function (dispatch) {
    var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
    return dispatch({
      type: "GET_BOOKS",
      payload: json.data,
    });
  };
}

export function getBookDetails(id) {
  return async function (dispatch) {
    var json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/books/" + id
    );

    return dispatch({
      type: "GET_BOOK_DETAILS",
      payload: json.data,
    });
  };
}
export function getBookComments(id){
  return async (dispatch)=>{
    let allComments=await axios('https://ecommercehenryx.herokuapp.com/comments');
    let comments=allComments.data.filter(e=>e.books[0]._id===id)

    return dispatch({
      type:'GET_BOOK_COMMENTS',
      payload:comments
    })
  }
}

export function getComments(){
  return async (dispatch)=>{
    var json=await axios('https://ecommercehenryx.herokuapp.com/comments');

    return dispatch({
      type:'GET_COMMENTS',
      payload:json.data
    })
  }
}

export function deleteComment(payload){
  console.log('ee:',payload)
  return async (dispatch)=>{
    var json=await axios.delete
    ('https://ecommercehenryx.herokuapp.com/comments/adminDeleteComments',
    {data: payload});

    return dispatch({
      type:'DELETE_COMMENTS',
   
    })
  }
}


export function hideComment(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/comments/toggleComment",
      payload
    );
    return dispatch({
      type: 'HIDE_COMMENTS',
    });
  };
}


export function clearComments(){
  return (dispatch)=>{
    
    return dispatch({
      type:'CLEAR_COMMENTS',
      payload:'a'
    })
  }
}

export function getBookTitle(payload) {
  return {
    type: "GET_BOOK_TITLE",
    payload: payload,
  };
}

export function getBookGenre(value) {
  return async function (dispatch) {
    const json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/books/genre/" + value
    );

    return dispatch({
      type: "GET_BOOK_GENRE",
      payload: json.data,
    });
  };
}

export function clearPageBookDetails() {
  return {
    type: "CLEAR_PAGE_BOOK_DETAILS",
  };
}

//AUTHOR

export function getAuthors() {
  return async function (dispatch) {
    const json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/authors"
    );

    return dispatch({
      type: "GET_AUTHORS",
      payload: json.data,
    });
  };
}

export function getAuthorName(payload) {
  return {
    type: "GET_AUTHOR_NAME",
    payload: payload,
  };
}

export function getAuthorDetails(id) {
  return async function (dispatch) {
    const json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/authors/" + id
    );

    return dispatch({
      type: "GET_AUTHOR_DETAILS",
      payload: json.data,
    });
  };
}

export function clearPageAuthorDetails() {
  return {
    type: "CLEAR_PAGE_AUTHOR_DETAILS",
  };
}

//ADMIN - BOOKS

export function getBooksAdmin() {
  return async function (dispatch) {
    var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
    return dispatch({
      type: "GET_BOOKS_ADMIN",
      payload: json.data,
    });
  };
}

export function getBookTitleAdmin(payload) {
  return {
    type: "GET_BOOK_TITLE_ADMIN",
    payload: payload,
  };
}

//ADMIN - AUTHORS
export function getAuthorsAdmin() {
  return async function (dispatch) {
    var json = await axios.get("https://ecommercehenryx.herokuapp.com/authors");
    return dispatch({
      type: "GET_AUTHORS_ADMIN",
      payload: json.data,
    });
  };
}

export function getAuthorNameAdmin(payload) {
  return {
    type: "GET_AUTHOR_NAME_ADMIN",
    payload: payload,
  };
}

//ADMIN OCULTAR DATA

export function showBook(id) {
  console.log("Show en action:", id);
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/books/showBook/${id}`
    );
    console.log(json.data);
    return dispatch({
      type: "SHOW_BOOK",
    });
  };
}

export function hideBook(id) {
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/books/hideBook/${id}`
    );
    return dispatch({
      type: "HIDE_BOOK",
    });
  };
}

export function showAuthor(id) {
  console.log("Show en action:", id);
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/authors/showAuthor/${id}`
    );
    console.log(json.data);
    return dispatch({
      type: "SHOW_AUTHOR",
    });
  };
}

export function hideAuthor(id) {
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/authors/hideAuthor/${id}`
    );
    return dispatch({
      type: "HIDE_AUTHOR",
    });
  };
}


export function allHide() {
 
    return {
      type: "ALL_HIDE", 
    };
  };

  export function allShow() {
 
    return {
      type: "ALL_SHOW", 
    };
  };

  export function allAuthorShow() {
 
    return {
      type: "ALL_AUTHOR_SHOW", 
    };
  };


  export function allAuthorHide() {
 
    return {
      type: "ALL_AUTHOR_HIDE", 
    };
  };







//ADMIN BORRAR DATA
export function deleteBook(id) {
  return async function (dispatch) {
    const json = await axios.delete(
      `https://ecommercehenryx.herokuapp.com/books/deleteBook/${id}`
    );
    return dispatch({
      type: "DELETE_BOOK",
    });
  };
}

export function deleteAuthor(id) {
  return async function (dispatch) {
    const json = await axios.delete(
      `http://ecommercehenryx.herokuapp.com/authors/deleteAuthor/${id}`
    );
    return dispatch({
      type: "DELETE_AUTHOR",
    });
  };
}

//ADMIN  MODIFICA DATA(PUT) - BOOK Y AUTHOR

export function putAuthor(payload, id) {
  return async function (dispatch) {
    const json = await axios.post(
      `http://ecommercehenryx.herokuapp.com/authors/update/${id}`,
      payload
    );
    return dispatch({
      type: "PUT_AUTHOR",
    });
  };
}

export function putBook(payload, id) {
  return async function (dispatch) {
    const json = await axios.post(
      `http://ecommercehenryx.herokuapp.com/books/update/${id}`,
      payload
    );
    console.log("stockM:", json.data);
    return dispatch({
      type: "PUT_BOOK",
    });
  };
}

//ADMIN - AGREGAR DATA (POST) BOOK Y AUTHOR

export function postBook(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/books/addBook",
      payload
    );
    console.log("libroAction:", json.data);
    return dispatch({
      type: "POST_BOOK",
      payload: payload,
    });
  };
}

export function postAuthor(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/authors/addAuthor",
      payload
    );
    console.log("autorAction:", json.data);
    return dispatch({
      type: "POST_AUTHOR",
      payload: payload,
    });
  };
}

//ADMIN STOCK UP


export function setStockUp(payload) {
  return async function (dispatch) {
    console.log('payStock:',payload)
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/books/updateStock/stockUp",
      payload
    );
    return dispatch({
      type: "SET_STOCK_UP",
      
    });
  };
}


export function setStockChange(payload) {
  return async function (dispatch) {
    console.log('payStock:',payload)
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/books/updateStock/stock",
      payload
    );
    return dispatch({
      type: "SET_STOCK_CHANGE",
      
    });
  };
}

//ORDENAMIENTO

export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload: payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload: payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}

export function orderByNameAuthor(payload) {
  return {
    type: "ORDER_BY_NAME_AUTHOR",
    payload: payload,
  };
}

//ADMIN - ORDENAMIENTO

export function orderByNameAdminAuthor(payload) {
  return {
    type: "ORDER_BY_NAME_ADMIN_AUTHOR",
    payload: payload,
  };
}

export function orderByNameAdminBooks(payload) {
  return {
    type: "ORDER_BY_NAME_ADMIN_BOOKS",
    payload: payload,
  };
}

export function orderByStockAdminBooks(payload) {
  return {
    type: "ORDER_BY_STOCK_ADMIN_BOOKS",
    payload: payload,
  };
}

//USER

export function getUsers() {
  return async function (dispatch) {
    const json = await axios.get("https://ecommercehenryx.herokuapp.com/users");
    //console.log('///users:',json.data)
    return dispatch({
      type: "GET_USERS",
      payload: json.data,
    });
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/addUser",
      payload
    );
    return dispatch({
      type: "POST_USER",
      payload: json.data,
    });
  };
}

export function postUserData(id, payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/users/updateUser/${id}`,
      payload
    );
    console.log("soyjson.dataction", json.data);
    return dispatch({
      type: "POST_USER_DATA",
    });
  };
}

export function getUserName(payload) {
  return {
    type: "GET_USER_NAME",
    payload: payload,
  };
}



export function getUserNameOrders(payload) {
  return {
    type: "GET_USER_NAME_ORDERS",
    payload: payload,
  };
}

export function getUserNameComment(payload) {

  return {
    type: "GET_USER_NAME_COMMENT",
    payload: payload,
  };
}



export function getBookNameComment(payload) {
  return {
    type: "GET_BOOK_NAME_COMMENT",
    payload: payload,
  };
}


export function getWordComment(payload) {
  return {
    type: "GET_WORD_COMMENT",
    payload: payload,
  };
}



export function deleteUser(id) {
  return async function (dispatch) {
    const json = await axios.delete(
      `https://ecommercehenryx.herokuapp.com/users/deleteUser/${id}`
    );
    return dispatch({
      type: "DELETE_USER",
    });
  };
}




//COMPRAS

export function addToCart(id) {
  console.log("id en action :", id);
  return async (dispatch) => {
    const book = await axios.get(
      "https://ecommercehenryx.herokuapp.com/books/" + id
    );
    //console.log("book en action :", book);
    return dispatch({
      type: "ADD_TO_CART",
      payload: book.data,
    });
  };
}
export function removeOneFromCart(id) {
  return (dispatch) => {
    return dispatch({
      type: "REMOVE_ONE_FROM_CART",
      payload: id,
    });
  };
}
export function removeAllFromCart(id) {
  return (dispatch) => {
    return dispatch({
      type: "REMOVE_ALL_FROM_CART",
      payload: id,
    });
  };
}
export function updateAmount(amount){
  return (dispatch)=>{
    return dispatch({
      type:'UPDATE_AMOUNT',
      payload:amount
    })
  }

}

export function clearCart() {
  return (dispatch) => {
    return dispatch({
      type: "CLEAR_CART",
      payload: "nada",
    });
  };
}

export function purchaseOrder(payload) {
  
  return (dispatch) => {
    return dispatch({
      type: "PURCHASE_ORDER",
      payload: payload,
    });
  };
}

export function addToCartPurchaseOrder(payload) {
  
  return (dispatch) => {
    return dispatch({
      type: "ADD_TO_CART_PURCHASE_ORDER",
      payload: payload,
    });
  };
}

export function removeOneFromCartPurchaseOrder(payload) {
  
  return (dispatch) => {
    return dispatch({
      type: "REMOVE_ONE_FROM_CART_PURCHASE_ORDER",
      payload: payload,
    });
  };
}

export function removeAllFromCartPurchaseOrder(payload) {
  
  return (dispatch) => {
    return dispatch({
      type: "REMOVE_ALL_FROM_CART_PURCHASE_ORDER",
      payload: payload,
    });
  };
}

//ADMIN PRO y SuperAdmin

export function setToAdmin(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdmin",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN",
    });
  };
}

export function setToSuperAdmin(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleSuperAdmin",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN",
    });
  };
}

export function setToAdminData(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminData",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_DATA",
    });
  };
}

export function setToAdminStock(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminStock",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_STOCK",
    });
  };
}

export function setToAdminUsers(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminUsers",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_USERS",
    });
  };
}

export function setToAdminOrders(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminOrders",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_ORDERS",
    });
  };
}

export function setToAdminMarketing(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminMarketing",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_MARKETING",
    });
  };
}

export function setToAdminComments(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminComments",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_COMMENTS",
    });
  };
}

export function setToAdminVentas(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleAdminVentas",
      payload
    );
    return dispatch({
      type: "SET_TO_ADMIN_VENTAS",
    });
  };
}

//USUARIO: MODIFICAR ESTADO, PLAN Y NEWSLETTER  'https://ecommercehenryx.herokuapp.com/users/togglePremium'

export function setUserBanned(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleBanned",
      payload
    );
    return dispatch({
      type: "SET_USER_BANNED",
    });
  };
}

export function setUserPlan(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/togglePremium",
      payload
    );
    return dispatch({
      type: "SET_USER_PLAN",
    });
  };
}

export function setUserNews(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "https://ecommercehenryx.herokuapp.com/users/toggleNewsletter",
      payload
    );
    return dispatch({
      type: "SET_USER_NEWS",
    });
  };
}

//FAVORITOS

export function addFav(payload, id) {
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/users/addDesiredBooks/${payload}/${id}`
    );
    console.log('actionAddFav:',json.data)

    return dispatch({
      type: "ADD_FAV",
      payload: json.data,
    });
  };
}

export function deleteBookFav(payload, id) {
  return async function (dispatch) {
    const json = await axios.post(
      `https://ecommercehenryx.herokuapp.com/users/deleteDesiredBooks/${payload}/${id}`
    );
 console.log('deleteBookFAv:',json.data)
    return dispatch({
      type: "DELETE_BOOK_FAV",
      payload: json.data,
    });
  };
}

//RATING

export function putRating(idBook, rating, userId) {
  console.log("Action:", idBook, rating, userId);
  return async function (dispatch) {
    const response = await axios.post(
      `https://ecommercehenryx.herokuapp.com/books/updateRating/${idBook}/${rating}/${userId}`
    );
    return dispatch({
      type: "PUT_RATING",
      payload: response.data,
    });
  };
}

//CARRUSEL

export function getCarouselImages() {
  return async function (dispatch) {
    const images = await axios.get(
      "https://ecommercehenryx.herokuapp.com/carrousel"
    );
    return dispatch({
      type: "GET_CAROUSEL_IMAGES",
      payload: images.data,
    });
  };
}
// export function carouselDelete(id){
//   return async function (dispatch){
//     await axios.delete()
//   }

// }


//ORDERS

export function getAllOrders() {
  
  return async function (dispatch) {
    const json = await axios.get(
      "https://ecommercehenryx.herokuapp.com/orders/getAllOrders"
    );
   
    return dispatch({
      type: "GET_ALL_ORDERS",
      payload: json.data,
    });
  };
}

export function setOrderStatus(payload) {
  
  return async function (dispatch) {
    
    const json = await axios.post(
      'https://ecommercehenryx.herokuapp.com/orders/changeStatus',payload
    );
    return dispatch({
      type: "SET_ORDER_STATUS",
     
    });
  };
}



export function getStatusOrders(payload) {
  
  return {
    type: "GET_STATUS_ORDERS",
    payload: payload,
  };
}

export function getPaymentStatus(payload) {
  
  return {
    type: "GET_PAYMENT_STATUS",
    payload: payload,
  };
}

export function deleteOrder(id) {
  return async function (dispatch) {
    const json = await axios.delete(
      `https://ecommercehenryx.herokuapp.com/orders/deleteOrder/${id}`
    );
    return dispatch({
      type: "DELETE_ORDER",
    });
  };
}

export function orderByDate(payload) {
  return {
    type: "ORDER_BY_DATE",
    payload: payload,
  };
}



export function orderCommentsByDate(payload) {
  return {
    type: "ORDER_COMMENTS_BY_DATE",
    payload: payload,
  };
}

export function changeGenreTitle(payload) {
  return {
    type: "CHANGE_GENRE_TITLE",
    payload: payload,
  };
}




