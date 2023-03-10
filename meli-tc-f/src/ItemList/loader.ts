import { LoaderFunctionArgs } from "react-router-dom";
import { ItemList } from "../common/types";
import { fetchWrapper } from "../common/utils";

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

async function getItems(query: string) {
  const { items, categories } = await fetchWrapper(
    `http://localhost:8080/api/items?q=${query}`
  );
  return {
    items: mapItems(items),
    categories,
  };
}

export type getItemsType = typeof getItems;

export const getQuery = ({ request: { url } }: LoaderFunctionArgs) => {
  const _url = new URL(url);
  const searchTerm = _url.searchParams.get("q");
  return getQuerySettings(searchTerm || "");
};
