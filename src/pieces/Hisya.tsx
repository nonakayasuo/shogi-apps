import { Setting } from "../setting";
import { Piece } from "./Piece";

export const Hisya = (turn: boolean, piece_num = 0): Piece => {
  const name = Setting.PIECES[piece_num];
  const piece = new Piece(name, turn, piece_num);
  return piece;
};
