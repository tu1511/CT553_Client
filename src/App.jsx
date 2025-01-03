import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "@pages/LoadingPage";
import NotFoundPage from "@pages/NotFoundPage";
import routes from "@routers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "@helpers/ScrollToTop";
import "regenerator-runtime/runtime";

const MainLayout = lazy(() => import("@layouts/MainLayout"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
        <ScrollToTop />
        <Routes>
          {routes.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<MainLayout>{element}</MainLayout>}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
