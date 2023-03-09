import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { mockedItemList } from "../ItemList/constants";
import ItemList from "../ItemList/ItemList";
import ItemPage from "../ItemPage/ItemPage";
import ContentWrapper from "./ContentWrapper";

const mockedItem = {
  price: 344.28,
  title: "La Gotita Pegamento - Mejor Precio",
  pictures: [""],
  soldQuantity: 500,
  condition: "new",
  description: "Test description",
  categories: ["cat3", "cat4"],
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => mockedItem,
    children: [
      {
        path: "items",
        element: <ContentWrapper />,
        children: [
          {
            index: true,
            element: <ItemList />,
            loader: () => mockedItemList,
            id: "list",
          },
          {
            path: "/items/:id",
            element: <ItemPage />,
            loader: () => mockedItem,
            id: "item",
          },
        ],
      },
    ],
  },
]);

const ContentWrapperWithRouter = () => <RouterProvider router={router} />;

describe("ContentWrapper", () => {
  it("renders breadcrumbs with child data", async () => {
    render(<ContentWrapperWithRouter />);

    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    userEvent.type(input, "something");
    fireEvent.click(screen.getByRole("button"));

    await screen.findByText("cat1");
    await screen.findByText("cat2");

    const firstItem = screen.getAllByTestId("ItemCard")[0];
    fireEvent.click(firstItem);

    await screen.findByText("cat3");
    await screen.findByText("cat4");
  });
});
