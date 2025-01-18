import DropdownMenu from "@components/common/DropdownMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const categories = [
    { name: "Trang chủ", link: "/", menuItems: [] },
    {
      name: "Trang sức",
      menuItems: [
        {
          label: "Trang sức nữ",
          key: "female-jewelry",
          children: [
            { label: "Nhẫn bạc nữ", key: "ring-female", link: "/san-pham" },
            {
              label: "Dây chuyền bạc nữ",
              key: "necklace-female",
              link: "/san-pham",
            },
            {
              label: "Lắc tay bạc nữ",
              key: "bracelet-female",
              link: "/san-pham",
            },
            {
              label: "Bông tai bạc nữ",
              key: "earring-female",
              link: "/san-pham",
            },
          ],
        },
        {
          label: "Trang sức nam",
          key: "male-jewelry",
          children: [
            { label: "Nhẫn bạc nam", key: "ring-male", link: "/san-pham" },
            {
              label: "Dây chuyền bạc nam",
              key: "necklace-male",
              link: "/san-pham",
            },
            {
              label: "Lắc tay bạc nam",
              key: "bracelet-male",
              link: "/san-pham",
            },
          ],
        },
        {
          label: "Trang sức đôi",
          key: "couple-jewelry",
          children: [
            {
              label: "Nhẫn cặp",
              key: "couple-ring",
              link: "/san-pham",
            },
            {
              label: "Dây chuyền cặp",
              key: "couple-necklace",
              link: "/san-pham",
            },
          ],
        },
      ],
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
        {categories.map((category, index) => (
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
