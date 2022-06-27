
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, orderByName , orderByPrice } from '../actions';
import styles from "../Styles/Home.module.css";

const OrderBooks = () => {

    const dispatch = useDispatch();
    
    const [order,setOrder] = useState(true)

    // const [order, setOrder] = useState("Asc");
    // const [price, setPrice] = useState('');
    /* const [rating, setRating] = useState(""); */

    function handleOrderByName(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleOrderByPrice(e) {
        dispatch(orderByPrice(e.target.value))
       setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    };


    // function handleSort(e) {
    //     setOrder(e.target.value);
    //     dispatch(getBooks(e.target.value));
    //     /* setCurrentPage(1); */
    // }
    
    //  function handleRating(e) {
    //     setRating(e.target.value);
    //     dispatch(getBooks(order, e.target.value));
    //     setCurrentPage(1);
    // } 
    
    // function handlePrice(e) {
    //     setPrice(e.target.value);
    //     dispatch(getBooks(order, e.target.value));
    //     /* setCurrentPage(1); */
    // }

    return (
        <div className={styles.ubiOptions}>
            <p className={styles.p}>Ordenar Por:
                
                <select className={styles.options} onChange={(e) => handleOrderByName(e)} defaultValue="default">
                    <option value="default" disabled>
                        Orden alfabético
                    </option>
                    <option className={styles.options} value="Asc">
                        Nombre Ascendente
                    </option>
                    <option className={styles.options} value="desc">
                        Nombre Descendente
                    </option>
                </select>

                {/* <select onChange={(e) => handleRating(e)}>
                <option value="Asc">Higher Rating</option>
                <option value="desc">Lower Rating</option>
                </select> */}

                <select className={styles.options} onChange={(e) => handleOrderByPrice(e)} defaultValue="default">
                    <option value="default" disabled>
                        Orden por precio
                    </option>
                    <option className={styles.options} value="Asc">
                        Precio mas Bajo
                    </option>
                    <option className={styles.options} value="desc">
                        Precio mas Alto
                    </option>
                </select>
            </p>
        </div>
    )
}

export default OrderBooks;
