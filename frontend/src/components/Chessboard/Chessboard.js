import React from 'react';
import './Chessboard.css'
import Tile from '../Tile/Tile';
import Piece from '../Piece/Piece';
import { GameStateProvider,useGameState } from '../../context/GameStateContect';


const verticleAxis = [1, 2, 3, 4, 5, 6, 7, 8]; // The verticle axis of the board
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]; // The horizontal axis of the board



export default function Chessboard() {
    const { state, dispatch } = useGameState();
    let boardState=state.chess.board();
    let board = [];

    // to make the chesspiece map from the boardState 
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
    for (let i = 7; i >=0; i--) {
        for (let j = 0; j < 8; j++) {
            // if i+j is odd then push the black box else the white one
            
            var piece=<></>;
            let k=horizontalAxis[j]+verticleAxis[i]
           
            if(chessPiecesMap[k]){
                let piece=chessPiecesMap[k];
                let name=piece.type+piece.color;
                piece=<Piece name={name} />;
                board.push(<Tile key={k} x={horizontalAxis[j]} y={verticleAxis[i]} number={i + j} piece={piece} />)
            }else{
                board.push(<Tile key={k} x={horizontalAxis[j]} y={verticleAxis[i]} number={i + j} piece={piece} />)
            }
            
        }
    }

         return    <div id="board" >{board}</div>;
}
