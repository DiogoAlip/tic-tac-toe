import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../src/App";

describe("<App/>", () => {
  test("Activate the modal and change the simbols", () => {
    render(<App />);
    const buttonModal = screen.getByText("Super Mishi");

    fireEvent.click(buttonModal);
    const buttonSimbol = screen.getByLabelText("simbolChanger");
    console.log(buttonSimbol);

    expect(screen.getByTestId("superMishiModal")).toBeTruthy();
  });
});
