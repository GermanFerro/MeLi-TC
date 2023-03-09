import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../404";
import App from "../App";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import ItemList from "../ItemList/ItemList";
import { loader as getItems } from "../ItemList/loader";
import ItemPage from "../ItemPage/ItemPage";
import { loader as getItemDetails } from "../ItemPage/loader";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "items",
        element: <ContentWrapper />,
        children: [
          {
            index: true,
            element: <ItemList />,
            loader: getItems(queryClient),
            id: "list",
          },
          {
            path: "/items/:id",
            element: <ItemPage />,
            loader: getItemDetails(queryClient),
            id: "item",
          },
        ],
      },
    ],
  },
]);
