import React from "react";
import { Link } from "react-router-dom";


export function Admin(){




    return(

        <div>

            <h3>Only Admin</h3>

            <Link to="/add">
                <button>Add Authors and Books</button>
            </Link>
            
        </div>
    )
}