import { useLoaderData } from "react-router-dom";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemList.scss";
import { loader } from "./loader";

const ItemList = () => {
  const { items } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <>
      {items.length > 0 && (
        <div className="ItemList">
          <ul className="no-padding no-margin">
            {items.map((i, index) =>
              index < 4 ? (
                <li key={`item-${i.id}`}>
                  <ItemCard
                    id={i.id}
                    price={i.price}
                    address={i.address}
                    title={i.title}
                    thumbnail={i.thumbnail}
                    freeShipping={i.freeShipping}
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default ItemList;
