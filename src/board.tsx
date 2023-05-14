import { useState } from "react";
import "./index.css";
import { Setting } from "./setting";
import { Piece } from "./pieces/Piece";
import React from "react";

type ISquareProps = {
  is_final: boolean;
  is_clicked: boolean;
  can_control: boolean;
  value: string;
  is_black: boolean;
  is_captured: boolean;
  onClick: () => void;
  is_mobile: boolean;
};

function Square(props: ISquareProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [classString, setClassString] = useState(() => {
    let str = "";
    if (props.is_captured) {
      str = props.is_mobile ? "mobile-captured" : "captured";
    } else {
      str = props.is_mobile ? "mobile-square piece" : "square piece";
      if (!props.is_black) {
        str = str + " white";
      }
    }
    if (props.is_final) {
      str = str + " final";
    }
    if (props.is_clicked) {
      str = str + " click";
    }
    if (props.can_control) {
      str = str + " attack";
    }
    return str;
  });

  return (
    <button className={classString} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

type IBoardProps = {
  squares: Piece[][];
  onClick: (i: number) => void;
  clicked_piece: number;
  control_piece: boolean[][];
  final_piece: number;
  is_mobile: boolean;
};

export function Board(props: IBoardProps) {
  const {
    squares,
    onClick,
    control_piece,
    final_piece,
    clicked_piece,
    is_mobile,
  } = props;

  function content(y: number) {
    return Array.from({ length: Setting.LENGTH }, (_, x) => {
      const i = x * Setting.LENGTH + y + Setting.WHITE * 2;
      const is_control = control_piece[x][y];
      const is_final = i === final_piece - Setting.WHITE * 2;
      const is_clicked = i === clicked_piece - Setting.WHITE * 2;

      return (
        <Square
          key={i}
          is_final={is_final}
          is_clicked={is_clicked}
          can_control={is_control}
          value={squares[x][y].out()}
          is_black={squares[x][y].turn()}
          is_captured={false}
          onClick={() => onClick(i)}
          is_mobile={is_mobile}
        />
      );
    });
  }

  return (
    <div>
      {Array.from({ length: Setting.LENGTH }, (_, y) => (
        <div className="board-row ley" key={y}>
          {content(y)}
        </div>
      ))}
    </div>
  );
}

interface ICapturedProps {
  squares: number[];
  clicked_piece: number;
  is_black: boolean;
  turn: boolean;
  onClick: (i: number) => void;
  is_mobile: boolean;
}

interface ICapturedState {
  squares: number[];
  clicked_piece: number;
  is_black: boolean;
  turn: boolean;
  onClick: (i: number) => void;
}

export class Captured extends React.Component<ICapturedProps, ICapturedState> {
  renderSquare(is_clicked: boolean, i: number) {
    return (
      <Square
        key={i}
        is_final={false}
        is_clicked={is_clicked}
        value={Setting.PIECES[i]}
        is_black={this.props.is_black}
        is_captured={true}
        can_control={false}
        onClick={
          this.props.is_black
            ? () => this.props.onClick(i)
            : () => this.props.onClick(i + Setting.WHITE)
        }
        is_mobile={this.props.is_mobile}
      />
    );
  }

  render() {
    let items = new Array<JSX.Element>();
    const clicked_piece: number = this.props.turn
      ? this.props.clicked_piece
      : this.props.clicked_piece - Setting.WHITE;
    const is_black: boolean = this.props.is_black;
    const turn: boolean = this.props.turn;
    for (let i = 0; i < Setting.WHITE; ++i) {
      let num = this.props.squares[i];
      if (num > 0) {
        if (i === clicked_piece && is_black === turn) {
          items = items.concat(
            <div className="board-row ley" key={i}>
              {this.renderSquare(true, i)}
            </div>
          );
        } else {
          items = items.concat(
            <div className="board-row ley" key={i}>
              {this.renderSquare(false, i)}
            </div>
          );
        }
        if (num > 1) {
          items = items.concat(
            <div className="board-row ley" key={"num" + i}>
              {<button className={"number"}>{Setting.NUM[num]}</button>}
            </div>
          );
        }
      }
    }

    return <div>{items}</div>;
  }
}
