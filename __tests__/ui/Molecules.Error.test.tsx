/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { TErrorProps } from "@/ui/molecules/Error/Error";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Molecules: Error", () => {
  const rendererProps: TErrorProps = {
    error: "Error",
  };
  const componentRenderer = (props: TErrorProps): RenderResult => {
    return render(<Molecules.Error {...props} />);
  };

  it("renders the error component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Error")).toBeInTheDocument();
  });

  it("renders error.message", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      error: { message: "Error" },
    });

    expect(container.querySelector(".Error")?.textContent).toBe("Error");
  });

  it("renders error as string", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      error: "Error",
    });

    expect(container.querySelector(".Error")?.textContent).toBe("Error");
  });

  it("renders unkwown error message", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      error: { results: "Error" },
    });

    expect(container.querySelector(".Error")?.textContent).toBe(
      "Unkwnown Error"
    );
  });
});
