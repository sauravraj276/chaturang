import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import './GamePanel.css';
import { useNavigate } from 'react-router-dom';

const GamePanel = () => {
    const { state, dispatch } = useGameState();
    const chess = state.chess;
    const players = state.players;
    const navigate = useNavigate();


    const undo = () => {
        try {
            chess.undo();
            console.log('undo')
            dispatch({
                type: 'UPDATE_GAME_STATE',
                payload: {
                    ...state,
                    chess: chess,
                },
            });
        } catch (e) {
            console.log(e);
        }


    }
    const resetGame = () => {
        try {
            chess.reset();
            dispatch({
                type: 'UPDATE_GAME_STATE',
                payload: {
                    ...state,
                    chess: chess,
                },
            });
        } catch (e) {
            console.log(e);
        }

    }
    const saveGame = () => {
        try {
            
            // Get the FEN representation of the current board
            const fen = chess.fen();
    
            // Get the current timestamp
            const timestamp = new Date().toISOString();
    
            // Append the FEN and timestamp to the games array in local storage
            const games = JSON.parse(localStorage.getItem('games')) || [];
            games.push({ fen, timestamp });
            localStorage.setItem('games', JSON.stringify(games));
            
            //Navigate to dashboard
            navigate('/dashboard');

        } catch (e) {
            console.error(e);
        }
    };
    
    


    return (
        <div className='game-panel'>
            <h2>Game Panel</h2>
            <p>Turn: {chess.turn()}</p>
            <p>
                Player 1:
            </p>
            <p>
                Player 2: Shubham - B
            </p>


            <p>Game Info: Game is not over</p>

            <button onClick={undo}>Undo Move</button>
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={saveGame}>Save Game</button>
            <div>

            </div>
        </div>
    );
};

export default GamePanel;
