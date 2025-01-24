import './App.css';
import Home from './Pages/Home/Home';
import {BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/login&registration/Login';
import Registration from './Pages/login&registration/Registration';
import { useUser } from './Context/UserContext';


function App() {
  const {user} = useUser();
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={user?<Home/> : <Navigate to="/login"/>}/>
        <Route path='/profile' element={user?<Profile/> : <Navigate to="/login"/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
