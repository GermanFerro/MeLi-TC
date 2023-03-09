import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import SearchBar from "./SearchBar";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("SearchBar", () => {
  it("renders initial conditions", () => {
    render(<SearchBar />, { wrapper: BrowserRouter });

    screen.getByRole("link");
    screen.getByRole("img");
    screen.getByRole("textbox");
    screen.getByRole("button");
  });

  it("triggers search when pressing enter or search button", () => {
    render(<SearchBar />, { wrapper: BrowserRouter });

    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    userEvent.type(input, "iPad");
    userEvent.type(input, "{enter}");
    expect(mockedNavigate).toHaveBeenCalledWith("/items?q=iPad");

    const button = screen.getByRole("button");
    userEvent.clear(input);
    userEvent.type(input, "iPhone");
    userEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledWith("/items?q=iPhone");

    expect(mockedNavigate).toHaveBeenCalledTimes(2);
  });

  it("redirects home when clicking MeLi icon", () => {
    render(<SearchBar />, { wrapper: BrowserRouter });

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(window.location.pathname).toBe("/");
  });
});
