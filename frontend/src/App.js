import './App.css';
import Chessboard from './game/Chessboard/Chessboard';
import { GameStateProvider } from './context/GameStateContect';
import Login from './onBoard/Login/Login';

function App() {
  return (


    // <GameStateProvider>

      <div id="body">
        <Login/>
        {/* <center><p id="title">Chaturang - Chess Mastery</p></center> */}
        {/* <Chessboard />

         */}
      </div>
    // </GameStateProvider>


  );
}

export default App;
