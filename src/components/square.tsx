import React from "react";

type Props = {
  children?: JSX.Element | number;
  isSelected?: boolean;
  updateBoard?: () => void;
  index?: number;
};

export const Square = ({ children, isSelected, updateBoard, index }: Props) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  return (
    <React.Fragment>
      {/** rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>*/}
      <div data-testid="Square-id" onClick={updateBoard} className={className}>
        {children}
      </div>
    </React.Fragment>
  );
};
