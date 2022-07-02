
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import style from '../Styles/userFav.module.css';

const UserPlanLecturaBooks = ({size, genre, budget}) => {

    const allBooks = useSelector(state => state.books);
    const [change, setChange] = useState({
        price: '',
        page: '',
        genre: ''
    });

    const roundOne = allBooks
    .filter(b => b.price < '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.map(a => a.genre == 'Salud' && a.genre == 'Desarrollo Personal'))
    .slice(0, 5);
    
    return (
        <div>
            {
                roundOne.length > 0 ?
                roundOne?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : <p>No se encontraron libros sugeridos</p>
            }
        </div>
    )
}

export default UserPlanLecturaBooks;
