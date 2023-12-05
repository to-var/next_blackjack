/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { TActionsPanelProps } from "@/ui/molecules/ActionsPanel/ActionsPanel";
import "@testing-library/jest-dom";
import { screen, render, RenderResult } from "@testing-library/react";

describe("UI Molecules: ActionsPanel", () => {
  const rendererProps: TActionsPanelProps = {
    hitCallback: () => {},
    standCallback: () => {},
    disabledButtons: false,
  };
  const componentRenderer = (props: TActionsPanelProps): RenderResult => {
    return render(
      <Molecules.ActionsPanel
        hitCallback={props.hitCallback}
        standCallback={props.standCallback}
        disabledButtons={props.disabledButtons}
      />
    );
  };

  it("renders the player actions component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".ActionsPanel")).toBeInTheDocument();
  });

  it("renders the hit button", () => {
    componentRenderer(rendererProps);
    expect(screen.getByText("Hit")).toBeInTheDocument();
  });

  it("renders the stand button", () => {
    componentRenderer(rendererProps);
    expect(screen.getByText("Stand")).toBeInTheDocument();
  });
});
