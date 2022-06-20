import './App.css';
import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import  Home  from './components/Home';
import { getBooks } from './actions';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch() 

  useEffect(()=> {    
    dispatch(getBooks())
    },[dispatch]) 

  return (
    <BrowserRouter>
    <Routes>
        {/* <Route exact path='/' element= {<LandingPage/>}/> */}
        <Route exact path='/home' element= {<Home/>}/>
        {/* <Route exact path='/book/:id' element={<DetailBook/>} />        */}
    </Routes>
    </BrowserRouter>
  )
}

export default App