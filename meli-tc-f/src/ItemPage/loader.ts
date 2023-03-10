import { LoaderFunctionArgs } from "react-router-dom";
import { ItemDetails } from "../common/types";
import { fetchWrapper } from "../common/utils";

const getQuerySettings = (itemId: string) => ({
  queryKey: ["item", itemId],
  queryFn: async () => getItem(itemId),
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

async function getItem(itemId: string) {
  const item = await fetchWrapper(`http://localhost:8080/api/items/${itemId}`);
  return mapItem(item);
}

export type getItemType = typeof getItem;

export const getQuery = ({ params: { id } }: LoaderFunctionArgs) =>
  getQuerySettings(id ?? "");
