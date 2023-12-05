/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { TIntroProps } from "@/ui/molecules/Intro/Intro";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Molecules: Intro", () => {
  const rendererProps: TIntroProps = {
    newGameCallback: () => {},
  };
  const componentRenderer = (props: TIntroProps): RenderResult => {
    return render(<Molecules.Intro newGameCallback={props.newGameCallback} />);
  };

  it("renders the intro component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Intro")).toBeInTheDocument();
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

  it("renders the title", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Intro__heading")).toBeInTheDocument();
  });

  it("renders the description", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Intro__description")).toBeInTheDocument();
  });
});
