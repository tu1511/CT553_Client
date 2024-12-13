import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-900 mt-2">
          Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <p className="text-lg text-primary mt-2">
          Có thể bạn đã nhập sai địa chỉ, hoặc trang đã bị xóa.
        </p>
      </div>

      {/* Illustration */}
      <div className="mt-8 max-w-xs mx-auto">
        <img
          src="./src/assets/404-illustration.png" // Đảm bảo sử dụng đúng đường dẫn
          alt="404 Illustration"
          className="w-full h-auto"
        />
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <Link
          to="/"
          className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Quay Lại Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
