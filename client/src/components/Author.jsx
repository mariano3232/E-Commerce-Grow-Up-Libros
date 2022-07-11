import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAuthors } from '../actions'
import CardAuthor from './CardAuthor'
import { animateScroll as scroll } from 'react-scroll'
import SearchBarAuthor from './SearchBarAuthor'
import { useState } from 'react'
import { orderByNameAuthor } from '../actions'
import styles from '../Styles/author.module.css'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import s from '../Styles/Home.module.css'
import style from '../Styles/authorDetails.module.css'

const Author = () => {
  const dispatch = useDispatch()
  const authors = useSelector((state) => state.authors)
  const [order, setOrder] = useState(true)
  const isLogged = useSelector(state => state.userLogged)
  const productsAmount=useSelector((state)=>state.cartAmount)

  const userFavBooksShowed = useSelector(state=>state.userLoggedFavsBooksShowed)

  // const orderedAuthors = authors.sort(function (a, b) {
  //     if (a.name.toLowerCase() > b.name.toLowerCase()) {
  //       return 1;
  //     }
  //     if (b.name.toLowerCase() > a.name.toLowerCase()) {
  //       return -1;
  //     }
  //     return 0;
  // })
  useEffect(() => {
    dispatch(getAuthors())
  }, []);

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  const handleClickAuthors = (e) => {
    e.preventDefault()
    dispatch(getAuthors())
    navigate('/admin/')
    scroll.scrollTo('gaston')
  }

  function handleOrderByName(e) {
    dispatch(orderByNameAuthor(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  return (
    <div className={styles.authors}>
      <div className={styles.containerActions}>
        <Link to='/admin' className={styles.link}>
          <h3 className={styles.button} onClick={handleClickAuthors}>
            Todos los Autores
          </h3>
        </Link>

        <SearchBarAuthor />

        <div>
          <select
            className={styles.selectOrder}
            onChange={(e) => handleOrderByName(e)}
            defaultValue='default'
          >
            <option value='default' disabled>
              Orden alfabético
            </option>
            <option value='Asc'>Nombre Ascendente</option>
            <option value='desc'>Nombre Descendente</option>
          </select>
        </div>

        <Link to='/cart'>
        <div className={style.containerCart}>
          <BsCart className={style.cart} />
          <h4 className={style.productsAmount}>{productsAmount}</h4>
        </div>
      </Link>

      <Link to='/user'>
        <div className={s.containerHeart}>
          <BsHeart className={s.heart} />
          {
            isLogged.length ?
            <h4 className={s.productsAmount}>{userFavBooksShowed.length}</h4>
            : <h4 className={s.productsAmount}>{0}</h4>
          }
        </div>
      </Link>

      </div>

      <ol className={styles.container}>
        {authors.length
          ? authors.map((e) => (
              <Link to={'/author/' + e._id} className={styles.Link}>
                <CardAuthor
                  name={e.name}
                  surname={e.surname}
                  picture={e.picture}
                />
              </Link>
            ))
          : 'No se encontro el Escritor'}
      </ol>
    </div>
  )
}

export default Author
