import { Square } from "./square";
import { marks } from "../constans";
import { useState } from "react";

export function NavBar({board, setBoard, turn, TURNS}){
    const [modal, setModal] = useState(false)
    const activateModal = () => {
        setModal(!modal)
    }

    const simbolChanger = (number) => {
        const newBoard = board.map((element)=>{
            if(element == turn){element = marks[number]}
            
        })
        setBoard(newBoard)

        for( let i in TURNS){
            if(i == turn){
                i = marks[number]
            }
            console.log(i)
        }
        activateModal()
    }

    return <div className="nav">
        <button onClick={activateModal}>Super Mishi</button>
        {modal && <section className="character-selector">
            {
                marks.map((_,index) => {
                    return (<Square key={index}>
                        <img 
                            className="table_element"
                            src={marks[index]}
                            alt=""
                            onClick={simbolChanger}/>
                    </Square>)
                })
            }
        </section>}
    </div>
}