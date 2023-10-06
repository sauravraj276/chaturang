import React from 'react';
import './Piece.css'
import bw from '../../assets/images/bishop_white.svg'
import bb from '../../assets/images/bishop_black.svg'
import kw from '../../assets/images/king_white.svg'
import kb from '../../assets/images/king_black.svg'
import nw from '../../assets/images/knight_white.svg'
import nb from '../../assets/images/knight_black.svg'
import pw from '../../assets/images/pawn_white.svg'
import pb from '../../assets/images/pawn_black.svg'
import qw from '../../assets/images/queen_white.svg'
import qb from '../../assets/images/queen_black.svg'
import rw from '../../assets/images/rook_white.svg'
import rb from '../../assets/images/rook_black.svg'

const pieceImages = {
  'bw': bw,
  'bb': bb,
  'kw': kw,
  'kb': kb,
  'nw': nw,
  'nb': nb,
  'pw': pw,
  'pb': pb,
  'qw': qw,
  'qb': qb,
  'rw': rw,
  'rb': rb,
};

export default function Piece(props) {

  return <img
    id={props.name}
    className='piece' key={props.name} src={pieceImages[props.name]} alt="Chess Piece" />
}
