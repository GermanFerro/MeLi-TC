import { useLoaderData } from "react-router-dom";
import placeholder from "../assets/generic-placeholder.png";
import { formatPrice } from "../common/utils";
import "./ItemPage.scss";
import { loader } from "./loader";

const ItemPage = () => {
  const { price, title, pictures, soldQuantity, condition, description } =
    useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  const [integer, decimals] = formatPrice(price);

  return (
    <div className="ItemPage">
      <div className="firstRow">
        <div className="imageContainer">
          <img
            className="productImage"
            src={pictures[0] ?? placeholder}
            alt="product"
          />
        </div>
        <div className="ProductDetails left">
          <span className="text-sm">
            {condition === "new" ? "Nuevo" : "Usado"} - {soldQuantity} vendidos
          </span>
          <span className="name text-md">{title}</span>
          <h1 className="price font-regular">
            {integer}
            <span>{decimals}</span>
          </h1>
          <button className="buyBtn">Comprar</button>
        </div>
      </div>
      <div className="ProductDescription left">
        <h3 className="title">Descripción del producto</h3>
        <p className="description no-margin">
          {description || "El vendedor no incluyó una descripción del producto"}
        </p>
      </div>
    </div>
  );
};

export default ItemPage;
