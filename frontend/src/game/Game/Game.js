import React from 'react';
import './Game.css'
import Chessboard from '../Chessboard/Chessboard';
import GamePanel from '../GamePanel/GamePanel';
import { GameStateProvider } from '../../context/GameStateContext';


const Game = () => {
    return (
        <GameStateProvider>
            <div className="game-container">
                <Chessboard />
                <GamePanel />
            </div>
        </GameStateProvider>
    );
};

export default Game;
