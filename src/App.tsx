import { useState } from "react";
import { marks, TURNS } from "./constans";
import { Square } from "./components/square";
import { checkWinner } from "./logic/checkWinner";
import { WinnerModal } from "./components/WinnerModal";
import exit from "./assets/xmark-solid.svg";

export function App() {
  const [victoriesCount, setVictoriesCount] = useState({
    x: 0,
    o: 0,
  });
  const [turnx, setTurnx] = useState<React.FC<React.SVGProps<SVGSVGElement>>>(
    (window.localStorage.getItem("simbolX") as unknown as React.FC<
      React.SVGProps<SVGSVGElement>
    >) ?? TURNS.x
  );
  const [turno, setTurno] = useState<React.FC<React.SVGProps<SVGSVGElement>>>(
    (window.localStorage.getItem("simbolO") as unknown as React.FC<
      React.SVGProps<SVGSVGElement>
    >) ?? TURNS.o
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

  const [winner, setWinner] = useState<
    React.FC<React.SVGProps<SVGSVGElement>> | null | boolean
  >(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    /* setTurnx(TURNS.x);
    setTurno(TURNS.o); */
    setTurn(turnx); //setTurn(TURNS.o)
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
    window.localStorage.removeItem("simbolX");
    window.localStorage.removeItem("simbolO");
  };

  const checkEndGame = (newBoard: React.FC<React.SVGProps<SVGSVGElement>>[]) =>
    newBoard.every((Square) => Square != null);

  const updateBoard = (index: number) => {
    //por si se ocupo
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    if (checkEndGame(newBoard)) {
      setWinner(false);
      return;
    }

    //cambiar el turno
    const newTurn = turn === turnx ? turno : turnx;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn as unknown as string);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === TURNS.x)
        setVictoriesCount({ ...victoriesCount, x: victoriesCount.x + 1 });
      else setVictoriesCount({ ...victoriesCount, o: victoriesCount.o + 1 });
    }
  };

  const [modal, setModal] = useState(false);
  const activateModal = () => {
    setModal(!modal);
  };

  const simbolChanger = (number: number) => {
    setBoard(
      board.map((element) => (element === turn ? marks[number] : element))
    );

    if (turn === turnx) {
      setTurnx(marks[number]);
      window.localStorage.setItem(
        "simbolX",
        marks[number] as unknown as string
      );
    } else {
      setTurno(marks[number]);
      window.localStorage.setItem(
        "simbolO",
        marks[number] as unknown as string
      );
    }
    setTurn(marks[number]);
    activateModal();
  };

  return (
    <div className="board">
      <div className="buttons_container">
        <button type="button" onClick={activateModal}>
          Super Mishi
        </button>
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={resetGame}>Empezar de nuevo</button>
        <button type="button" onClick={() => setVictoriesCount({ x: 0, o: 0 })}>
          Reiniciar Puntuaccion
        </button>
      </div>
      {modal && (
        <div
          className="character-selector_container"
          data-testid="superMishiModal"
        >
          <button type="button" onClick={activateModal}>
            <img src={exit as unknown as string} alt="" />
          </button>
          <section className="character-selector" aria-label="simbolChanger">
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
        <Square>{victoriesCount.x === 0 ? undefined : victoriesCount.x}</Square>
        <Square isSelected={turn === turnx} aria-label="simbolO">
          <img
            className="table_element"
            src={turnx as unknown as string}
            alt=""
          />
        </Square>
        <Square isSelected={turn === turno} aria-label="simbolX">
          <img
            className="table_element"
            src={turno as unknown as string}
            alt=""
          />
        </Square>
        <Square>{victoriesCount.o === 0 ? undefined : victoriesCount.o}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
}
