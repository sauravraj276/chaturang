import React, { useState } from 'react';
import './Tile.css';
import { useGameState } from '../../context/GameStateContect';

export default function Tile(props) {
  // State to track whether the tile is clicked
  const [isClicked, setIsClicked] = useState(false);
  const [isValidMove, setIsValidMove] = useState(false);
  const { state, dispatch } = useGameState();
  const chess=state.chess;


  // Handle the click event
  const handleClick = (e) => {
//    check if the chance is of which player and if the piece is of that color 
//  then setIsClicked as true and all valid moves tile state as isValidMove true
// if()
    const tileId=props.x+props.y
    const currentPiece=chess.get(tileId)
    if(currentPiece){

      if(currentPiece.color==chess.turn()){
        const validMoves=chess.moves({ square: tileId, verbos:true })
        for (let i in validMoves) {
          const move = validMoves[i];
          const element = document.getElementById(move.to);
        
          if (element) {
            // Check if the element exists
            element.classList.add('validMove');
          }
        }
        // 
        chess.move(tileId+validMoves[1])
        dispatch({
          type: 'UPDATE_GAME_STATE',
          payload: {
            chess: state.chess, 
          },
        });
        setIsClicked(true);
      }
    }


   
  };

  // If i + j is odd, push the black box, else the white one
  return (
    (props.number % 2 === 0) ?
      <div
        className={`tile ${isClicked ? 'clicked' : ''} ${isValidMove ? 'validMove' : ''} tileBlack`}
        id={props.x + props.y}
        onClick={handleClick}
      >
        {props.piece}
      </div> :
      <div
        className={`tile ${isClicked ? 'clicked' : ''} ${isValidMove ? 'validMove' : ''}tileWhite`}
        id={props.x + props.y}
        onClick={handleClick}
      >
        {props.piece}
      </div>
  );
}
