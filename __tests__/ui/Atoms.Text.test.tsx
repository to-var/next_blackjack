/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import { TTextProps } from "@/ui/atoms/Text/Text";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Atoms: Heading", () => {
  const rendererProps: TTextProps = {
    children: "Heading",
    style: {},
    shadow: false,
    size: 1,
    type: "primary",
  };
  const componentRenderer = ({
    children,
    ...restProps
  }: TTextProps): RenderResult => {
    return render(<Atoms.Text {...restProps}>{children}</Atoms.Text>);
  };

  it("renders the text component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Text")).toBeInTheDocument();
  });

  it("renders the right size classname based on size prop", () => {
    const { container } = componentRenderer({ ...rendererProps, size: 2 });
    expect(container.querySelector(".Text")?.classList).toContain(
      "Text--size-2"
    );
  });

  it("renders the right type classname based on type prop", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      type: "secondary",
    });
    expect(container.querySelector(".Text")?.classList).toContain(
      "Text--secondary"
    );
  });

  it("renders the right shadow classname based on shadow prop", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      shadow: true,
    });
    expect(container.querySelector(".Text")?.classList).toContain(
      "Text--shadow"
    );
  });

  it("renders text children", () => {
    const expectedChildren = "The right paragraph";
    const { container } = componentRenderer({
      ...rendererProps,
      children: expectedChildren,
    });

    expect(container.querySelector(".Text")).toHaveTextContent(
      expectedChildren
    );
  });

  it("adds inline styles from style props", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      style: { color: "red" },
    });

    const expectedStyles = "color: red;";

    expect(container.querySelector(".Text")?.getAttribute("style")).toBe(
      expectedStyles
    );
  });
});
