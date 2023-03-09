import classNames from "classnames";
import { Outlet, useNavigation } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { withQueryProvider } from "./utils";

function App() {
  const navigation = useNavigation();
  const wrapperClassnames = classNames([
    "ContentWrapper",
    { loading: navigation.state === "loading" },
  ]);

  return (
    <div className="App">
      <SearchBar />
      <div className={wrapperClassnames}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default withQueryProvider(App);
