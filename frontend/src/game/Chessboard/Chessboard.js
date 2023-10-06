import React from 'react';
import './Chessboard.css'
import Tile from '../Tile/Tile';
import Piece from '../Piece/Piece';
import { useGameState } from '../../context/GameStateContect';
import { useState, useEffect } from 'react';


const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8]; // The verticle axis of the board
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]; // The horizontal axis of the board



export default function Chessboard() {
  const { state, dispatch } = useGameState();
  const [selectedTile, setSelectedTile] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  let boardState = state.chess.board();
  let board = [];
  const chess = state.chess;

  const handleTileClick = (x, y) => {
    const selectedPiece = chess.get(x + y);

    // Todo 
      // in one turn can select tiles only once 
      // selection can be changed as many times as possible
    if (selectedPiece && !selectedTile) {
      // Check for valid turn using chess.js
      if (selectedPiece.color === chess.turn()) {
        // Update the selected tile
        setSelectedTile({ x, y });
        // Get valid moves for the selected piece from chess.js
        const moves = chess.moves({ verbose: true });
        // Filter moves for the specified piece
        const validMoves = moves.filter(move => move.from === x + y).map(move => move.to);
        setValidMoves(validMoves);
      }
    } else if (selectedTile) {
      // Handle clicking on an empty tile when a tile is already selected
      const move = { from: selectedTile.x + selectedTile.y, to: x + y };
      // Check if the move is valid using chess.js
      if (validMoves.includes(move.to)) {
        console.log(move);
        // Make the move using chess.js
        // Handle permotions
        chess.move(move);
        // Clear the selected tile and valid moves after a move is made
        setSelectedTile(null);
        setValidMoves([]);
        // update the chess state
      }
    }
  };

  //To make the chesspiece map from the boardState 
  const chessPiecesMap = {};
  for (let i = 0; i < boardState.length; i++) {
    const row = boardState[i];
    for (let j = 0; j < row.length; j++) {
      const piece = row[j];
      if (piece) {
        const key = piece.square;
        chessPiecesMap[key] = piece;
      }
    }
  }
  //To populate the board with boxes 
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      const piece = chess.get(horizontalAxis[j] + verticalAxis[i]);
      const isTileSelected = selectedTile && selectedTile.x === horizontalAxis[j] && selectedTile.y === verticalAxis[i];
      const isValidMove = validMoves.includes(horizontalAxis[j] + verticalAxis[i]);

      board.push(
        <Tile
          key={horizontalAxis[j] + verticalAxis[i]}
          x={horizontalAxis[j]}
          y={verticalAxis[i]}
          number={i + j}
          piece={piece ? <Piece name={piece.type + piece.color} /> : null}
          isSelected={isTileSelected}
          isValidMove={isValidMove}
          onClick={() => handleTileClick(horizontalAxis[j], verticalAxis[i])}
        />
      );
    }
  }

  return <div id="board" >{board}</div>
}
