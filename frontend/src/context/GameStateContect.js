import React, { createContext, useContext, useReducer } from 'react';
import {Chess} from 'chess.js'; // Import chess.js

const GameStateContext = createContext();

const initialState = {
  chess: new Chess(), 
  // ... other game-related state
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return {
        ...action.payload, // Assuming payload contains updated game state
      };
    // Handle other actions as needed
    default:
      return state;
  }
};

const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export { GameStateProvider, useGameState };