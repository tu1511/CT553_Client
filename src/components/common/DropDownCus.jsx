import { Dropdown, Menu } from "antd";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DropdownCus = ({ menuItems, label }) => {
  // Hàm chuyển đổi menuItems sang định dạng mà Ant Design yêu cầu
  const formatMenuItems = (items) =>
    items.map((item) => ({
      key: item.key,
      label: item.link ? (
        <Link
          to={item.link}
          className="text-gray-700  font-semibold px-2 py-1 text-sm block"
        >
          {item.label}
        </Link>
      ) : (
        <button
          onClick={item.onClick}
          className="text-gray-800  font-semibold px-2 py-1 text-sm block"
        >
          {item.label}
        </button>
      ),
    }));

  const menu = <Menu items={formatMenuItems(menuItems)} />;

  return (
    <Dropdown overlay={menu} trigger={["hover"]} placement="bottomRight">
      <span className="flex items-center space-x-2 border-2 border-black rounded-lg py-2 px-4 text-sm font-bold text-gray-700 hover:text-gray-900 cursor-pointer">
        <CircleUser size={20} className="mr-1" />
        {label}
      </span>
    </Dropdown>
  );
};

export default DropdownCus;
