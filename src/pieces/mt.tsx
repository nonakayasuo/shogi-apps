import { Setting } from "../setting";
import { Piece } from "./Piece";

export const Mt = (turn = true, piece_num = 16): Piece => {
  const name = Setting.PIECES[piece_num];
  const piece: Piece = new Piece(name, turn, piece_num);
  return piece;
};
