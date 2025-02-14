import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Breadcrumbs = ({ items }) => {
  const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1; // Kiểm tra nếu là phần tử cuối cùng

    return {
      key: item.label,
      title:
        item.path && !isLast ? (
          <Link to={item.path !== "/" ? `/${item.path}` : "/"}>
            <span className="text-base font-semibold">{item.label}</span>
          </Link>
        ) : (
          <span
            className={`text-base font-semibold ${
              isLast ? "text-red-600" : ""
            }`}
          >
            {item.label}
          </span>
        ),
    };
  });

  return (
    <div className="container mx-auto px-8 py-6">
      <Breadcrumb className="mb-2" items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
