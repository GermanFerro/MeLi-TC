import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentType } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const withQueryProvider = (Component: ComponentType) => (props: any) =>
  (
    <QueryClientProvider client={new QueryClient()}>
      <Component {...props} />
    </QueryClientProvider>
  );

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
    .format(price)
    .split(",");

export const withBrowserRouterMock = (
  dataMock: any,
  Element: ComponentType
) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Element />,
      loader: () => dataMock,
    },
  ]);

  return () => <RouterProvider router={router} />;
};
