import { Outlet, useNavigation, useRouteLoaderData } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./ContentWrapper.scss";

const LoadingState = () => (
  <div className="LoadingState">
    <h1>Cargando</h1>
  </div>
);

const SearchResults = () => {
  const listData = useRouteLoaderData("list") as any;
  const itemData = useRouteLoaderData("item") as any;

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <div className="row">
        <div className="col-12">
          {!isLoading && (
            <Breadcrumbs
              categories={listData?.categories || itemData?.categories}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ marginTop: 0 }}>
          {isLoading ? <LoadingState /> : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
