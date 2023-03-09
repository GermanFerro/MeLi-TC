import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentType } from "react";

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
