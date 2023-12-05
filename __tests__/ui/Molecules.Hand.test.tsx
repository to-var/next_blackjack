/**
 * @jest-environment jsdom
 */

import Molecules from "@/ui/molecules";
import { THandProps } from "@/ui/molecules/Hand/Hand";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";
import { CARD_ANIMATION_DELAY } from "@/utils/constants";
import { act } from "react-dom/test-utils";

describe("UI Molecules: Hand", () => {
  const rendererProps: THandProps = {
    hand: [
      ["hearts", "A"],
      ["diamonds", "A"],
    ],
    isDealer: false,
  };
  const componentRenderer = (props: THandProps): RenderResult => {
    return render(<Molecules.Hand {...props} />);
  };

  it("renders the hand component", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".PlayerHand")).toBeInTheDocument();
  });

  it("renders the player hand css class", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelector(".PlayerHand")?.classList).toContain(
      "PlayerHand--player"
    );
  });

  it("renders the dealer hand css class", () => {
    const { container } = componentRenderer({
      ...rendererProps,
      isDealer: true,
    });
    expect(container.querySelector(".PlayerHand")?.classList).toContain(
      "PlayerHand--dealer"
    );
  });

  it("renders the hand cards", () => {
    const { container } = componentRenderer(rendererProps);
    expect(container.querySelectorAll(".Card")).toHaveLength(2);
  });

  it("adds timed inline styles to cards", () => {
    jest.useFakeTimers();

    const { container } = componentRenderer(rendererProps);

    expect(container.querySelector(".Card")?.getAttribute("style")).toBe(null);

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    expect(container.querySelector(".Card")?.getAttribute("style")).toContain(
      "opacity: 1;"
    );
  });

  it("adds timed inline styles to cards", () => {
    jest.useFakeTimers();

    const { container } = componentRenderer(rendererProps);

    expect(container.querySelector(".Card")?.getAttribute("style")).toBe(null);

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    expect(container.querySelector(".Card")?.getAttribute("style")).toContain(
      "opacity: 1;"
    );
  });

  it("adds inline styles to dealer's middle card", () => {
    jest.useFakeTimers();

    const { container } = componentRenderer({
      ...rendererProps,
      isDealer: true,
      hand: [
        ["hearts", "A"],
        ["hearts", "A"],
        ["hearts", "A"],
      ],
    });

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    expect(
      container.querySelectorAll(".Card")[1]?.getAttribute("style")
    ).toContain("top: 56%;");
  });

  it("adds inline styles to player's middle card", () => {
    jest.useFakeTimers();

    const { container } = componentRenderer({
      ...rendererProps,
      isDealer: false,
      hand: [
        ["hearts", "A"],
        ["hearts", "A"],
        ["hearts", "A"],
      ],
    });

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    expect(
      container.querySelectorAll(".Card")[1]?.getAttribute("style")
    ).toContain("top: 44%;");
  });

  it("adds inline styles to player's middle card", () => {
    jest.useFakeTimers();

    const { container } = componentRenderer({
      isDealer: false,
      hand: [
        ["hearts", "A"],
        ["hearts", "A"],
        ["hearts", "A"],
      ],
    });

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    expect(
      container.querySelectorAll(".Card")[1]?.getAttribute("style")
    ).toContain("top: 44%;");
  });

  it("update inline styles when the props change", () => {
    jest.useFakeTimers();

    const { container, rerender } = componentRenderer({
      isDealer: false,
      hand: [
        ["hearts", "A"],
        ["hearts", "A"],
      ],
    });

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    const initialStyles = container
      .querySelectorAll(".Card")[1]
      ?.getAttribute("style");

    rerender(
      <Molecules.Hand
        isDealer={false}
        hand={[
          ["hearts", "A"],
          ["hearts", "A"],
          ["hearts", "A"],
        ]}
      />
    );

    act(() => {
      jest.advanceTimersByTime(CARD_ANIMATION_DELAY);
    });

    const newStyles = container
      .querySelectorAll(".Card")[1]
      ?.getAttribute("style");

    expect(newStyles).not.toBe(initialStyles);
  });
});
