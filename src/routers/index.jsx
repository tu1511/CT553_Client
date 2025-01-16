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
import NewsCardDetail from "@components/NewsPage/NewsCardDetail";
import ViewedProductsPage from "@pages/ViewedProductsPage";
import SearchResultsPage from "@pages/SearchResultsPage";
import OrderPage from "@pages/OrderPage";
import ThankYouPage from "@pages/ThankYouPage";
import PolicyPage from "@pages/PolicyPage";

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
    id: "chitiettintuc",
    path: "/tin-tuc/:id",
    element: <NewsCardDetail />,
  },
  {
    id: "vechungtoi",
    path: "/ve-chung-toi",
    element: <AboutUsPage />,
  },
  {
    id: "dathang",
    path: "/dat-hang",
    element: <OrderPage />,
  },
  {
    id: "camon",
    path: "/cam-on",
    element: <ThankYouPage />,
  },
  {
    id: "vechungtoi",
    path: "/ve-chung-toi",
    element: <AboutUsPage />,
  },
  {
    id: "sanphamdaxem",
    path: "/san-pham-da-xem",
    element: <ViewedProductsPage />,
  },
  {
    id: "timkiem",
    path: "/tim-kiem",
    element: <SearchResultsPage />,
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
    id: "chinhsach",
    path: "/chinh-sach/:id",
    element: <PolicyPage />,
  },
  {
    id: "chitietsanpham",
    path: "/san-pham/:slug",
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
