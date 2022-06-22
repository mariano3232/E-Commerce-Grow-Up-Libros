import React from "react";
import { Link } from "react-router-dom";


export function Admin(){




    return(

        <div>

            <h3>Solo Administrador</h3>

            <Link to="/add">
                <button>Agregar Autor y Libro</button>
            </Link>
            
        </div>
    )
}