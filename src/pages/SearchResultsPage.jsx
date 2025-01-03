import { useState, useEffect } from "react";
import { Select, Pagination } from "antd";
import ProductCard from "@components/common/ProductCard";
import Breadcrumbs from "@components/common/Breadcrumbs";

const { Option } = Select;

const allProducts = [
  {
    id: 1,
    image:
      "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
    name: "Dây chuyền bạc cao cấp",
    price: 1200000,
    material: "silver",
    gender: "female",
    discountPercentage: 20,
    ratings: 4,
  },
  {
    id: 2,
    image:
      "https://lili.vn/wp-content/uploads/2022/08/Nhan-bac-nu-dinh-da-CZ-hoa-buom-LILI_661591_2-400x400.jpg",
    name: "Nhẫn bạc đẹp",
    price: 500000,
    material: "gold",
    gender: "female",
    ratings: 5,
    discountPercentage: 20,
  },
  {
    id: 3,
    image:
      "https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6.jpg",
    name: "Dây chuyền bạc thời trang",
    price: 1500000,
    material: "silver",
    gender: "unisex",
    ratings: 3,
    discountPercentage: 20,
  },
  {
    id: 4,
    image:
      "https://lili.vn/wp-content/uploads/2021/12/Nhan-doi-bac-hiep-si-va-cong-chua-dinh-da-CZ-LILI_819229_2-400x400.jpg",
    name: "Nhẫn bạc thời trang đẹp quá trời",
    price: 600000,
    material: "platinum",
    gender: "male",
    ratings: 4,
    discountPercentage: 20,
  },
  {
    id: 5,
    image:
      "https://lili.vn/wp-content/uploads/2021/11/Lac-tay-bac-nu-co-4-la-cach-dieu-LILI_661577_6-400x400.jpg",
    name: "Lắc tay bạc",
    price: 700000,
    material: "silver",
    gender: "female",
    ratings: 5,
    discountPercentage: 20,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    name: "Chocker bạc",
    price: 800000,
    material: "gold",
    gender: "unisex",
    ratings: 2,
    discountPercentage: 20,
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    name: "Lắc chân bạc",
    price: 900000,
    material: "silver",
    gender: "female",
    ratings: 5,
    discountPercentage: 20,
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    name: "Dây cổ bạc nam",
    price: 1100000,
    material: "silver",
    gender: "male",
    discountPercentage: 20,
    ratings: 4,
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    name: "Lắc chân bạc",
    price: 900000,
    discountPercentage: 20,
    material: "silver",
    gender: "female",
    ratings: 5,
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    name: "Dây cổ bạc nam",
    price: 1100000,
    material: "silver",
    discountPercentage: 20,
    gender: "male",
    ratings: 4,
  },
];

const SearchResultsPage = () => {
  const itemsPerPage = 8; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState(allProducts);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when sorted
  }, [sortedProducts]);

  const handleSortChange = (value) => {
    let sorted = [...allProducts];
    if (value === "priceAsc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "priceDesc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Kết quả tìm kiếm", path: "/tim-kiem" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 pb-6">
        <div className="mb-4 flex justify-end">
          {/* Sort By */}
          <Select
            placeholder="Sắp xếp"
            style={{ width: "150px" }}
            onChange={handleSortChange}
          >
            <Option value="">Mặc định</Option>
            <Option value="priceAsc">Giá tăng dần</Option>
            <Option value="priceDesc">Giá giảm dần</Option>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              discountPercentage={product.discountPercentage}
              ratings={product.ratings}
              id={product.id}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={sortedProducts.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;
