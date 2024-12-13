import HomePage from "@pages/HomePage";
import ArticlePage from "@pages/ArticlePage";
import AboutUsPage from "@pages/AboutUsPage";
import ContactUsPage from "@pages/ContactUsPage";

const routes = [
  {
    id: "trangchu",
    path: "/",
    element: <HomePage />,
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
    id: "lienhe",
    path: "/lien-he",
    element: <ContactUsPage />,
  },
];

export default routes;
