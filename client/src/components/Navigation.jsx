import React from "react";
import { Link } from "react-router-dom";

export function Navigation(){

    return(
   <nav>
      <Link to="/landing">Landing</Link>
      <Link to="/home">Home</Link>
      <Link to="/admin">Admin</Link>
    </nav>

    )
} 