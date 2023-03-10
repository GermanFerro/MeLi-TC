import { Outlet, useRouteLoaderData } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { loader as listLoader } from "../ItemList/loader";
import { loader as pageLoader } from "../ItemPage/loader";
import "./ContentWrapper.scss";

const SearchResults = () => {
  //ToDo add types
  const listData = useRouteLoaderData("list") as Awaited<
    ReturnType<ReturnType<typeof listLoader>>
  >;
  const itemData = useRouteLoaderData("item") as Awaited<
    ReturnType<ReturnType<typeof pageLoader>>
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
