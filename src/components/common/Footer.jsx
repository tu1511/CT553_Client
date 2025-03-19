import FeatureCards from "@components/common/FeatureCards";
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleService from "@services/article.service";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "@redux/thunk/shopInfoThunk";

const Footer = () => {
  const dispatch = useDispatch();

  const { shopInfo } = useSelector((state) => state.shopInfo);

  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAll({});
        const unVisibleItems = response.metadata.filter(
          (article) => article.visible
        );
        setArticles(unVisibleItems);
      } catch (error) {
        console.error("Lỗi khi tải tin tức:", error);
      }
    };
    fetchArticles();
  }, []);

  const supportServices = articles.slice(0, 5).map((item) => ({
    label: item.title,
    to: `/tin-tuc/${item.slug}`,
  }));

  const socialLinks = [
    { href: "https://www.facebook.com", icon: <Facebook size={24} /> },
    { href: "https://www.instagram.com", icon: <Instagram size={24} /> },
    { href: "https://github.com", icon: <Github size={24} /> },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="text-primary" />,
      text: shopInfo?.detailAddress,
    },
    {
      icon: <Phone className="text-primary" />,
      text: shopInfo?.phone,
    },
    {
      icon: <Mail className="text-primary" />,
      text: shopInfo?.email,
    },
    {
      icon: <Clock className="text-primary" />,
      text: shopInfo?.workingTime,
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
                  src={shopInfo?.logo?.path}
                  alt="Logo"
                  className="h-12 rounded-xl"
                />
                <span className="text-2xl font-semibold text-primary">
                  {shopInfo?.name}
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
                      className="text-black hover:text-primary line-clamp-1"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* map address */}
            {/* Vị trí cửa hàng */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg uppercase text-gray-700">
                Vị trí cửa hàng
              </h3>
              <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184425216!2d105.76803500992727!3d10.029933690035627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1741752309262!5m2!1svi!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Ý kiến đóng góp */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-700">
                Ý KIẾN ĐÓNG GÓP
              </h3>
              <p className="text-black font-base italic w-full text-justify">
                {shopInfo?.slogan}
              </p>
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
