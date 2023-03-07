import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { withQueryProvider } from "./utils";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <div className="ContentWrapper">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default withQueryProvider(App);
