import "./Breadcrumbs.scss";

const Breadcrumbs = ({ categories }: { categories: string[] }) => (
  <div className="Breadcrumb">
    {categories.map((c, index) => (
      <div key={`breadcrumb-${index}`} className="category">
        {c}
      </div>
    ))}
  </div>
);

export default Breadcrumbs;
