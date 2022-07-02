
import React from 'react';
import {useSelector} from 'react-redux';
import style from '../Styles/userFav.module.css';

const UserPlanLecturaBooks = ({size, genre, budget}) => {

    const allBooks = useSelector(state => state.books);

    const roundOne = allBooks
    .filter(b => b.price < '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.find((a) => a.genre.includes('Desarrollo Personal')))
    .slice(0, 5);
    console.log('uno', roundOne);

    const roundTwo = allBooks
    .filter(b => b.price > '3500')
    .filter(e => e.pages > '300')
    .filter(p => p.genres.find((a) => a.genre.includes('Desarrollo Personal')))
    .slice(0, 5);

    const roundThree = allBooks
    .filter(b => b.price < '3500')
    .filter(e => e.pages > '300')
    .slice(0, 5);

    const roundFour = allBooks
    .filter(b => b.price > '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.find((a) => a.genre.includes('Desarrollo Personal')))
    .slice(0, 5);

    const roundFive = allBooks
    .filter(b => b.price < '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.find(a => a.genre.includes('Biografia')))
    .slice(0, 5);

    console.log('five', roundFive);

    const roundSix = allBooks
    .filter(b => b.price > '3500')
    .filter(e => e.pages > '300')
    .filter(p => p.genres.find(a => a.genre.includes('Biografia')))
    .slice(0, 5);

    const roundSeven = allBooks
    .filter(b => b.price < '3500')
    .filter(e => e.pages > '300')
    .filter(p => p.genres.find(a => a.genre.includes('Biografia')))
    .slice(0, 5);

    const roundEight = allBooks
    .filter(b => b.price > '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.find(a => a.genre.includes('Biografia')))
    .slice(0, 5);

    /* const roundNine = allBooks
    .filter(b => b.price > '3500')
    .filter(e => e.pages < '300')
    .filter(p => p.genres.map(a => a.genre == 'Desarrollo Personal'))
    .slice(0, 5); */
    
    return (
        <div>
            {
                size == 'cortos' && budget == 'Menos de $3.500' && genre == 'Desarrollo Personal'?
                roundOne?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'largos' && budget == 'Más de $3.500' && genre == 'Desarrollo Personal'?
                roundTwo?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'cortos' && budget == 'Más de $3.500' && genre == 'Desarrollo Personal'?
                roundThree?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'largos' && budget == 'Menos de $3.500' && genre == 'Desarrollo Personal'?
                roundFour?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'cortos' && budget == 'Menos de $3.500' && genre == 'Negocios y Biografía'?
                roundFive?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'largos' && budget == 'Más de $3.500' && genre == 'Negocios y Biografía'?
                roundSix?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'cortos' && budget == 'Más de $3.500' && genre == 'Negocios y Biografía'?
                roundSeven?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : (size == 'largos' && budget == 'Menos de $3.500' && genre == 'Negocios y Biografía'?
                roundEight?.map(e => (
                    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
                )) : <p>No se encontraron libros sugeridos</p>)))))))
            }
        </div>
    )
}

export default UserPlanLecturaBooks;

/* 
roundOne.length > 0 ?
roundOne?.map(e => (
    <li><img className={style.container} src={e.cover} alt="buscando" /></li>
)) : <p>No se encontraron libros sugeridos</p>
*/