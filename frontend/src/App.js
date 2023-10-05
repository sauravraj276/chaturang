import './App.css';
import { Routes, Route } from 'react-router-dom';
import Chessboard from './game/Chessboard/Chessboard';
import { GameStateProvider } from './context/GameStateContect';
import Login from './onBoard/Login/Login';
import Signup from './onBoard/Signup/Signup';
import Dashboard from './onBoard/Dashboard/Dashboard';
import Navbar from './onBoard/Navbar/Navbar';


function App() {
  return (

    // <GameStateProvider>
    <div>
      <Navbar />
      <div id="body">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chessboard" element={<GameStateProvider><Chessboard /></GameStateProvider>} />
          <Route path="/*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </div>
    </div>

    // </GameStateProvider>


  );
}

export default App;
