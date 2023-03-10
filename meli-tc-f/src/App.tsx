import classNames from "classnames";
import { Outlet, useNavigation } from "react-router-dom";
import { withQueryProvider } from "./common/utils";
import SearchBar from "./SearchBar/SearchBar";

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
