import './App.css';
import React from 'react'
import {initMyFirebase} from './firebase/firebaseInit';
import LoginWithGoogle from './firebase/LoginWithGoogle';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import InitPage from './components/InitPage/InitPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  
  initMyFirebase();

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<InitPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>

    </div>
  );
}

export default App;
