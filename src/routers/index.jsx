import HomePage from "@pages/HomePage";
import AboutUsPage from "@pages/AboutUsPage";
import SignUpPage from "@pages/SignUpPage";
import LoginPage from "@pages/LoginPage";
import ProfilePage from "@pages/ProfilePage";
import ProductDetail from "@pages/ProductDetail";
import CartPage from "@pages/CartPage";
import ProductPage from "@pages/ProductPage";
import NewsPage from "@pages/NewsPage";
import PromotionsPage from "@pages/PromotionsPage";

const routes = [
  {
    id: "trangchu",
    path: "/",
    element: <HomePage />,
  },
  {
    id: "dangky",
    path: "/dang-ky",
    element: <SignUpPage />,
  },
  {
    id: "dangnhap",
    path: "/dang-nhap",
    element: <LoginPage />,
  },
  {
    id: "tintuc",
    path: "/tin-tuc",
    element: <NewsPage />,
  },
  {
    id: "vechungtoi",
    path: "/ve-chung-toi",
    element: <AboutUsPage />,
  },
  {
    id: "taikhoan",
    path: "/tai-khoan",
    element: <ProfilePage />,
  },
  {
    id: "khuyenmai",
    path: "/khuyen-mai",
    element: <PromotionsPage />,
  },
  {
    id: "chitietsanpham",
    path: "/san-pham/1",
    element: <ProductDetail />,
  },
  {
    id: "sanpham",
    path: "/san-pham",
    element: <ProductPage />,
  },
  {
    id: "giohang",
    path: "gio-hang",
    element: <CartPage />,
  },
];

export default routes;
