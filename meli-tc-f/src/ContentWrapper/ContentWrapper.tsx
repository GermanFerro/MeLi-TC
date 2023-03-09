import { Outlet, useRouteLoaderData } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./ContentWrapper.scss";

const SearchResults = () => {
  const listData = useRouteLoaderData("list") as any;
  const itemData = useRouteLoaderData("item") as any;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Breadcrumbs
            categories={listData?.categories || itemData?.categories}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ marginTop: 0 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
