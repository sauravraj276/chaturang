// SavedGames.js
import React, { useState, useEffect } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { useNavigate } from 'react-router-dom';
import './SavedGames.css'

const SavedGames = () => {
  const [games, setGames] = useState([]);
  const { state, dispatch } = useGameState();
  const chess = state.chess;
  const navigate =useNavigate();

  useEffect(() => {
    // Load games from local storage when the component mounts
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);
  }, []);

  const deleteGame = (index) => {
    // Remove the selected game from the list
    const updatedGames = [...games];
    updatedGames.splice(index, 1);
    setGames(updatedGames);

    // Update local storage
    localStorage.setItem('games', JSON.stringify(updatedGames));
  };
  const loadGame = (index) => {
    // Load the selected game from the list
    chess.load(games[index].fen)
    dispatch({
        type: 'UPDATE_GAME_STATE',
        payload: {
          chess:chess,
        },
      });
      navigate('/game');
  };

  return (
    <div className='form savedGames'>
      <h2>Saved Games</h2>
      {games.length === 0 ? (
        <p>No saved games.</p>
      ) : (
        <ol>
          {games.map((game, index) => (
            <li key={index}>
              <span>{game.fen.slice(0,10)}</span>
              <br/>
              <span>{Date(game.timestamp).toLocaleString()}</span>
              <br/>
              <button onClick={() => loadGame(index)}>Continue</button>
              <button onClick={() => deleteGame(index)}>Delete</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default SavedGames;
