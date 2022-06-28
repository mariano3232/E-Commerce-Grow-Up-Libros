
import React from 'react';
import {Link} from 'react-router-dom';

const UserDatos = () => {

    return (
        <div>
            <Link to='/home'><p>Volver</p></Link>

            <h3>Datos personales</h3>

            <label htmlFor="user">Usuario</label>
            <input type="text" id='user'/>

            <label htmlFor="email">Email</label>
            <input type="text" id='email'/>

            <label htmlFor="name">Nombre</label>
            <input type="text" id='name'/>

            <label htmlFor="lastName">Apellido</label>
            <input type="text" id='lastName'/>

            <label htmlFor="age">Años</label>
            <input type="number" id='age'/>

            <label htmlFor="country">Nacionalidad</label>
            <input type="text" id='country'/>

            <button>Actualizar</button>
        </div>
    )
}

export default UserDatos;
