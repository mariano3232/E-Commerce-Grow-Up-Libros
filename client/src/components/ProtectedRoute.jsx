import React from 'react';

import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';

export default function ProtectedRoute ({
  isAllowed,
  redirectPath = '/home',
  children
}) {


  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};








//4) usando outlet y children: AMBOS!!!!!!!!!
// export default function ProtectedRoute ({
//   user,
//   redirectPath = '/home',
//   children
// }) {

//   if (!user) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children ? children : <Outlet />;
// };

//is ALLOWED, PERMISSION!!!



  