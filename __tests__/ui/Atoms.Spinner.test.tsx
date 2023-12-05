/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Atoms: Spinner", () => {
  const componentRenderer = (): RenderResult => {
    return render(<Atoms.Spinner />);
  };

  it("renders the spiner component", () => {
    const { container } = componentRenderer();
    expect(container.querySelector(".Spinner")).toBeInTheDocument();
  });
});
