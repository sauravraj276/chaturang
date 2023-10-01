import React from 'react';
import './Tile.css'



export default function Tile(props) {

    // if i+j is odd then push the black box else the white one
    return ((props.number) % 2 === 0) ?
        <div  className="tile tileBlack" id={props.x + props.y}> {props.piece}</div>
        :
        <div  className="tile tileWhite" id={props.x + props.y}> {props.piece} </div>;
}
