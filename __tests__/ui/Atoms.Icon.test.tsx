/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import { TIconProps } from "@/ui/atoms/Icon/Icon";
import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";

describe("UI Atoms: Icon", () => {
  const rendererProps: TIconProps = {
    type: "hearts",
    style: {},
  };
  const componentRenderer = (props: TIconProps): RenderResult => {
    return render(<Atoms.Icon {...props} />);
  };

  it("renders the icon component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Icon")).toBeInTheDocument();
  });

  it("renders the right icon type", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      type: "diamonds",
    });

    expect(container.querySelector(".Icon")?.classList).toContain(
      "Icon--diamonds"
    );
  });

  it("adds inline styles from style props", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      style: { color: "red" },
    });

    const expectedStyles = "color: red;";

    expect(container.querySelector(".Icon")?.getAttribute("style")).toBe(
      expectedStyles
    );
  });
});
