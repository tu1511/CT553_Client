import { Dropdown, Menu } from "antd";

// eslint-disable-next-line react/prop-types
const DropdownMenu = ({ menuItems, label, icon }) => {
  const menu = <Menu items={menuItems} />;

  return (
    <Dropdown overlay={menu}>
      <button className="ant-dropdown-link flex items-center space-x-1 py-2 px-4 text-sm text-gray-700 hover:text-gray-900">
        {icon && icon}
        <span className="hidden md:inline px-4 py-2 text-sm uppercase font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-full transition-all duration-200">
          {label}
        </span>
      </button>
    </Dropdown>
  );
};

export default DropdownMenu;
