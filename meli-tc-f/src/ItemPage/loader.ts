import { QueryClient } from "@tanstack/react-query";
import { ItemDetails, ItemDetailsNormal } from "../types";

const getQuery = (itemId: string) => ({
  queryKey: ["item", itemId],
  queryFn: async () => getItemDetails(itemId),
});

const mapItem = (item: ItemDetails) => ({
  id: item.id,
  price: item.price,
  title: item.title,
  pictures: item.pictures.map((p: any) => p.secure_url),
  soldQuantity: item.sold_quantity,
  condition: item.condition,
  description: item.description.plain_text,
  categories: item.categories,
});

async function getItemDetails(itemId: string) {
  const response = await fetch(`http://localhost:8080/api/items/${itemId}`);
  if (!response.ok) {
    throw new Error("Error response");
  }
  const item = await response.json();
  return mapItem(item);
}

export const loader =
  (queryClient: QueryClient) =>
  async ({ params: { id } }: any): Promise<ItemDetailsNormal> => {
    const query = getQuery(id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
