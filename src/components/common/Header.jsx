import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@components/common/Navbar";
import {
  Camera,
  CircleUser,
  Mic,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import DropdownMenu from "@components/common/DropdownMenu";
import ImageSearchModal from "@components/HomePage/ImageSearchModal";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "@redux/thunk/authThunk";
import { setCredentials } from "@redux/slices/authSlice";

const Header = () => {
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
    }
  }, []);

  useEffect(() => {
    setSearchInput(transcript); // Update search input as user speaks
  }, [transcript]);

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "vi-VN", // Set language to Vietnamese
      });
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authUser);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && accessToken) {
      dispatch(setCredentials({ accessToken, refreshToken }));
    }

    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch]);

  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.reload();
  };

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

  const accountMenuItems = user
    ? [
        {
          label: (
            <Link
              to="/tai-khoan"
              className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
            >
              Thông tin tài khoản
            </Link>
          ),
          key: "thong-tin-tai-khoan",
        },
        {
          label: (
            <Link
              onClick={() => handleLogout()}
              className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
            >
              Đăng xuất
            </Link>
          ),
          key: "dang-xuat",
        },
      ]
    : [
        {
          label: (
            <Link
              to="/dang-ky"
              className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
            >
              Đăng ký tài khoản
            </Link>
          ),
          key: "dang-ky",
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
          key: "dang-nhap",
        },
      ];

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

      <header className="border-b-1 border-primary bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-14 w-auto"
            />
            <span className="font-bold text-2xl text-gray-800">
              Silver Charm
            </span>
          </Link>

          <div className="flex-grow flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-36 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="absolute top-1/2 right-5 -translate-y-1/2 p-2">
                <Search size={20} className="text-gray-600" />
              </button>
              <button
                className="absolute top-1/2 right-14 -translate-y-1/2 p-2"
                onClick={() => setIsModalVisible(true)}
              >
                <Camera size={20} className="text-gray-600" />
              </button>
              <button className="absolute top-1/2 right-24 -translate-y-1/2 p-2">
                <Mic
                  size={20}
                  className={` ${listening ? "text-red-500" : "text-gray-600"}`}
                  onClick={handleMicClick}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <DropdownMenu
              menuItems={accountMenuItems}
              label={user ? `Xin chào, ${user.fullName}` : "Tài khoản"}
              icon={<CircleUser size={20} />}
            />

            <Link
              to="/san-pham-da-xem"
              className="flex items-center space-x-1 border-2 border-black rounded-lg py-2 px-4 text-sm text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag size={20} />
              <span className="hidden md:inline font-bold">
                Sản phẩm đã xem
              </span>
            </Link>
            <Link to="/gio-hang">
              <button className="relative text-sm text-gray-700 hover:text-gray-900">
                <ShoppingCart size={30} />
                <span className="absolute -top-2 -right-2 bg-primary text-xs rounded-full px-2 py-1 text-white">
                  0
                </span>
              </button>
            </Link>
          </div>
        </div>

        <Navbar />
      </header>
      <ImageSearchModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Header;
