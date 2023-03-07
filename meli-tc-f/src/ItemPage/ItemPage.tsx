import { useLoaderData } from "react-router-dom";
import placeholder from "../assets/generic-placeholder.png";
import "./ItemPage.scss";
import { loader } from "./loader";

const ProductPage = () => {
  const { price, title, pictures, soldQuantity, condition, description } =
    useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <div className="ProductPage">
      <div className="firstRow">
        <div className="imageContainer">
          <img
            className="productImage"
            src={pictures[0] ?? placeholder}
            alt="product"
          />
        </div>
        <div className="ProductDetails left">
          <h6 className="no-margin font-regular">
            {condition === "new" ? "Nuevo" : "Usado"} - {soldQuantity} vendidos
          </h6>
          <h3 className="name">{title}</h3>
          <h1 className="price font-regular">
            $ {price}
            <span>00</span>
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

export default ProductPage;
