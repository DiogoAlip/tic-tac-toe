import { Square } from "./square"
export const WinnerModal = ({winner, resetGame}) => {
    if (winner == null) return null

    const TextWinnner =  winner == false ? 'Empate' : 'Gano' 

    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {TextWinnner}
                </h2>
    
                <header className="win">
                    {winner && 
                    <Square><img className="table_element" src={winner} alt="" /></Square>}
                </header>
    
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}