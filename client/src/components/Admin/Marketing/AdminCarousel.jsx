import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'cloudinary-react'
import { getCarouselImages } from '../../../actions'
import styles from '../../../Styles/adminCarousel.module.css'
import { Link } from 'react-router-dom'
export default function AdminCarousel() {
  const dispatch = useDispatch()

  const [image, setImage] = useState({ files: '' })
  const [publicId, setPublicId] = useState('')

  let Images = useSelector((state) => state.carousel)

  console.log('Images :',Images)

  const uploadImage = () => {
    console.log('image123qsda:',image)
    if (image.length<1){
      return alert('Ningun archivo seleccionado')
    }
    else
    for (let i=0; i<image.length; i++){
      const formData = new FormData()
    formData.append('file', image[i])
    formData.append('upload_preset', 'preset_library')
    alert('Imagen añadida al carrusel!')

    axios
      .post('https://api.cloudinary.com/v1_1/dflpxjove/image/upload', formData)
      .then((response) => {
        setPublicId(response.data.secure_url)
        axios
          .post(
            'https://ecommercehenryx.herokuapp.com/carrousel/addCarrousel',
            {
              image: response.data.secure_url,
            }
          )
          .then(() => {
            setImage({ files: '' })
            dispatch(getCarouselImages())
            setTimeout(function(){
              Images=useSelector(state=>state.carousel)
            },500)
          })
      })
      
    }
    
  }

  function handleDelete(e) {
    e.preventDefault()
    alert('Imagen borrada!')
    axios.delete(
      'https://ecommercehenryx.herokuapp.com/carrousel//deleteCarrousel/' +
        e.target.value
    ).then(()=>{
      dispatch(getCarouselImages())
      setTimeout(function(){
        Images=useSelector(state=>state.carousel)
      },500)
    })
  }

  return (
    <div>
      <Link to='/admin'>
            <button >Panel Administrador</button>
      </Link>
      <div>
      <input
        type='file'
        multiple={true}
        onChange={(e) => {
          setImage(e.target.files)
        }}
        className={styles.input}
      />
      {console.log('image :', image)}
      {image ? (
        <button onClick={uploadImage} className={styles.button}>
          Añadir
        </button>
      ) : null}

      <div className={styles.cardsContainer}>
        {Images.map((e) => {
          return (
            <div className={styles.card}>
              <Image
                cloudName='dflpxjove'
                publicId={e.image}
                className={styles.img}
              />
              <button
                value={e._id}
                onClick={(e) => handleDelete(e)}
                className={styles.buttonX}
              >
                X
              </button>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
