import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@components/common/Navbar";
import { Camera, Mic, Search, ShoppingBag, ShoppingCart } from "lucide-react";
// import DropdownMenu from "@components/common/DropdownMenu";
import ImageSearchModal from "@components/HomePage/ImageSearchModal";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@redux/slices/authSlice";
import { getLoggedInUser } from "@redux/thunk/accountThunk";
import DropdownCus from "@components/common/DropDownCus";
import { getCart } from "@redux/thunk/cartThunk";
import productService from "@services/product.service";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();

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
    setSearchInput(transcript);

    if (!listening && transcript.trim()) {
      const delay = setTimeout(() => {
        handleSearch();
      }, 500); // Đợi 500ms rồi mới tìm kiếm

      return () => clearTimeout(delay); // Xóa timeout nếu có update mới
    }
  }, [transcript, listening]);

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
  const user = useSelector((state) => state.account.account);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && accessToken) {
      dispatch(setCredentials({ accessToken, refreshToken }));
    }
  }, [dispatch, accessToken]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));

      dispatch(getCart()).then((response) => {
        if (response.payload) {
          setCartItems(response.payload.cart);
          setTotalPrice(response.payload.totalPrice);
        }
      });
    }
  }, [accessToken, dispatch]);

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("viewedProducts");

    // Chuyển hướng về trang chủ
    window.location.href = "/";
  };

  // const cart = useSelector((state) => state.cart.cart);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalProducts = Array.isArray(cart) ? cart.length : 0;

  // console.log(totalProducts);
  // const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // console.log(totalQuantity);

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

  // search product
  const handleSearch = async () => {
    if (!searchInput.trim()) {
      toast.warn("Vui lòng nhập từ khóa tìm kiếm!", { autoClose: 2000 });
      return;
    }

    navigate(`/tim-kiem?tu-khoa=${encodeURIComponent(searchInput)}`);
    setSearchInput("");
  };

  const accountMenuItems = user
    ? [
        {
          label: "Thông tin tài khoản",
          key: "thong-tin-tai-khoan",
          link: "/tai-khoan",
        },
        {
          label: "Đăng xuất",
          key: "dang-xuat",
          onClick: handleLogout, // Gắn sự kiện đăng xuất
        },
      ]
    : [
        {
          label: "Đăng ký tài khoản",
          key: "dang-ky",
          link: "/dang-ky",
        },
        {
          label: "Đăng nhập",
          key: "dang-nhap",
          link: "/dang-nhap",
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button className="absolute top-1/2 right-5 -translate-y-1/2 p-2">
                <Search
                  size={20}
                  className="text-gray-600"
                  onClick={handleSearch}
                />
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
            <DropdownCus
              menuItems={accountMenuItems}
              label={user ? `Xin chào, ${user.fullName}` : "Tài khoản"}
              // icon={<CircleUser size={20} />}
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
                  {totalProducts}
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
