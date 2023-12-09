import { WinnerModal } from "../../src/components/WinnerModal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("WinnerModal.jsx", () => {
  test("shouldnt return a component", () => {
    const { container } = render(<WinnerModal winner={null} />);
    expect(container.getElementsByClassName("winner")[0]).toBeFalsy();
  });

  test("should return a component in won state", () => {
    const won = true;
    const { container } = render(<WinnerModal winner={won} />);
    expect(container.getElementsByClassName("winner")[0]).toBeTruthy();

    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe("Gano");

    expect(screen.getByTestId("Square-id")).toBeTruthy();

    expect(container.getElementsByClassName("win")).toBeTruthy();

    expect(screen.getByText("Empezar de nuevo")).toBeTruthy();
  });

  test("should return a component in lost state", () => {
    const lost = false;
    const { container } = render(<WinnerModal winner={lost} />);

    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe("Empate");

    expect(container.getElementsByClassName("table_element")[0]).toBeFalsy();

    expect(container.getElementsByClassName("win")).toBeTruthy();
  });

  test("WinnerModal should return an event", () => {
    let variable = false;
    const { container } = render(
      <WinnerModal
        resetGame={() => {
          variable = true;
        }}
        winner={!variable}
      />
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByText("Empezar de nuevo"));
    expect(variable).toBe(true);
  });
});
