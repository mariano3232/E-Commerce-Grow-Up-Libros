import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Image} from 'cloudinary-react'

export default function AdminCarousel(){
    const dispatch=useDispatch();

    const [image,setImage]=useState({files:''})
    const [publicId,setPublicId]=useState('')

    const Images=useSelector(state=>state.carousel)



    const uploadImage=()=>{
        const formData= new FormData();
        formData.append("file",image)
        formData.append("upload_preset","preset_library")
        console.log('image :',image);
        
        axios.post("https://api.cloudinary.com/v1_1/dflpxjove/image/upload",formData).then((response=>{
            console.log(response)
            setPublicId(response.data.secure_url)
            console.log(publicId)
            axios.post('https://ecommercehenryx.herokuapp.com/carrousel/addCarrousel',{
                image:response.data.secure_url
            })
        }))
        
    }

    function handleDelete(e){
        e.preventDefault();
        axios.delete('https://ecommercehenryx.herokuapp.com/carrousel//deleteCarrousel/'+e.target.value)
    }


    return(
        <div>
            <h4>Agregar imagen:</h4>
            <input type="file" onChange={e=>{setImage(e.target.files[0])}}/>
            <button onClick={uploadImage}>Añadir</button>

            {
                Images.map(e=>{
                    return <div>
                        <Image cloudName='dflpxjove' publicId={e.image} width='300px'/>
                        <button value={e._id} onClick={e=>handleDelete(e)}>X</button>
                    </div>
                })
            }
        </div>
    )
}