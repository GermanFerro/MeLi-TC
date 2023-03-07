import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentType } from "react";

export const withQueryProvider = (Component: ComponentType) => (props: any) =>
  (
    <QueryClientProvider client={new QueryClient()}>
      <Component {...props} />
    </QueryClientProvider>
  );
