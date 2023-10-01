import React, { createContext, useContext, useReducer } from 'react';
import {Chess} from 'chess.js'; // Import chess.js

const GameStateContext = createContext();

const initialState = {
  chess: new Chess(), // Initialize chess.js board
  // ... other game-related state
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      // Update chess.js board with the move
      state.chess.move({ from: action.payload.from, to: action.payload.to });
      // Implement logic to handle other aspects of the game state
      return {
        ...state,
        // Update other game-related state
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