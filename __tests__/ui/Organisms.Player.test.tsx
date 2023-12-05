/**
 * @jest-environment jsdom
 */

import Organisms from "@/ui/organisms";
import { TPlayerProps } from "@/ui/organisms/Player/Player";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Organisms: Player", () => {
  const rendererProps: TPlayerProps = {
    label: "Player",
    score: 0,
    hand: [],
    isDealer: false,
    children: "Children",
  };
  const componentRenderer = (props: TPlayerProps): RenderResult => {
    return render(<Organisms.Player {...props} />);
  };

  it("renders the player component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Player")).toBeInTheDocument();
  });

  it("renders the player label", () => {
    const expectedLabel = "Player";
    const { container } = componentRenderer({
      ...rendererProps,
      label: expectedLabel,
    });
    expect(container.querySelector(".PointsPanel__label")?.textContent).toBe(
      expectedLabel
    );
  });

  it("renders the player score", () => {
    const expectedValue = "0";
    const { container } = componentRenderer({
      ...rendererProps,
      score: 0,
    });
    expect(container.querySelector(".PointsPanel__score")?.textContent).toBe(
      expectedValue
    );
  });

  it("renders dealer info", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      isDealer: true,
    });
    expect(container.querySelector(".Player--dealer")).toBeInTheDocument();
  });

  it("renders component without children prop", () => {
    const { children, ...restProps } = rendererProps;
    const { container } = componentRenderer({ ...restProps });
    expect(container.querySelector(".Player__actions")).not.toBeInTheDocument();
  });
});
