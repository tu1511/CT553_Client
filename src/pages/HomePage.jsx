import React from "react";

function HomePage() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-200">
      {/* Hero section */}
      <section
        className="hero min-h-screen bg-cover bg-center relative flex items-center justify-center"
        // style={{ backgroundImage: "url('./src/assets/bg.png')" }}
      >
        <div className="hero-overlay bg-black bg-opacity-60 absolute w-full h-full top-0 left-0"></div>
        <div className="text-center text-white relative z-10 px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
            Trồng cây cho em
          </h1>
          <p className="text-2xl md:text-3xl font-medium mb-8 drop-shadow-lg">
            Chung tay ươm mầm tương lai xanh
          </p>
          <button className="btn btn-primary py-4 px-8 text-lg rounded-lg shadow-xl hover:bg-green-600 transition ease-in-out duration-300 transform hover:scale-105">
            Tham gia ngay
          </button>
        </div>
      </section>

      {/* About section */}
      <section className="about py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Về chúng tôi
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi là một tổ chức không lợi nhuận, cam kết góp phần vào bảo
            vệ môi trường thông qua các hoạt động trồng cây và bảo vệ thiên
            nhiên. Cùng nhau, chúng ta có thể tạo ra một thế giới xanh hơn cho
            các thế hệ tương lai.
          </p>
        </div>
      </section>

      {/* Services section */}
      <section className="services py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="service-card bg-white shadow-2xl rounded-lg p-6 transform hover:scale-105 transition-all ease-in-out duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Trồng cây xanh
              </h3>
              <p className="text-gray-600">
                Dịch vụ trồng cây xanh tại các khu vực công cộng và tư nhân,
                mang lại không gian sống xanh hơn.
              </p>
            </div>
            <div className="service-card bg-white shadow-2xl rounded-lg p-6 transform hover:scale-105 transition-all ease-in-out duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tư vấn môi trường
              </h3>
              <p className="text-gray-600">
                Cung cấp dịch vụ tư vấn về các giải pháp bảo vệ môi trường và
                xây dựng các dự án xanh.
              </p>
            </div>
            <div className="service-card bg-white shadow-2xl rounded-lg p-6 transform hover:scale-105 transition-all ease-in-out duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Đào tạo và giáo dục
              </h3>
              <p className="text-gray-600">
                Tổ chức các khóa học và chương trình đào tạo về bảo vệ môi
                trường cho cộng đồng và các tổ chức.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Liên hệ</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            chúng tôi để cùng nhau thực hiện các dự án vì một môi trường xanh.
          </p>
          <button className="btn btn-primary py-4 px-8 text-lg rounded-lg shadow-xl hover:bg-green-600 transition ease-in-out duration-300 transform hover:scale-105">
            Gửi yêu cầu
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
