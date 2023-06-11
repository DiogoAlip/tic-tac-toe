export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? "is-selected" : ""}`
    return(
        <div data-testid="Square-id" onClick={updateBoard} className={className}>
            {children}
        </div>
    )
}