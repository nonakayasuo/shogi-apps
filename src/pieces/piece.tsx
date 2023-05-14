import { Setting } from "../setting";

export interface PieceType {
  out: () => string;
  turn: () => boolean;
  piece_num: () => number;
  promote: () => void;
}

export class Piece implements PieceType {
  // 出力する文字
  private _out: string;
  // 先手の駒か
  private _turn: boolean;
  // 駒番号
  private _piece_num: number;

  constructor(out: string, turn: boolean, piece_num: number) {
    this._out = out;
    this._turn = turn;
    this._piece_num = piece_num;
  }

  public out(): string {
    return this._out;
  }

  public turn(): boolean {
    return this._turn;
  }

  public piece_num(): number {
    return this._piece_num;
  }

  public promote(): void {
    this._piece_num += Setting.MT / 2;
    this._out = Setting.PIECES[this._piece_num];
  }
}
