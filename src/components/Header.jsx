import Navbar from "@components/Navbar";
import { Camera, Mic, Search, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  // Mảng thông tin cần hiển thị
  const messages = useMemo(
    () => [
      "Đổi trả hàng trong vòng 7 ngày",
      "Mang Đến Cho Bạn Sản Phẩm Và Dịch Vụ Cao Cấp",
      "Miễn Phí Vận Chuyển Trên Toàn Quốc",
      "Đặt Hàng Online Hoặc Gọi +84 845 969 757",
    ],
    []
  );

  // Sử dụng useState để theo dõi thông điệp đang hiển thị
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [isFading, setIsFading] = useState(false);

  // Tự động chuyển đổi thông điệp sau mỗi 5 giây
  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      setIsFading(true); // Bắt đầu hiệu ứng mờ dần
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]);
        setIsFading(false); // Kết thúc hiệu ứng mờ dần
      }, 500); // Thời gian mờ dần (500ms)
    }, 5000); // Đổi sau mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, [messages]);

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
      <header className="border-b border-border bg-white shadow-lg sticky top-0 z-50">
        {/* Top Header */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-14 w-auto"
            />
            <span className="font-bold text-2xl text-gray-800 ">
              Silver Charm
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full max-w-xl">
              {/* Input Search */}
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-36 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />

              {/* Search Icon */}
              <button className="absolute top-1/2 right-5 -translate-y-1/2 p-2">
                <Search size={20} className="text-gray-600" />
              </button>

              {/* Camera Icon */}
              <button className="absolute top-1/2 right-14 -translate-y-1/2 p-2 ">
                <Camera size={20} className="text-gray-600" />
              </button>

              {/* Mic Icon */}
              <button className="absolute top-1/2 right-24 -translate-y-1/2 p-2 ">
                <Mic size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <button className="flex items-center border-2 border-black rounded-lg py-2 px-4  text-sm text-gray-700 hover:text-gray-900">
              <span className="hidden md:inline font-bold">Tài khoản</span>
            </button>
            <button className="flex items-center border-2 border-black rounded-lg py-2 px-4  text-sm text-gray-700 hover:text-gray-900">
              <span className="hidden md:inline  font-bold">
                Sản phẩm đã xem
              </span>
            </button>
            <button className="relative text-sm text-gray-700 hover:text-gray-900">
              <ShoppingBag size={30} />
              <span className="absolute -top-2 -right-2 bg-border text-xs rounded-full px-2 py-1 text-white">
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
