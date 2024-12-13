import Navbar from "@components/Navbar";
import {
  Camera,
  CircleUser,
  Mic,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  const categories = [
    { name: "Vòng - Lắc", link: "/vong-lac" },
    { name: "Nhẫn", link: "/nhan" },
    { name: "Dây Chuyền", link: "/day-chuyen" },
    { name: "Bông Tai", link: "/bong-tai" },
    { name: "Khuyên Xỏ", link: "/khuyen-xo" },
    { name: "Trang Sức Bộ", link: "/trang-suc-bo" },
    { name: "Phong Thủy", link: "/phong-thuy" },
    { name: "Quà Tặng", link: "/qua-tang" },
    { name: "Phụ Kiện", link: "/phu-kien" },
    { name: "Sản Phẩm Mới", link: "/san-pham-moi" },
  ];

  const messages = useMemo(
    () => [
      "Đổi trả hàng trong vòng 7 ngày",
      "Mang Đến Cho Bạn Sản Phẩm Và Dịch Vụ Cao Cấp",
      "Miễn Phí Vận Chuyển Trên Toàn Quốc",
      "Đặt Hàng Online Hoặc Gọi +84 845 969 757",
    ],
    []
  );

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]);
        setIsFading(false);
      }, 500); // Fade duration
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages]);

  const menuItems = [
    {
      label: (
        <Link
          to="/dang-ky"
          className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
        >
          Đăng ký tài khoản
        </Link>
      ),
      key: "register",
    },
    {
      label: (
        <Link
          to="/dang-nhap"
          className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
        >
          Đăng nhập
        </Link>
      ),
      key: "login",
    },
  ];

  const menu = <Menu items={menuItems} />;

  return (
    <>
      <div className="w-full bg-secondary py-2 flex justify-center items-center">
        <span
          className={`text-gray-700 text-sm font-medium transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentMessage}
        </span>
      </div>

      <header className="primary-b primary-primary bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-14 w-auto"
            />
            <span className="font-bold text-2xl text-gray-800">
              Silver Charm
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-full primary primary-gray-300 py-2 pl-4 pr-36 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="absolute top-1/2 right-5 -translate-y-1/2 p-2">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="absolute top-1/2 right-14 -translate-y-1/2 p-2">
                <Camera size={20} className="text-gray-600" />
              </button>
              <button className="absolute top-1/2 right-24 -translate-y-1/2 p-2">
                <Mic size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Account, Cart, and Product View */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Dropdown overlay={menu}>
              <button className="ant-dropdown-link flex items-center space-x-1 primary-2 primary-black rounded-lg py-2 px-4 text-sm text-gray-700 hover:text-gray-900">
                <CircleUser size={20} />
                <span className="hidden md:inline font-bold">Tài khoản</span>
              </button>
            </Dropdown>
            <button className="flex items-center space-x-1 primary-2 primary-black rounded-lg py-2 px-4 text-sm text-gray-700 hover:text-gray-900">
              <ShoppingBag size={20} />
              <span className="hidden md:inline font-bold">
                Sản phẩm đã xem
              </span>
            </button>
            <button className="relative text-sm text-gray-700 hover:text-gray-900">
              <ShoppingCart size={30} />
              <span className="absolute -top-2 -right-2 bg-primary text-xs rounded-full px-2 py-1 text-white">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Navbar */}
        <Navbar categories={categories} />
      </header>
    </>
  );
};

export default Header;
