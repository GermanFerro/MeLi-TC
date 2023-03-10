import classNames from "classnames";
import "./Breadcrumbs.scss";

const Breadcrumbs = ({ categories }: { categories: string[] }) => {
  const breadcrumbClassnames = classNames([
    "Breadcrumb",
    { separator: categories.length === 0 },
  ]);

  return (
    <div className={breadcrumbClassnames}>
      {categories.map((c, index) => (
        <div key={`breadcrumb-${index}`} className="category">
          {c}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
