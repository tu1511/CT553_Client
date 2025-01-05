import FeatureCards from "@components/common/FeatureCards";
import FeedbackModal from "@components/common/FeedbackModal";
import {
  ArchiveRestore,
  Clock,
  Facebook,
  Github,
  Headset,
  Instagram,
  Mail,
  MapPin,
  Medal,
  Phone,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { toast } from "react-toastify";

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hiển thị modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý khi submit form
  const handleSubmit = (data) => {
    console.log("Phản hồi:", data);
    toast.success("Phản hồi đã được gửi thành công!");
    setIsModalVisible(false);
  };

  const customerServices = [
    { label: "Hướng dẫn chọn size", to: "/chinh-sach/1" },
    { label: "Hướng dẫn mua hàng online", to: "/chinh-sach/1" },
    { label: "Chính sách giao hàng", to: "/chinh-sach/1" },
    { label: "Chính sách quyền riêng tư", to: "/chinh-sach/1" },
    { label: "Chính sách trả hàng hoàn tiền", to: "/chinh-sach/1" },
  ];

  const supportServices = [
    { label: "Tại sao nên chọn bạc cao cấp?", to: "/tin-tuc" },
    { label: "Cách làm trang sức bạc tại nhà", to: "/tin-tuc" },
    { label: "Phân biệt các loại bạc S925, S999,...", to: "/tin-tuc" },
    { label: "Những tác dụng của bạc", to: "/tin-tuc" },
    { label: "Cách bảo quản trang sức bạc", to: "/tin-tuc" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com", icon: <Facebook size={24} /> },
    { href: "https://www.instagram.com", icon: <Instagram size={24} /> },
    { href: "https://github.com", icon: <Github size={24} /> },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="text-primary" />,
      text: "Đường 3/2, Ninh Kiều, Cần Thơ",
    },
    { icon: <Phone className="text-primary" />, text: "+84 845 969 757" },
    {
      icon: <Mail className="text-primary" />,
      text: "minhtu15112k3@gmail.com",
    },
    {
      icon: <Clock className="text-primary" />,
      text: "Từ 8:00 đến 17:00 hàng ngày",
    },
  ];
  const features = [
    {
      id: 1,
      icon: <Smile size={48} />,
      title: "Khách Hàng Hài Lòng",
      description:
        "Khách hàng là trung tâm của mọi hoạt động của Silver Charm. Chúng tôi luôn lắng nghe và phục vụ khách hàng tốt nhất",
    },
    {
      id: 2,
      icon: <Medal size={48} />,
      title: "chất lượng cao cấp",
      description:
        "Silver Charm cam kết cung cấp Mọi sản phẩm đều được thiết kế và chế tác bởi các nghệ nhân hàng đầu",
    },
    {
      id: 3,
      icon: <ArchiveRestore size={48} />,
      title: "đổi trả dễ dàng",
      description:
        "Đổi trả hàng trong vòng 7 ngày kể từ ngày nhận hàng. Đổi trả hàng dễ dàng và nhanh chóng",
    },
    {
      id: 4,
      icon: <Headset size={48} />,
      title: "hỗ trợ nhiệt tình",
      description:
        "Tất cả câu hỏi đều được các chuyên viên của Silver Charm tư vấn, giải đáp kỹ càng",
    },
  ];

  return (
    <>
      <footer className="bg-white shadow-lg border-t-2 border-primary mt-10">
        <FeatureCards features={features} />
        <div className="border-t-2 pt-4">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logo and Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/src/assets/logo.png"
                  alt="Logo"
                  className="h-12 rounded-xl"
                />
                <span className="text-2xl font-semibold text-primary">
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
                    className="border-2 p-2 border-gray-400 hover:border-primary rounded-lg transition-all ease-in-out duration-300"
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
                    <Link
                      to={service.to}
                      className="text-black hover:text-primary"
                    >
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
                    <Link
                      to={service.to}
                      className="text-black hover:text-primary"
                    >
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
                Silver Charm luôn mong nhận được ý kiến đóng góp từ bạn để nâng
                cấp dịch vụ và sản phẩm tốt hơn. <br /> Nếu bạn có ý kiến, đừng
                ngần ngại đóng góp cho Silver Charm nhé. Silver Charm xin cảm
                ơn!
              </p>

              <Button
                type="primary"
                onClick={showModal}
                style={{
                  backgroundColor: "#c60018",
                  borderColor: "#ffffff",
                  color: "white",
                }}
              >
                Gửi ý kiến
              </Button>
              {/* Feedback Modal */}
              <FeedbackModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            </div>
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
    </>
  );
};

export default Footer;
