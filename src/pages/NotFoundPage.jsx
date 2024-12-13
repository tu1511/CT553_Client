import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center px-4">
        <p className="text-2xl font-medium text-teal-900 mt-2">
          Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <p className="text-lg text-teal-600 mt-2">
          Có thể bạn đã nhập sai địa chỉ, hoặc trang đã bị xóa.
        </p>
      </div>

      {/* Illustration */}
      <div className="mt-2">
        <img
          src="./src/assets/404-illustration.png" // Thay đường dẫn bằng hình ảnh minh họa phù hợp
          alt="404 Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>

      {/* Back to Home Button */}
      <div className="mt-2">
        <Link
          to="/"
          className="bg-teal-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition"
        >
          Quay Lại Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
