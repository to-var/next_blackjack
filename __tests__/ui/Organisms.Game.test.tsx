/**
 * @jest-environment jsdom
 */

import Organisms from "@/ui/organisms";
import { TGameProps } from "@/ui/organisms/Game/Game";
import "@testing-library/jest-dom";
import {
  RenderResult,
  fireEvent,
  getByText,
  render,
} from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import * as CONSTANTS from "@/utils/constants";

describe("UI Organisms: Game", () => {
  const gameData: TGameData = {
    winner: "",
    deck: [],
    id: "0",
    playerhand: [],
    playerscore: 0,
    dealerhand: [],
    dealerscore: 0,
  };

  const defaultProps: TGameProps = {
    gameData: null,
    error: null,
    isGameLoading: false,
    disabledButtons: false,
    hitHandler: jest.fn(async () => {
      return gameData;
    }),
    standHandler: jest.fn(async () => {
      return gameData;
    }),
    gameStartHandler: jest.fn(async () => {
      return gameData;
    }),
  };

  const componentRenderer = (props = defaultProps): RenderResult => {
    return render(<Organisms.Game {...props} />);
  };

  it("renders the player component", () => {
    const { container } = componentRenderer(defaultProps);
    expect(container.querySelector(".Game")).toBeInTheDocument();
    expect(container.querySelector(".Intro")).toBeInTheDocument();
  });

  it("renders the results component", () => {
    const { container } = componentRenderer({
      ...defaultProps,
      gameData: { ...gameData, winner: "Player" },
    });
    expect(container.querySelector(".Results")).toBeInTheDocument();
  });

  it("renders the loading spinner component", () => {
    const { container } = componentRenderer({
      ...defaultProps,
      gameData,
      isGameLoading: true,
    });
    expect(container.querySelector(".Spinner")).toBeInTheDocument();
  });

  it("renders the error component", () => {
    const { container } = componentRenderer({
      ...defaultProps,
      gameData: null,
      isGameLoading: false,
      error: "Error",
    });
    expect(container.querySelector(".Error")).toBeInTheDocument();
  });

  it("renders the game table", () => {
    const { container } = componentRenderer({
      ...defaultProps,
      gameData,
    });
    expect(container.querySelectorAll(".Player")).toHaveLength(2);
  });

  it("renders error component when there is an error", () => {
    const { container } = componentRenderer({
      ...defaultProps,
      error: "Error",
    });
    expect(container.querySelector(".Error")).toBeInTheDocument();
  });

  it("triggers a new game", () => {
    const { baseElement } = componentRenderer(defaultProps);

    act(() => {
      fireEvent(
        getByText(baseElement, CONSTANTS.GAME_TEXT.play),
        new MouseEvent("click", {
          bubbles: true,
        })
      );
    });

    expect(defaultProps.gameStartHandler).toHaveBeenCalledTimes(1);
  });

  it("triggers a new game from results component", () => {
    const customStartHandler = jest.fn(async () => {});
    const { baseElement } = componentRenderer({
      ...defaultProps,
      gameData: { ...gameData, winner: "Player" },
      gameStartHandler: customStartHandler,
    });

    act(() => {
      fireEvent(
        getByText(baseElement, CONSTANTS.GAME_TEXT.playAgain),
        new MouseEvent("click", {
          bubbles: true,
        })
      );
    });

    expect(customStartHandler).toHaveBeenCalledTimes(1);
  });

  it("triggers hit action", () => {
    const { baseElement } = componentRenderer({
      ...defaultProps,
      gameData: { ...gameData, id: "1" },
    });

    act(() => {
      fireEvent(
        getByText(baseElement, CONSTANTS.GAME_TEXT.hit),
        new MouseEvent("click", {
          bubbles: true,
        })
      );
    });

    expect(defaultProps.hitHandler).toHaveBeenCalledTimes(1);
  });

  it("triggers stand action", () => {
    const { baseElement } = componentRenderer({
      ...defaultProps,
      gameData: { ...gameData, id: "1" },
    });

    act(() => {
      fireEvent(
        getByText(baseElement, CONSTANTS.GAME_TEXT.stand),
        new MouseEvent("click", {
          bubbles: true,
        })
      );
    });

    expect(defaultProps.standHandler).toHaveBeenCalledTimes(1);
  });
});
