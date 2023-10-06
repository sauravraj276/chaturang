import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useHistory from react-router-dom
import { useGameState } from '../../context/GameStateContext';
import SavedGames from '../../game/SavedGames/SavedGames';
import './Dashboard.css';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const { state, dispatch } = useGameState();
  const chess = state.chess;
  const [players, setPlayers] = useState({
    gameId:'',
    player1: '',
    player2: '',
    player1Color: '',
    player2Color: ''
  });
  const navigate = useNavigate();  // Create a history object

  const handleJoin = (e) => {
    e.preventDefault();
    chess.reset();
    //generate random gameId
    setPlayers({ ...players, gameId: uuidv4() });
    dispatch({
      type: 'UPDATE_GAME_STATE',
      payload: {
        chess:chess,
        players:players,
      },
    });

    navigate('/game');  // Replace '/chessboard' with the actual path to your Chessboard component
  }



  return (
    <div id='dashboardWrapper'>
    <SavedGames/>
    <div className='form'>
    <h2>Join Game</h2>
    <form onSubmit={handleJoin}>
      <label>
        Player 1:
        <input
          required
          type="text"
          name="name"
          value={players.player1}
          onChange={(e) => setPlayers({ ...players, player1: e.target.value })}
        />
      </label>
      <label>
        Color:
        <select
          required
          name="color"
          value={players.player1Color}
          onChange={(e) => setPlayers({ ...players, player1Color: e.target.value, player2Color: e.target.value === 'black' ? 'white' : 'black' })}
        >
          <option value="">Select Color</option>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </label>
      <br />
      <label>
        Player 2:
        <input
          required
          type="text"
          name="name"
          value={players.player2}
          onChange={(e) => setPlayers({ ...players, player2: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Join Game</button>
    </form>
  </div></div>
    
  );
};

export default Dashboard;
