import { QueryClient } from "@tanstack/react-query";
import { ItemList, ItemListNormal } from "../types";

const mapItems = (items: ItemList[]) =>
  items.map((i) => ({
    id: i.id,
    title: i.title,
    price: i.price,
    thumbnail: i.thumbnail,
    freeShipping: i.free_shipping,
    address: i.address.state_name,
  }));

const getQuerySettings = (query: string) => ({
  queryKey: ["items", query],
  queryFn: async () => getItems(query),
});

async function getItems(
  query: string
): Promise<{ items: ItemListNormal[]; categories: string[] }> {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Error response");
  }
  const { results, filters } = await response.json();
  const categories = filters[0]?.values[0]?.path_from_root;
  return {
    items: mapItems(results.slice(0, 4)),
    categories: categories ? categories.map((c: any) => c.name) : [],
  };
}

export const loader =
  (queryClient: QueryClient) =>
  async ({
    request,
  }: any): Promise<{ items: ItemListNormal[]; categories: string[] }> => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q");
    const query = getQuerySettings(searchTerm || "");
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
