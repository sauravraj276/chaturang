import React from 'react';
import './chessboard.css'

const verticleAxis = [1, 2, 3, 4, 5, 6, 7, 8]; // The verticle axis of the board
const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"]; // The horizontal axis of the board

function chessboard() {
    let board = [];

    //To populate the board with boxes 
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // if i+j is odd then push the black box else the white one
            (i + j) % 2 != 0 ?
                board.push(<div className="box b_black" id={horizontalAxis[i]+verticleAxis[j]}> </div>)
                :
                board.push(<div className="box b_white" id={horizontalAxis[i]+verticleAxis[j]}>  </div>);
        }

    }

    return (
        <div id="board" >
            {board}
        </div>
    );
}

export default chessboard;