/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { TPointsPanelProps } from "@/ui/molecules/PointsPanel/PointsPanel";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Molecules: PointsPanel", () => {
  const rendererProps: TPointsPanelProps = {
    label: "Player",
    score: 0,
  };
  const componentRenderer = (props: TPointsPanelProps): RenderResult => {
    return render(<Molecules.PointsPanel {...props} />);
  };

  it("renders the points panel component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".PointsPanel")).toBeInTheDocument();
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
      label: expectedValue,
    });
    expect(container.querySelector(".PointsPanel__score")?.textContent).toBe(
      expectedValue
    );
  });
});
