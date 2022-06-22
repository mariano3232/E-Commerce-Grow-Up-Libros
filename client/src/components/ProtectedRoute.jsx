import React from 'react';
import { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';

//1) sin redirect path
  //  export default function ProtectedRoute ({ user, children })  {
  //       if (!user) {
  //         return <Navigate to="/home" replace />;
  //       }
      
  //       return children;
  //     };



// // 2 ) con redirect path
// export default function ProtectedRoute ({
//         user,
//         redirectPath = '/home',
//         children,
//       }) {
//      // console.log('soy childre:',children)
      
//         if (!user) {
//           return <Navigate to={redirectPath} replace />;
//         }
      
//         return children;
//       };


// 3 ) con OUTLER --> para envolver mas de dos componenter, ver que cambia el children por outlet
// export default function ProtectedRoute ({
//   user,
//   redirectPath = '/home'
// }) {
// // console.log('soy childre:',children)

//   if (!user) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet/>;
// };


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



  