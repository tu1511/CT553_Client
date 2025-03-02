import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // Countdown timer starts at 10 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after countdown reaches 0
    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [countdown, navigate]);

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 px-8 py-10">
      {/* Main Container */}
      <div className="bg-white shadow-md rounded-lg p-8 md:p-12 max-w-3xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircleOutlined className="text-green-500 text-6xl" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Cảm ơn bạn đã đặt hàng!
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Đơn hàng của bạn đã được xác nhận và đang được xử lý. Chúng tôi sẽ
          liên hệ với bạn để cập nhật thông tin đơn hàng trong thời gian sớm
          nhất.
        </p>

        {/* Countdown Timer */}
        <p className="text-gray-600 mb-4">
          Bạn sẽ được chuyển về trang chủ sau{" "}
          <span className="text-primary font-semibold">{countdown}</span> giây.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-hover-primary transition-colors duration-300"
          >
            Quay lại Trang Chủ
          </Link>
          <Link
            to="/tai-khoan"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
          >
            Xem Đơn Hàng Của Tôi
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-600 text-sm">
        <p>
          Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua{" "}
          <a
            href="mailto:support@yourshop.com"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            support@yourshop.com
          </a>{" "}
          hoặc gọi đến số{" "}
          <a
            href="tel:+840123456789"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            0123 456 789
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default ThankYouPage;
