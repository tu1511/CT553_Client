import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="container mx-auto px-8 py-6">
      <Breadcrumb className="mb-4">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.path ? (
              <Link to={item.path}>
                <span className="text-base font-semibold">{item.label}</span>
              </Link>
            ) : (
              <>
                <span>{item.label}</span>
              </>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
