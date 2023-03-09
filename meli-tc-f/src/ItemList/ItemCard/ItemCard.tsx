import { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import deliveryTruck from "../../assets/delivery-truck.png";
import { ItemListNormal } from "../../common/types";
import { formatPrice } from "../../common/utils";
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

  const [integer] = formatPrice(price);

  return (
    <div
      className="ItemCard"
      tabIndex={0}
      onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
        e.code === "Enter" && goToItemPage()
      }
      onClick={goToItemPage}
    >
      <div className="col-3">
        <img className="thumbnail" src={thumbnail} alt="item thumbnail" />
      </div>
      <div className="col-9">
        <div className="ItemDetails">
          <div className="groupedAttributes">
            <div className="price">
              <h3 className="font-regular">{integer}</h3>
              {freeShipping && (
                <img className="deliveryTruck" src={deliveryTruck} alt="" />
              )}
            </div>
            <h4 className="title font-regular">{title}</h4>
          </div>
          <h6 className="font-light text-xs">{address}</h6>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
