import React from "react";
import { Link } from "react-router-dom";


export function Admin(){




    return(

        <div>

            <h3>Solo Administrador</h3>
            <h5>Perfil Administrador</h5>
        
            <Link to="/add">
                <button>Agregar Data</button>
            </Link>
            
            <Link to="/delete">
                <button>Borrar Data</button>
            </Link>

            <Link to="/put">
                <button>Modificar Data</button>
            </Link>
                
                
                <button>Ver Ventas</button>
            
            
        </div>
    )
}