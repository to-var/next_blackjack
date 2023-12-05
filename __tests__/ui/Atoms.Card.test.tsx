/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import { TCardProps } from "@/ui/atoms/Card/Card";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("UI Atoms: Card", () => {
  const rendererProps: TCardProps = {
    data: ["hearts", "A"] as TCard,
    style: {},
  };
  const componentRenderer = (props: TCardProps): RenderResult => {
    return render(<Atoms.Card {...props} />);
  };

  it("renders the card component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".Card")).toBeInTheDocument();
  });

  it("renders the right card type", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      data: ["hearts", "A"],
    });

    expect(container.querySelector(".Card")?.classList).toContain(
      "Card--hearts"
    );
  });

  it("renders the right card value", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      data: ["hearts", "A"],
    });

    expect(
      container.querySelector(".Card__value")?.getAttribute("data-content")
    ).toBe("A");
  });

  it("renders the right aria-label", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      data: ["hearts", "A"],
    });

    const expectedArialLabel = "A of hearts - Card";

    expect(container.querySelector(".Card")?.getAttribute("aria-label")).toBe(
      expectedArialLabel
    );
  });

  it("renders the aria-label for hidden cards", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      data: [null, null],
    });

    const expectedArialLabel = "Hidden Card";

    expect(container.querySelector(".Card")?.getAttribute("aria-label")).toBe(
      expectedArialLabel
    );
  });

  it("adds inline styles from style props", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      style: { color: "red" },
    });

    const expectedStyles = "color: red;";

    expect(container.querySelector(".Card")?.getAttribute("style")).toBe(
      expectedStyles
    );
  });

  it("renders hidden card", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      data: [null, null],
    });

    expect(container.querySelector(".Card")?.classList).toContain(
      "Card--hidden"
    );
  });
});
