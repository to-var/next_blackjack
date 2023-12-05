/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { TResultsProps } from "@/ui/molecules/Results/Results";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Molecules: Results", () => {
  const rendererProps: TResultsProps = {
    winner: "Player",
    newGameCallback: () => {},
  };
  const componentRenderer = (props: TResultsProps): RenderResult => {
    return render(<Molecules.Results {...props} />);
  };

  it("renders the results component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Results")).toBeInTheDocument();
  });

  it("renders the winner label", () => {
    const expectedLabel = "Player";
    const { container } = componentRenderer({
      ...rendererProps,
      winner: expectedLabel,
    });
    expect(
      container.querySelector(".Results__message-title")?.textContent
    ).toBe(expectedLabel);
  });

  it("renders the new game button", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Button")).toBeInTheDocument();
  });

  it("calls newGameCallback on click", () => {
    const newGameCallback = jest.fn();
    const { container } = componentRenderer({
      ...rendererProps,
      newGameCallback,
    });
    const newGameButton = container.querySelector(".Button");

    newGameButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(newGameCallback).toHaveBeenCalled();
  });
});
