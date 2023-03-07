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
  const itemResponse = await fetch(
    `https://api.mercadolibre.com/items/${itemId}`
  );
  const itemDescription = await fetch(
    `https://api.mercadolibre.com/items/${itemId}/description`
  );
  if (!itemResponse.ok || !itemDescription.ok) {
    throw new Error("Error response");
  }
  const item = await itemResponse.json();
  const description = await itemDescription.json();
  item.description = description;
  const itemCategories = await fetch(
    `https://api.mercadolibre.com/categories/${item.category_id}`
  );
  if (!itemCategories) {
    throw new Error("Error response");
  }
  const categories = await itemCategories.json();
  item.categories = categories.path_from_root.map((p: any) => p.name);
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
