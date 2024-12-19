import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Breadcrumbs = ({ items }) => {
  const breadcrumbItems = items.map((item) => ({
    key: item.label,
    title: item.path ? (
      <Link to={item.path}>
        <span className="text-base font-semibold">{item.label}</span>
      </Link>
    ) : (
      <>
        <span>{item.label}</span>
      </>
    ),
  }));

  return (
    <div className="container mx-auto px-8 py-6">
      <Breadcrumb className="mb-4" items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
