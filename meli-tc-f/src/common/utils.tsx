import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentType } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

export const fetchWrapper = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request error");
  }
  return await response.json();
};

export const withQueryProvider = (Component: ComponentType) => (props: any) =>
  (
    <QueryClientProvider client={new QueryClient()}>
      <Component {...props} />
    </QueryClientProvider>
  );

// $ 200.000,99
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
    .format(price)
    .split(",");

export const withRouterDataMock = (dataMock: any, Element: ComponentType) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Element />,
      loader: () => dataMock,
    },
  ]);

  return () => <RouterProvider router={router} />;
};

export const withRouterMock = (routes: RouteObject[]) => {
  const router = createBrowserRouter(routes);

  return () => <RouterProvider router={router} />;
};
