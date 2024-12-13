import {
  Clock,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const customerServices = [
    { label: "Hướng dẫn chọn size", to: "#" },
    { label: "Chính sách giao hàng", to: "#" },
    { label: "Chính sách quyền riêng tư", to: "#" },
    { label: "Hướng dẫn mua hàng online", to: "#" },
    { label: "Chính sách trả hàng hoàn tiền", to: "#" },
  ];

  const supportServices = [
    { label: "Tại sao nên chọn bạc cao cấp?", to: "#" },
    { label: "Cách làm trang sức bạc tại nhà", to: "#" },
    { label: "Phân biệt các loại bạc S925, S999,...", to: "#" },
    { label: "Những tác dụng của bạc", to: "#" },
    { label: "Cách bảo quản trang sức bạc", to: "#" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com", icon: <Facebook size={24} /> },
    { href: "https://www.instagram.com", icon: <Instagram size={24} /> },
    { href: "https://github.com", icon: <Github size={24} /> },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="text-border" />,
      text: "Đường 3/2, Ninh Kiều, Cần Thơ",
    },
    { icon: <Phone className="text-border" />, text: "+84 845 969 757" },
    { icon: <Mail className="text-border" />, text: "minhtu15112k3@gmail.com" },
    {
      icon: <Clock className="text-border" />,
      text: "Từ 8:00 đến 17:00 hàng ngày",
    },
  ];

  return (
    <footer className="bg-white pt-4 shadow-lg border-t-2 border-border">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Logo and Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src="/src/assets/logo.png" alt="Logo" className="h-12" />
            <span className="text-2xl font-semibold text-border">
              Silver Charm
            </span>
          </div>

          {/* Contact info */}
          <div className="space-y-2">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-600"
              >
                {info.icon}
                <p>{info.text}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 p-2 border-gray-400 hover:border-border rounded-lg transition-all ease-in-out duration-300"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* General Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg uppercase text-gray-700">
            Cẩm nang sử dụng
          </h3>
          <ul className="space-y-2">
            {supportServices.map((service, index) => (
              <li key={index}>
                <Link to={service.to} className="text-black hover:text-border">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">
            DỊCH VỤ KHÁCH HÀNG
          </h3>
          <ul className="space-y-2">
            {customerServices.map((service, index) => (
              <li key={index}>
                <Link to={service.to} className="text-black hover:text-border">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Feedback */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">
            Ý KIẾN ĐÓNG GÓP
          </h3>
          <p className="text-black font-base italic">
            Silver Charm luôn mong nhận được ý kiến đóng góp từ bạn để nâng cấp
            dịch vụ và sản phẩm tốt hơn. <br /> Nếu bạn có ý kiến, đừng ngần
            ngại đóng góp cho Silver Charm nhé. Silver Charm xin cảm ơn!
          </p>
          <button className="px-4 py-2 bg-border text-white rounded-md hover:bg-red-700 transition">
            Gửi Ý Kiến
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="py-2 mt-4 bg-secondary">
        <div className="flex justify-center items-center">
          <span>
            © {new Date().getFullYear()} Bản quyền thuộc về Silver Charm.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
