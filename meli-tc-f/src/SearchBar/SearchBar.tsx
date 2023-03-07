import { FormEvent, KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ml-hero-2.png";
import "./SearchBar.scss";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const _handleSearchItems = () => {
    navigate(`/items?q=${inputValue}`);
  };

  return (
    <div className="SearchBar">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/">
              <img className="Logo" src={logo} alt="mercado libre logo" />
            </Link>
            <input
              className="InputField"
              type="text"
              placeholder="Buscar productos, marcas y mas..."
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setInputValue(e.currentTarget.value)
              }
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
                e.code === "Enter" && _handleSearchItems()
              }
            />
            <button
              className="MagnifyingGlass"
              onClick={() => _handleSearchItems()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
