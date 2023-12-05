/**
 * @jest-environment jsdom
 */

import Atoms from "@/ui/atoms";
import { TButtonProps } from "@/ui/atoms/Button/Button";
import "@testing-library/jest-dom";
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

describe("UI Atoms: Button", () => {
  const btnText = "Click me";
  const mockFunction = jest.fn(() => {}) as () => void;
  const rendererProps: TButtonProps = {
    children: btnText,
    onClick: mockFunction,
    type: "primary",
  };
  const componentRenderer = ({
    children,
    ...restProps
  }: TButtonProps): RenderResult => {
    return render(<Atoms.Button {...restProps}>{children}</Atoms.Button>);
  };

  it("renders the button component", () => {
    componentRenderer(rendererProps);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders component children", () => {
    componentRenderer(rendererProps);
    expect(screen.getByRole("button")).toHaveTextContent(btnText);
  });

  it("renders primary button", () => {
    componentRenderer(rendererProps);
    expect(screen.getByRole("button")).toHaveClass("Button--primary");
  });

  it("renders secondary button", () => {
    componentRenderer({ ...rendererProps, type: "secondary" });
    expect(screen.getByRole("button")).toHaveClass("Button--secondary");
  });

  it("renders large button", () => {
    componentRenderer({ ...rendererProps, type: "large" });
    expect(screen.getByRole("button")).toHaveClass("Button--large");
  });

  it("renders disabled button", () => {
    componentRenderer({ ...rendererProps, disabled: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders disabled button with class name modifier", () => {
    componentRenderer({ ...rendererProps, disabled: true });
    expect(screen.getByRole("button")).toHaveClass("Button--disabled");
  });

  it("calls the mock function when clicked", async () => {
    componentRenderer(rendererProps);

    await waitFor(() => {
      fireEvent.click(screen.getByText(btnText));
    });
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
