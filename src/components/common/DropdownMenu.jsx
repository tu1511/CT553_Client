import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

// eslint-disable-next-line react/prop-types
const DropdownMenu = ({ menuItems, label }) => {
  const formatMenuItems = (items) =>
    items.map((item) => ({
      label: (
        <Link
          to={item.link} // Dẫn người dùng tới link khi chọn mục menu
          className="text-gray-700 hover:text-primary font-semibold px-2 py-1 text-sm block"
        >
          {item.label}
        </Link>
      ),
      key: item.key,
      ...(item.children ? { children: formatMenuItems(item.children) } : {}),
    }));

  const formattedMenuItems = formatMenuItems(menuItems);

  const menu = (
    <Menu items={formattedMenuItems} className="rounded-lg shadow-lg" />
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <div className="flex items-center space-x-1 py-1 px-2 text-sm text-gray-700 hover:text-gray-900">
        <span className="hidden md:inline px-4 py-2 text-sm uppercase font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-full transition-all duration-200">
          {label}
        </span>
      </div>
    </Dropdown>
  );
};

export default DropdownMenu;
