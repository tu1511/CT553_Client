const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white py-6">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold text-teal-300">Về Chúng Tôi</h2>
          <p className="mt-4 ">
            Chúng tôi là một tổ chức từ thiện với sứ mệnh mang đến những bữa ăn
            ấm áp và đầy đủ dinh dưỡng cho các em nhỏ có hoàn cảnh khó khăn. Mỗi
            sự đóng góp của bạn không chỉ là món ăn mà còn là niềm hy vọng, tình
            yêu và sự sẻ chia dành cho những tâm hồn bé nhỏ cần được chở che.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-teal-300">Liên Kết Nhanh</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/" className="hover:text-teal-400 transition">
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="/bai-viet" className="hover:text-teal-400 transition">
                Bài Viết
              </a>
            </li>
            <li>
              <a
                href="/ve-chung-toi"
                className="hover:text-teal-400 transition"
              >
                Về Chúng Tôi
              </a>
            </li>
            <li>
              <a href="/lien-he" className="hover:text-teal-400 transition">
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-lg font-bold text-teal-300">Bản Đồ</h2>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184425216!2d105.76803500992727!3d10.029933690035627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1733930586378!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold text-teal-300">Thông Tin Liên Hệ</h2>
          <ul className="mt-4 space-y-2 text-teal-200">
            <li>Email: minhtu15112k3@gmail.com</li>
            <li>Điện thoại: +84 845 969 757</li>
            <li>Địa chỉ: 89 Trần Hưng Đạo, Ninh Kiều, TP.Cần Thơ</li>
          </ul>
          {/* Social Media */}
          <div className="mt-4 flex space-x-4">
            <a
              href="#"
              className="text-teal-300 hover:text-teal-400 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-teal-300 hover:text-teal-400 transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-teal-300 hover:text-teal-400 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-teal-700 pt-4 text-center text-teal-400">
        © {currentYear} Bản quyền thuộc về Minh Tứ. Đã đăng ký Bản quyền.
      </div>
    </footer>
  );
};

export default Footer;
