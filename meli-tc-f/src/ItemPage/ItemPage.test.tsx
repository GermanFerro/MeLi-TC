import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import placeholder from "../assets/generic-placeholder.png";
import ItemPage from "./ItemPage";

const mockedItem = {
  price: 344.28,
  title: "La Gotita Pegamento - Mejor Precio",
  pictures: [placeholder],
  soldQuantity: 500,
  condition: "new",
  description: "Test description",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ItemPage />,
    loader: () => mockedItem,
  },
]);

const ItemPageWithRouter = () => <RouterProvider router={router} />;

describe("ItemPage", () => {
  it("renders initial conditions", () => {
    render(<ItemPageWithRouter />);

    screen.getByRole("img", { name: /product/i });
    screen.getByText(/nuevo - 500 vendidos/i);
    screen.getByText(/La Gotita Pegamento - Mejor Precio/i);
    screen.getByText("$ 344.28");
    screen.getByRole("button", { name: /comprar/i });
    screen.getByRole("heading", { name: /descripción del producto/i });
    screen.getByText(/test description/i);
  });
});
