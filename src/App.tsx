import { useState } from "react";
import { marks, TURNS } from "./constans";
import { Square } from "./components/square";
import { checkWinner } from "./logic/checkWinner";
import { WinnerModal } from "./components/WinnerModal";
import exit from "./assets/xmark-solid.svg";

export function App() {
  const [turnx, setTurnx] = useState<React.FC<React.SVGProps<SVGSVGElement>>>(
    TURNS.x
  );
  const [turno, setTurno] = useState<React.FC<React.SVGProps<SVGSVGElement>>>(
    TURNS.o
  );

  const [board, setBoard] = useState<
    Array<React.FC<React.SVGProps<SVGSVGElement>>>
  >(() => {
    return (
      //@ts-ignore
      JSON.parse(window.localStorage.getItem("board")) ?? Array(9).fill(null)
    );
  });

  const [turn, setTurn] = useState<React.FC<React.SVGProps<SVGSVGElement>>>(
    (window.localStorage.getItem("turn") as unknown as React.FC<
      React.SVGProps<SVGSVGElement>
    >) ?? turnx
  );

  const [winner, setWinner] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    setTurn(turnx);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const checkEndGame = (
    newBoard: React.FC<React.SVGProps<SVGSVGElement>>[]
  ) => {
    return newBoard.every((Square) => Square != null);
  };

  const updateBoard = (index: number) => {
    //por si se ocupo
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar el turno
    const newTurn = turn === turnx ? turno : turnx;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn as unknown as string);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      checkEndGame(board);
    }
  };

  const [modal, setModal] = useState(false);
  const activateModal = () => {
    setModal(!modal);
  };

  const simbolChanger = (number: number) => {
    setBoard(
      board.map((element) => {
        if (element === turn) {
          return marks[number];
        } else {
          return element;
        }
      })
    );
    if (turn === turnx) {
      setTurnx(marks[number]);
    } else {
      setTurno(marks[number]);
    }
    setTurn(marks[number]);
    activateModal();
  };

  return (
    <div className="board">
      <button type="button" onClick={activateModal}>
        Super Mishi
      </button>
      {modal && (
        <div className="character-selector_container">
          <button type="button" onClick={activateModal}>
            <img src={exit as unknown as string} alt="" />
          </button>
          <section className="character-selector">
            {marks.map((_, index) => {
              return (
                marks[index] !== turnx &&
                marks[index] !== turno && (
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <Square key={index}>
                    {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <img
                      className="table_element"
                      src={marks[index] as unknown as string}
                      alt=""
                      onClick={() => simbolChanger(index)}
                    />
                  </Square>
                )
              );
            })}
          </section>
        </div>
      )}
      {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              index={index}
              updateBoard={() => updateBoard(index)}
            >
              <img
                className="table_element"
                src={board[index] as unknown as string}
                alt=""
              />
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === turnx}>
          <img
            className="table_element"
            src={turnx as unknown as string}
            alt=""
          />
        </Square>
        <Square isSelected={turn === turno}>
          <img
            className="table_element"
            src={turno as unknown as string}
            alt=""
          />
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
}
