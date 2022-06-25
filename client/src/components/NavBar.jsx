
import React from 'react';
import SearchBar from './SearchBar';
import style from '../Styles/nav.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getBookGenre} from '../actions';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectGenre = (e) => {
        e.preventDefault();
        dispatch(getBookGenre(e.target.value));
        navigate('/home/');
    }

    const genres = ['Salud', 'Deportes', 'Biografia', 'Nutricion', 'Filosofia', 'Ensayo', 'Desarrollo Personal',
    'Economia', 'Espiritualidad', 'Historia', 'Negocios', 'Psicologia', 'Neurociencia'];

    return (
        <div className={style.container}>
            
            <h3 className={style.logo}>PG-11 Books</h3>
            <Link to="/admin" className={style.Link}><p className={style.navItem}>Administrador</p></Link>
            <Link to='/home' className={style.Link}><p className={style.navItem}>Inicio</p></Link>

            <div>
               <Link to='/author' className={style.Link}><p className={style.navItem}>Autores</p></Link> 
            </div>
            <div>
                <select defaultValue="default" onChange={(e) => handleSelectGenre(e)}  className={style.select}>Generos
                    <option value="default" disabled>Generos</option>
                    {
                        genres?.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>    
            </div>

            <SearchBar/>

            <div className={style.toggle}>
                <div className={style.bar}></div>
            </div>

            <h3 className={style.navItem}>Login</h3>
      
        </div>
    )
}

export default NavBar;
