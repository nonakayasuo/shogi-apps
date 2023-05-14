import { Setting } from "../setting";
import { Piece } from "./Piece";

export const Kaku = (turn: boolean, piece_num = 1): Piece => {
  const name = Setting.PIECES[piece_num];
  const piece = new Piece(name, turn, piece_num);
  return piece;
};
