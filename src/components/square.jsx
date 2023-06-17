export const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? "is-selected" : ""}`;
	return (
		// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div data-testid="Square-id" onClick={updateBoard} className={className}>
			{children}
		</div>
	);
};
