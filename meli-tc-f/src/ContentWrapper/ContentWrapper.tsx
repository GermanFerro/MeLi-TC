import { Outlet, useRouteLoaderData } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { getItemsType } from "../ItemList/loader";
import { getItemType } from "../ItemPage/loader";
import "./ContentWrapper.scss";

const SearchResults = () => {
  const listData = useRouteLoaderData("list") as Awaited<
    ReturnType<getItemsType>
  >;
  const itemData = useRouteLoaderData("item") as Awaited<
    ReturnType<getItemType>
  >;

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
