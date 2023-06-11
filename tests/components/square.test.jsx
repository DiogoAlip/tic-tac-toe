import { fireEvent, render, screen } from "@testing-library/react";
import { Square } from "../../src/components/square";

describe('square.jsx',()=>{
    const string = 'string'

    test('Square should match with the snapshot',()=>{
        const {container} = render(<Square/>)
        expect(container).toMatchSnapshot()
    })

    test('Square should return a children', ()=>{
        const headear1 = <h1>{string}</h1>
        render(<Square children={string}/>)
        expect(screen.getByText(string).innerHTML).toBe(string)

        render(<Square>{headear1}</Square>)
        expect(screen.getByRole('heading',{level:1}).innerHTML).toBe(string)
    })

    test('Square shouldnt return className',()=>{
        const name = "square "

        const {container} = render(<Square></Square>)
        expect(screen.getByTestId("Square-id")).toBeTruthy()
        expect(container.getElementsByClassName(`${name}`)).toBeTruthy()
    })

    test('Square should return className',()=>{
        const name = "square is-selected"

        const {container} = render(<Square isSelected={string}></Square>)
        expect(screen.getByTestId("Square-id")).toBeTruthy()
        expect(container.getElementsByClassName(`${name}`)).toBeTruthy()
    })

    test('Square should return an event',()=>{
        let variable = false
        render(<Square children={string} updateBoard={() => {variable = true}}/>)
        fireEvent.click(screen.getByTestId("Square-id"))
        expect(variable).toBeTruthy()
    })
})