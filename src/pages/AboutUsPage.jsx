import React from "react";

function AboutUsPage() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Về Quỹ Từ Thiện "Nấu Ăn Cho Em"
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
          Quỹ "Nấu Ăn Cho Em" được thành lập với sứ mệnh giúp đỡ các trẻ em
          nghèo tại miền núi, cung cấp bữa ăn đầy đủ dinh dưỡng để các em có thể
          phát triển khỏe mạnh, vui chơi và học tập. Chúng tôi mong muốn mang
          lại một tương lai sáng hơn cho những đứa trẻ đang thiếu thốn.
        </p>

        {/* Lý do chúng tôi bắt đầu */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Tại Sao Chúng Tôi Bắt Đầu?
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Trẻ em miền núi phải đối mặt với nhiều khó khăn trong cuộc sống, từ
            điều kiện sinh hoạt không đầy đủ đến việc thiếu dinh dưỡng hàng
            ngày. Quỹ "Nấu Ăn Cho Em" ra đời với hy vọng có thể cải thiện bữa ăn
            và chăm sóc sức khỏe cho các em, giúp các em có cơ hội phát triển
            tốt nhất.
          </p>
        </section>

        {/* Mục tiêu của chúng tôi */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Mục Tiêu Của Chúng Tôi
          </h3>
          <ul className="list-inside space-y-4 text-lg text-gray-600 max-w-4xl mx-auto">
            <li className="flex items-center">
              <span className="text-blue-500 font-bold">✅</span> Đảm bảo các
              trẻ em miền núi được ăn đủ chất dinh dưỡng mỗi ngày.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 font-bold">✅</span> Tạo điều kiện
              cho các em có một môi trường học tập tốt và phát triển toàn diện.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 font-bold">✅</span> Khuyến khích
              cộng đồng chung tay vào công tác từ thiện để giúp đỡ những em nhỏ
              gặp khó khăn.
            </li>
          </ul>
        </section>

        {/* Cách chúng tôi làm */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Cách Chúng Tôi Làm
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Chúng tôi tổ chức các bữa ăn miễn phí cho trẻ em tại các khu vực
            miền núi khó khăn. Các tình nguyện viên của chúng tôi nấu ăn tại các
            điểm trường hoặc nhà trẻ, đảm bảo thực phẩm luôn tươi ngon và đầy đủ
            dưỡng chất. Chúng tôi cũng phối hợp với các tổ chức từ thiện khác để
            tối ưu hóa hiệu quả công tác từ thiện.
          </p>
        </section>

        {/* Hình ảnh về hoạt động */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Hình Ảnh Hoạt Động
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: "url('/path/to/your/image1.jpg')" }}
            ></div>
            <div
              className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: "url('/path/to/your/image2.jpg')" }}
            ></div>
            <div
              className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: "url('/path/to/your/image3.jpg')" }}
            ></div>
          </div>
        </section>

        {/* Kêu gọi hành động */}
        <section>
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Hãy Cùng Chung Tay
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Chúng tôi luôn cần sự hỗ trợ từ cộng đồng để tiếp tục công tác giúp
            đỡ các em nhỏ tại miền núi. Hãy tham gia và đóng góp cho quỹ từ
            thiện của chúng tôi để những đứa trẻ này có một tương lai tươi sáng
            hơn.
          </p>
          <a
            href="#donate"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Tham gia ngay
          </a>
        </section>
      </div>
    </div>
  );
}

export default AboutUsPage;
