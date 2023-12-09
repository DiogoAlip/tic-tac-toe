import { Square } from "./square";
export const WinnerModal = ({
  winner,
  resetGame,
}: {
  winner: null | React.FC<React.SVGProps<SVGSVGElement>>;
  resetGame: () => void;
}) => {
  if (winner == null) return null;

  const TextWinnner = winner === null ? "Empate" : "Gano";

  return (
    <section className="winner">
      <div className="text">
        <h2>{TextWinnner}</h2>

        <header className="win">
          {winner && (
            <Square>
              <img className="table_element" src={winner.toString()} alt="" />
            </Square>
          )}
        </header>

        <footer>
          <button type="button" onClick={resetGame}>
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  );
};
