import { KeyboardEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ml-hero-2.png";
import "./SearchBar.scss";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const _handleSearchItems = () => {
    inputRef.current && navigate(`/items?q=${inputRef.current.value}`);
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
              ref={inputRef}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
                e.code === "Enter" && _handleSearchItems()
              }
            />
            <button className="MagnifyingGlass" onClick={_handleSearchItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
