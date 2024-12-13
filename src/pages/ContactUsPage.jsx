import React, { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending to an API or logging data)
    console.log(formData);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          Liên Hệ Chúng Tôi
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Chúng tôi luôn sẵn sàng nghe những câu hỏi và yêu cầu của bạn. Hãy để
          lại thông tin và chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
        </p>

        {/* Container để đặt form và bản đồ nằm ngang */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form liên hệ */}
          <section className="bg-white p-8 rounded-lg shadow-lg flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Gửi Tin Nhắn Cho Chúng Tôi
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-left text-lg font-medium text-gray-700"
                >
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-left text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-left text-lg font-medium text-gray-700"
                >
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-left text-lg font-medium text-gray-700"
                >
                  Tin Nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </section>

          {/* Bản đồ Google nhúng bằng iframe */}
          <section className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Địa Chỉ Của Chúng Tôi
            </h3>
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184425216!2d105.76803500992727!3d10.029933690035627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1733930586378!5m2!1svi!2s"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Google Maps"
              ></iframe>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
