import { QueryClient } from "@tanstack/react-query";
import { ItemList, ItemListNormal } from "../common/types";

const mapItems = (items: ItemList[]) =>
  items.map((i) => ({
    id: i.id,
    title: i.title,
    price: i.price,
    thumbnail: i.thumbnail,
    freeShipping: i.shipping.free_shipping,
    address: i.address.state_name,
  }));

const getQuerySettings = (query: string) => ({
  queryKey: ["items", query],
  queryFn: async () => getItems(query),
});

async function getItems(
  query: string
): Promise<{ items: ItemListNormal[]; categories: string[] }> {
  const response = await fetch(`http://localhost:8080/api/items?q=${query}`);
  if (!response.ok) {
    throw new Error("Error response");
  }
  const { items, categories } = await response.json();
  return {
    items: mapItems(items),
    categories,
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
