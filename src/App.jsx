import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "@pages/LoadingPage";
import NotFoundPage from "@pages/NotFoundPage";
import routes from "@routers"; // Đảm bảo rằng bạn đã tạo routes chính xác

const MainLayout = lazy(() => import("@layouts/MainLayout"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
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
