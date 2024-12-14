import DropdownMenu from "@components/DropdownMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const categories = [
    { name: "Trang chủ", link: "/", menuItems: [] },
    {
      name: "Trang sức nữ",
      link: "/trang-suc-nu",
      menuItems: [
        { label: "Nhẫn bạc nữ", key: "ring", link: "#" },
        { label: "Dây chuyền bạc nữ", key: "necklace", link: "#" },
        { label: "Lắc tay bạc nữ", key: "bracelet", link: "#" },
        { label: "Bông tai bạc nữ", key: "earring", link: "#" },
      ],
    },
    {
      name: "Trang sức nam",
      link: "/trang-suc-nam",
      menuItems: [
        { label: "Nhẫn bạc nam", key: "ring", link: "#" },
        { label: "Dây chuyền bạc nam", key: "necklace", link: "#" },
        { label: "Lắc tay bạc nam", key: "bracelet", link: "#" },
      ],
    },
    { name: "Trang sức đôi", link: "/trang-suc-doi", menuItems: [] },
    { name: "Bộ sưu tập", link: "/bo-sieu-tap", menuItems: [] },
    { name: "Chính sách", link: "/chinh-sach", menuItems: [] },
    { name: "Liên hệ", link: "/lien-he", menuItems: [] },
  ];

  const formatMenuItems = (menuItems) =>
    menuItems.map((item) => ({
      label: (
        <Link
          to={item.link}
          className="block text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 transition duration-200 ease-in-out"
        >
          {item.label}
        </Link>
      ),
      key: item.key,
    }));

  return (
    <nav className="bg-beige-100 border-b-2 border-red-700">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center px-4 py-2">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            {category.menuItems.length > 0 ? (
              <DropdownMenu
                menuItems={formatMenuItems(category.menuItems)}
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
