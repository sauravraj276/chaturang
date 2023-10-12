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
            <div className='panel-pallet' id="turn"><p>Turn: {chess.turn() === 'b' ? "Black" : "White"}</p> </div>
            <div className='panel-pallet ' id="player1" ><p >Player 1 : <span className='player-name'>Saurav Raj</span></p> </div>
            <div className='panel-pallet ' id="player2" ><p >Player 2 :  <span className='player-name'>Divyanshu</span></p> </div>
            <div className='panel-pallet' id="info"><p>checkmate</p> </div>
            <div className='btn-pallet'> <button id="reset" onClick={undo}>Reset Game</button>
                <button id="save" onClick={resetGame}>Save Game</button></div>
            <div>

            </div>
        </div>
    );
};

export default GamePanel;
