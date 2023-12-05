/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import { THeadingProps } from "@/ui/atoms/Heading/Heading";
import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";

describe("UI Atoms: Heading", () => {
  const rendererProps: THeadingProps = {
    level: 1,
    children: "Heading",
    style: {},
  };
  const componentRenderer = ({
    children,
    ...restProps
  }: THeadingProps): RenderResult => {
    return render(<Atoms.Heading {...restProps}>{children}</Atoms.Heading>);
  };

  it("renders the heading component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Heading")).toBeInTheDocument();
  });

  it("renders the right heading tag based on level prop", () => {
    const { container } = componentRenderer({ ...rendererProps, level: 2 });
    expect(container.querySelector(".Heading")?.tagName).toBe("H2");
  });

  it("renders the right heading classname based on level prop", () => {
    const { container } = componentRenderer({ ...rendererProps, level: 2 });
    expect(container.querySelector(".Heading")?.classList).toContain(
      "Heading--h2"
    );
  });

  it("renders heading children", () => {
    const expectedChildren = "The right heading";
    const { container } = componentRenderer({
      ...rendererProps,
      children: expectedChildren,
    });

    expect(container.querySelector(".Heading")).toHaveTextContent(
      expectedChildren
    );
  });

  it("adds inline styles from style props", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      style: { color: "red" },
    });

    const expectedStyles = "color: red;";

    expect(container.querySelector(".Heading")?.getAttribute("style")).toBe(
      expectedStyles
    );
  });
});
