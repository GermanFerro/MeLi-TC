import { useNavigate } from "react-router-dom";
import deliveryTruck from "../../assets/delivery-truck.png";
import { ItemListNormal } from "../../types";
import "./ItemCard.scss";

const ItemCard = ({
  id,
  price,
  address,
  title,
  thumbnail,
  freeShipping,
}: ItemListNormal) => {
  const navigate = useNavigate();

  const goToItemPage = () => navigate(`/items/${id}`);

  return (
    <div className="ItemCard">
      <div className="col-3">
        <img
          className="thumbnail"
          src={thumbnail}
          alt="item thumbnail"
          onClick={goToItemPage}
        />
      </div>
      <div className="col-9">
        <div className="ItemDetails">
          <div className="groupedAttributes">
            <div className="price" onClick={goToItemPage}>
              <h3 className="font-regular">$ {price}</h3>
              {freeShipping && (
                <img className="deliveryTruck" src={deliveryTruck} alt="" />
              )}
            </div>
            <h4 className="title font-regular" onClick={goToItemPage}>
              {title}
            </h4>
          </div>
          <h6 className="font-light text-xs">{address}</h6>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
