import App from "../App";
import { mockedItemList } from "../ItemList/constants";
import ItemList from "../ItemList/ItemList";
import { mockedItem } from "../ItemPage/constants";
import ItemPage from "../ItemPage/ItemPage";
import ContentWrapper from "./ContentWrapper";

export const routes = [
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
];
