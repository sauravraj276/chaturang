import './App.css';
import Chessboard from './components/Chessboard/Chessboard';
import { GameStateProvider } from './context/GameStateContect';

function App() {
  return (


    <GameStateProvider>
      <div id="body">
        <center><p id="title">Chaturang - Chess Mastery</p></center>
        <Chessboard />
      </div>
    </GameStateProvider>


  );
}

export default App;
