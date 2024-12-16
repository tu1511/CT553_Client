import HomePage from "@pages/HomePage";
import ArticlePage from "@pages/ArticlePage";
import AboutUsPage from "@pages/AboutUsPage";
import SignUpPage from "@pages/SignUpPage";
import LoginPage from "@pages/LoginPage";
import ProfilePage from "@pages/ProfilePage";

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
    id: "baiviet",
    path: "/bai-viet",
    element: <ArticlePage />,
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
];

export default routes;
