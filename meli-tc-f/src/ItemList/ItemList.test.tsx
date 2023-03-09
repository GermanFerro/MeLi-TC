import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withBrowserRouterMock } from "../common/utils";
import { mockedItemList } from "./constants";
import ItemList from "./ItemList";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const ItemListWithRouter = withBrowserRouterMock(mockedItemList, ItemList);

describe("ItemList", () => {
  it("renders initial conditions", () => {
    render(<ItemListWithRouter />);

    expect(
      screen.getAllByRole("img", { name: /item thumbnail/i })
    ).toHaveLength(4);
    expect(screen.getAllByText(/test item title/i)).toHaveLength(4);
    expect(screen.getAllByText(/capital federal/i)).toHaveLength(4);
    screen.getByRole("img", { name: /free shipping/i });
  });

  it("redirects to ItemPage when clicking an ItemCard", () => {
    render(<ItemListWithRouter />);

    const firstItem = screen.getAllByTestId("ItemCard")[0];
    userEvent.click(firstItem);

    expect(mockedNavigate).toHaveBeenCalledWith("/items/MLA932853745");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
