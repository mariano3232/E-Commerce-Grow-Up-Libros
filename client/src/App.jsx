import './App.css';
import React from 'react';
import {BrowserRouter , Routes , Route,Navigate,Outlet } from 'react-router-dom';
import { getBooks } from './actions';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import  Home  from './components/Home';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ'
import Landing from './components/Landing';
import Author from './components/Author';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import Add from './components/Add';
import AddAuthor from './components/AddAuthor';
import BottomBar from './components/BottomBar';
import { Admin } from './components/Admin';
import { Navigation } from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Shop from './components/Shop';


function App() {

  const [user, setUser] = React.useState(null);

  const handleLoginAdmin = () => setUser({ 
    id: '1', 
    name: 'guille',       
    // permissions: ['analyze'],
     roles: ['admin'], 
  });
  const handleLogoutAdmin = () => setUser(null);

  const handleLoginUser = () => setUser({ 
    id: '1', 
    name: 'guille',   
    roles: ['user'],     
  });
  const handleLogoutUser = () => setUser(null);

  const dispatch = useDispatch() 

  useEffect(()=> {    
    dispatch(getBooks())
    },[dispatch]) 

    console.log('App:')

  return (
    <BrowserRouter>
      <Navigation />
      {user ? (
        <button onClick={handleLogoutAdmin}>Sign Out Admin</button>
      ) : (
        <button onClick={handleLoginAdmin}>Sign In Admin</button>
      )}

      {user ? (
        <button onClick={handleLogoutUser}>Sign Out User</button>
      ) : (
        <button onClick={handleLoginUser}>Sign In User</button>
      )}
      <NavBar/>
      <Routes>
        <Route exact path='/' element= {<Landing/>}/>
        <Route path="home" element={<Home />} />
        <Route exact path='/aboutus' element={<AboutUs/>}/>
        <Route exact path='/faq' element={<FAQ/>}/>
        <Route exact path='/author' element={<Author/>}/>
        <Route exact path='/book/:id' element={<BookDetails/>} /> 
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/shop" element={<Shop/>} />
        </Route> 

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.roles.includes('admin')
              }
            >
              <Admin />          
            </ProtectedRoute>
          }
        />

          <Route
          path="/add"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.roles.includes('admin')
              }
            >
              <Add />          
            </ProtectedRoute>
          }
        />

          <Route
          path="/addauthor"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.roles.includes('admin')
              }
            >
              <AddAuthor />          
            </ProtectedRoute>
          }
        />

          <Route
          path="/addbook"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.roles.includes('admin')
              }
            >
              <AddBook />          
            </ProtectedRoute>
          }
        />

        {/* <Route exact path='/add' element={<Add/>} /> */}
        {/* <Route exact path='/addbook' element={<AddBook/>} />      */}
        {/* <Route exact path='/addauthor' element={<AddAuthor/>} />  */}

      </Routes>
      <BottomBar/>
    </BrowserRouter>
  )
}

export default App



//1) SIN WRAPPER 

{/* <Route exact path='/admin' element={<Admin/>} />      */}


// CON WRAPPER

{/* <Route path="add" element={
  <ProtectedRoute user={user}>
    <Add />
  </ProtectedRoute>
}
/> */}


//CON OUTLET para dos rutas

{/* <Route element={<ProtectedRoute user={user} />}>
          <Route path="/add" element={<Add />} />
          <Route path="/shop" element={<Shop/>} />
        </Route>  */}


//CON AUTENTICACION
// //<Route element={<ProtectedRoute isAllowed={!!user} />}>
// <Route path="/add" element={<Add />} />
// <Route path="/shop" element={<Shop/>} />
// </Route> 

//CON AUTENTICAZION Y PERMISO

