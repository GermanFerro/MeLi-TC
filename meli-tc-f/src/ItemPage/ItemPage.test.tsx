import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { withBrowserRouterMock } from "../common/utils";
import { mockedItem } from "./constants";
import ItemPage from "./ItemPage";

const ItemPageWithRouter = withBrowserRouterMock(mockedItem, ItemPage);

describe("ItemPage", () => {
  it("renders initial conditions", () => {
    render(<ItemPageWithRouter />);

    screen.getByRole("img", { name: /product/i });
    screen.getByText(/nuevo - 500 vendidos/i);
    screen.getByText(/La Gotita Pegamento - Mejor Precio/i);
    screen.getByText("$ 344");
    screen.getByText("28");
    screen.getByRole("button", { name: /comprar/i });
    screen.getByRole("heading", { name: /descripción del producto/i });
    screen.getByText(/test description/i);
  });
});
