import { WINNER_COMBOS } from "../constans"
import confetti from "canvas-confetti"
export const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
        const [a, b, c] = combo
        if (boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            confetti()
            return boardToCheck[a]
        }
    }
    return null 
}