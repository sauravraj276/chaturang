import './App.css';
import { Routes, Route } from 'react-router-dom';
import Game from './game/Game/Game';
import Login from './onBoard/Login/Login';
import Signup from './onBoard/Signup/Signup';
import Dashboard from './onBoard/Dashboard/Dashboard';
import Navbar from './onBoard/Navbar/Navbar';
import PrivateRoute from './onBoard/PrivateRoute/PrivateRoute';
import { GameStateProvider } from './context/GameStateContext';



function App() {
  return (

    <div>
      <Navbar />
      <div id="body">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<GameStateProvider><Dashboard/></GameStateProvider>} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<PrivateRoute element={<Game/>}/>} />
          <Route path="/*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </div>
    </div>



  );
}

export default App;
