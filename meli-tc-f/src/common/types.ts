type ItemBase = {
  id: string;
  title: string;
  price: number;
};

export type ItemList = ItemBase & {
  thumbnail: string;
  shipping: { free_shipping: boolean };
  address: { state_name: string };
};

export type ItemDetails = ItemBase & {
  condition: "new" | "used";
  sold_quantity: number;
  pictures: any[];
  description: { plain_text: string };
  categories: string[];
};

export type ItemListNormal = ItemBase & {
  thumbnail: string;
  freeShipping: boolean;
  address: string;
};

export type ItemDetailsNormal = ItemBase & {
  condition: "new" | "used";
  soldQuantity: number;
  pictures: string[];
  description: string;
  categories: string[];
};
