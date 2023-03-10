import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";
import ErrorPage from "../404";
import App from "../App";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import ItemList from "../ItemList/ItemList";
import { getQuery as getItemListQuery } from "../ItemList/loader";
import ItemPage from "../ItemPage/ItemPage";
import { getQuery as getItemPageQuery } from "../ItemPage/loader";

const queryClient = new QueryClient();

/**
 * This function takes a query client and function to get the query settings
 * and returns either the cached data (if there is any) or triggers a new
 * search and returns the response
 * @param queryClient the react-query client shared between routes
 * @param getQuery function to get query settings
 * @returns loader data
 */
const defaultLoader =
  (
    queryClient: QueryClient,
    getQuery: (args: LoaderFunctionArgs) => {
      queryKey: string[];
      queryFn: Awaited<Promise<any>>;
    }
  ) =>
  async (args: LoaderFunctionArgs) => {
    const query = getQuery(args);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

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
            loader: defaultLoader(queryClient, getItemListQuery),
            id: "list",
          },
          {
            path: "/items/:id",
            element: <ItemPage />,
            loader: defaultLoader(queryClient, getItemPageQuery),
            id: "item",
          },
        ],
      },
    ],
  },
]);
