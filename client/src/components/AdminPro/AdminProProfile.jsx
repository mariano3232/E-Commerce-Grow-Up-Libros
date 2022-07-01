
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';


export function AdminProProfile(){

    const allUsers = useSelector(state => state.users);
    const adminPro= allUsers.filter(usuario=> usuario.isSuperAdmin === true)
    console.log('GGGG:',adminPro)
    

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        lastaName: '',
        birthday: '',
        country: '',
        dni: '',
    });

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = adminPro[0]._id;
        dispatch(postUserData(id, input));
        setInput({
            name: '',
            lastaName: '',
            birthday: '',
            country: '',
            dni: '',
        });
    }


   
    return (
        <div>
            <Link to='/adminpro'><p>Volver</p></Link>

            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <legend>Datos personales</legend>

                    <label htmlFor="nickname">Usuario</label>
                    <input type="text" id='nickname' value={adminPro[0].nickname}/>

                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' value={adminPro[0].email}/>

                    <label htmlFor="name">Nombre</label>
                    <input type="text" id='name' onChange={(e) => handleChange(e)} value={input.name}/>

                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" id='lastName' />

                    <label htmlFor="birthday">Fecha de Nacimiento</label>
                    <input type="date" id='birthday'/>

                    <label htmlFor="country">Nacionalidad</label>
                    <input type="text" id='country'/>

                    <label htmlFor="dni">Nº de Documento</label>
                    <input type="text" id='dni'/>

                    <button type='submit'>Actualizar</button>
                </fieldset>
            </form>

            <form>
                <fieldset>
                    <legend>Suscripciones</legend>

                    <h4>Al Newsletter</h4>

                    <label htmlFor="news">SI</label>
                    <input type="radio" name="news" value='Si' />

                    <label htmlFor="news">NO</label>
                    <input type="radio" name="news" value='No' checked/>

                    <h4>Soy premium</h4>

                    <label htmlFor="premium">SI</label>
                    <input type="radio" name="premium" value='Si' />

                    <label htmlFor="premium">NO</label>
                    <input type="radio" name="premium" value='No' checked/>
                </fieldset>
            </form>
        </div>
    )
}


 

   
 

   

   