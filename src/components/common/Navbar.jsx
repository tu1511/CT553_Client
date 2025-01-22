import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "@components/common/DropdownMenu";
import categoryService from "@services/category.service";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll({ accessToken });
        if (response?.metadata) {
          setCategories(response.metadata);
        } else {
          console.warn("No metadata found in response");
        }
      } catch (error) {
        console.error("Failed to fetch categories: ", error);
      }
    };

    fetchCategories();
  }, [accessToken]);

  useEffect(() => {
    console.log(categories); // Chỉ log sau khi categories thay đổi
  }, [categories]); // Chạy khi categories thay đổi

  // Tạo menuItems động từ categories
  const jewelryMenuItems = categories.map((category) => ({
    label: category.name,
    key: category.slug,
    link: `/${category.slug}`,
    children: category.children?.map((child) => ({
      label: child.name,
      key: child.slug,
      link: `/${child.slug}`,
    })),
  }));

  const navbar = [
    { name: "Trang chủ", link: "/", menuItems: [] },
    {
      name: "Trang sức",
      link: "/trang-suc",
      menuItems: jewelryMenuItems, // Sử dụng dữ liệu động từ API
    },
    { name: "Khuyến mãi", link: "/khuyen-mai", menuItems: [] },
    { name: "Tin tức", link: "/tin-tuc", menuItems: [] },
    {
      name: "Chính sách",
      link: "/chinh-sach",
      menuItems: [
        {
          label: "Chính sách bảo mật",
          key: "privacy",
          link: "/chinh-sach-bao-mat",
        },
        {
          label: "Chính sách đổi trả",
          key: "return-policy",
          link: "/chinh-sach-doi-tra",
        },
        {
          label: "Chính sách vận chuyển",
          key: "shipping-policy",
          link: "/chinh-sach-van-chuyen",
        },
      ],
    },
    { name: "Về chúng tôi", link: "/ve-chung-toi", menuItems: [] },
  ];

  return (
    <nav className="bg-beige-100 border-b-2 border-red-700">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center px-4 py-2">
        {navbar.map((category, index) => (
          <div key={index} className="relative">
            {category.menuItems && category.menuItems.length > 0 ? (
              <DropdownMenu
                menuItems={category.menuItems}
                label={category.name}
              />
            ) : (
              <Link
                to={category.link}
                className="px-4 py-2 text-sm uppercase font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-full transition-all duration-200"
              >
                {category.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
