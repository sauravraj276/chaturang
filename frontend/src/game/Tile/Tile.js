
import React from 'react';
import './Tile.css';

export default function Tile({ x, y, number, piece, isSelected, isValidMove, onClick }) {
  return (
    <div
      className={`tile ${number % 2 === 0 ? 'tileBlack' : 'tileWhite'} ${isSelected ? 'clicked' : ''} ${isValidMove ? 'validMove' : ''
        }`}
      id={x + y}
      onClick={onClick}
    >
      {piece}
    </div>
  );}