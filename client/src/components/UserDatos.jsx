import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, postUserData, setUserNews, setUserPlan } from '../actions'
import UserDatosPerfil from './UserDatosPerfil'
import styles from '../Styles/UserDatos.module.css'
//import axios from 'axios'

const UserDatos = () => {

  /* const paises=["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"] */

  const allUsers = useSelector((state) => state.users)
  const logged = useSelector((state) => state.userLogged)
  const userId = allUsers.filter((u) => u._id === logged[0]._id)
  /* const dispatch = useDispatch()
  const navigate = useNavigate() */

  /* const [state, setState] = useState('')
  const [input, setInput] = useState({
    name: '',
    surname: '',
    birthday: '',
    country: '',
    dni: '',
    phone: '',
    address: '',
    ciudad: '',
    postal: '',
    picture: '',
  }) */

  /* const [errors,setErrors]=useState({}) */

  /* function validate(input){
    const errors={};
    if (input.name && !input.name.match(/^[a-zA-Z]*$/g)){
      errors.name='Solo puede contener letras*'
    }
    if (input.surname && !input.surname.match(/^[a-zA-Z]*$/g)){
      errors.surname='Solo puede contener letras*'
    }
    if (input.birthday&&!input.birthday.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)){
      errors.birthday='Debe ser una fecha valida*'
    }
    if (input.dni&&!input.dni.match(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/)){
      errors.dni='Ingresar un numero de documento valido*'
    }
    if (input.phone&&!input.phone.match(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/)){
      errors.phone='Ingresar un numero de telefono valido*'
    }
    if (!input.address.match(/^[A-Za-z0-9\s]+$/g)&&input.address){
      errors.address=('No se admiten simbolos*')
    }
    if (!input.ciudad.match(/^[A-Za-z\s]+$/g)&&input.ciudad){
      errors.ciudad=('No se admiten numeros o simbolos*')
    }
    if (input.postal&&!input.postal.match(/^(\d{4})$/g)){
      errors.postal='Ingresar un CP valido*'
    }

    return errors
  } */

  /* useEffect(()=>{
    setErrors(validate(input))
    
  },[input]) */

  /* const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    
  } */
  /* const handleSelect=(e)=>{
    setInput({
      ...input,
      country:e.target.value
    })
  } */

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).length > 0){
      return alert(Object.values(errors))
    }
    else{
      const id = logged[0]._id;
    dispatch(postUserData(id, input));
    alert('Datos personales actualizado');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
    }
  } */

  const handleClick = () => {
    setState(!state);
  }

  /* const handlePlanDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserPlan(id));
    alert('Desuscripción a "Soy Premium" con éxito');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
  }

  const handleNewsDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserNews(id));
    alert('Desuscripción a nuestro Newsletter con éxito');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
  } */

  /* const handleDeleteUser = async () => {
    console.log('hola')
    const id = [logged[0]._id]
    const json = await axios.get('https://ecommercehenryx.herokuapp.com/users/deleteUser/', id);
    navigate('/home');
  } */

  return (
    <div className={styles.containerAll}>
      <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>
        <legend className={styles.legendForm}>Datos personales</legend>

        <div className={styles.containerInputsGrid}>
          <div className={styles.containerInput}>
            <label htmlFor='nickname'>Usuario:</label>
            <input
              type='text'
              name='nickname'
              value={userId[0].nickname}
              readOnly
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email' value={userId[0].email} readOnly />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              name='name'
              value={userId[0].name}
              readOnly
            />
            {/* {
              errors?.name?<p className={styles.error}>{errors.name}</p>:null
            } */}
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='surname'>Apellido:</label>
            <input
              type='text'
              name='surname'
              value={userId[0].surname}
              readOnly
            />
            {/* {
              errors?.surname?<p className={styles.error}>{errors.surname}</p>:null
            } */}
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='birthday'>Fecha de Nacimiento:</label>
            <input
              type='date'
              name='birthday'
              value={userId[0].birthday}
              readOnly
            />
          </div>
          {/* {
            errors.birthday?<p className={styles.error}>{errors.birthday}</p>:null
          } */}
          <div className={styles.containerInput}>
            <label htmlFor='country'>Nacionalidad:</label>
            <input
              type='text'
              name='country'
              value={userId[0].country}
              readOnly
            />

            {/* <select name='country' className={styles.select} onChange={e=>handleChange(e)}>
              <option value="">Seleccionar</option>
            {
              paises.map(e=>{
               return <option key={e} value={e}>{e}</option>
              })
            }
            </select> */}
            {/* <input
              type='text'
              name='country'
              onChange={(e) => handleChange(e)}
              value={input.country}
            /> */}
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='dni'>Nº de Documento:</label>
            <input
              type='text'
              name='dni'
              value={userId[0].dni}
              readOnly
            />
            {/* {
              errors.dni&&input.dni?<p className={styles.error}>{errors.dni}</p>:null
            } */}
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='phone'>Telofono:</label>
            <input
              type='text'
              name='phone'
              value={userId[0].phone}
              readOnly
            />
            {/* {
              errors.phone&&input.phone?<p className={styles.error}>{errors.phone}</p>:null
            } */}
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='address'>Direccion:</label>
            <input
              type='text'
              name='address'
              value={userId[0].address}
              readOnly
            />
            {/* {
              errors?.address?<p className={styles.error}>{errors.address}</p>:null
            } */}
          </div>

          <div className={styles.containerInput}>
            <label htmlFor='ciudad'>Ciudad:</label>
            <input
              type='text'
              name='ciudad'
              value={userId[0].ciudad}
              readOnly
            />
            {/* {
              errors?.ciudad?<p className={styles.error}>{errors.ciudad}</p>:null
            } */}
          </div>

          <div className={styles.containerInput}>
            <label htmlFor='postal'>Codigo Postal:</label>
            <input
              type='number'
              name='postal'
              value={userId[0].postal}
              readOnly
            />
            {/* {
              errors?.postal?<p className={styles.error}>{errors.postal}</p>:null
            } */}
          </div>
          

        </div>
        {/* <button className={styles.button} type='submit'>
          Actualizar
        </button> */}
      </form>

      {/* <div className={styles.containerUserPlan}>
        <h3>Plan</h3>
        <div className={styles.userPlan}>
          <p>Usuario: {userId[0].nickname} </p>
          <p>NewsLetter: {userId[0].isSubscribeNewsLetter ? 'Si' : 'No'} </p>
          <p>Premium: {userId[0].isPremiun ? 'Si' : 'No'} </p>
        </div>
        <div className={styles.buttonUserContainer}>
          {userId[0].isSubscribeNewsLetter === false ? (
            <button className={styles.button} disabled>
              Baja al NewsLetter
            </button>
          ) : (
            <button className={styles.button} onClick={handleNewsDelete}>
              Baja al NewsLetter
            </button>
          )}

          {userId[0].isPremiun === false ? (
            <button className={styles.button} disabled>
              Baja a Soy Premium
            </button>
          ) : (
            <button className={styles.button} onClick={handlePlanDelete}>
              Baja a Soy Premium
            </button>
          )}
        </div>
        <div>
          <p>
            Si quieres modificar tu forma de pago favor escríbenos a:
            growup@gmail.com
          </p>
        </div>

        <h3>Baja de usuario</h3>
        
          <button className={styles.button} onClick={handleDeleteUser}>
            Baja como usuario
          </button>
          
      </div> */}

      
      {/* <button onClick={handleClick} className={styles.button}>
        Ver mis datos
      </button> */}

      {/* {state ? (
        <UserDatosPerfil
          name={userId[0].name}
          surname={userId[0].surname}
          email={userId[0].email}
          dni={userId[0].dni}
          nickname={userId[0].nickname}
          birthday={userId[0].birthday}
          country={userId[0].country}
          phone={userId[0].phone}
          address={userId[0].address}
          ciudad={userId[0].ciudad}
          postal={userId[0].postal}
        />
      ) : (
        <p>
          El camino al exito está en la lectura de libros inspiradores. 'Luis
          Chacon'
        </p>
      )} */}
    </div>
  )
}

export default UserDatos
