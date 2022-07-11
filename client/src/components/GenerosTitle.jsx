import React, { useState } from 'react'
import { useSelector } from 'react-redux'


export default function GenerosTitle(){

    const generoTitle = useSelector(state=>state.generosTitle)

    

    return(

        <div>
            <h1>{generoTitle}</h1>
        </div>

    )
}