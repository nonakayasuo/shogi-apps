import { Setting } from "../setting";
import { Piece } from "./Piece";

export const Fu = (turn: boolean, piece_num = 6): Piece => {
  const name = Setting.PIECES[piece_num];
  const piece = new Piece(name, turn, piece_num);
  return piece;
};
