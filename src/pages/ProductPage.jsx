import { useState } from "react";
import HeaderLine from "@components/common/HeaderLine";
import ProductList from "@components/HomePage/ProductList";
import FilterComponent from "@components/ProductPage/FilterComponent";
import ProductCard from "@components/common/ProductCard";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    material: "",
    gender: "",
    priceRange: "",
    searchText: "",
    sortBy: "",
  });

  // All products (mock data)
  const allProducts = [
    {
      id: 1,
      image:
        "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
      name: "Dây chuyền bạc cao cấp",
      price: 1200000, // Giá gốc
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
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      name: "Chocker bạc",
      price: 800000,
      material: "gold",
      gender: "unisex",
      ratings: 2,
    },
  ];

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to products
  const filteredProducts = allProducts.filter((product) => {
    const { type, material, gender, priceRange, searchText } = filters;

    // Type filter (example: necklaces or rings)
    if (type && !product.name.toLowerCase().includes(type.toLowerCase())) {
      return false;
    }

    // Material filter
    if (material && product.material !== material) {
      return false;
    }

    // Gender filter
    if (gender && product.gender !== gender) {
      return false;
    }

    // Price range filter
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    // Search text filter
    if (
      searchText &&
      !product.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort products based on filters.sortBy
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "priceAsc") {
      return a.price - b.price;
    }
    if (filters.sortBy === "priceDesc") {
      return b.price - a.price;
    }
    if (filters.sortBy === "newest") {
      return b.id - a.id; // Assuming newer products have higher IDs
    }
    return 0; // Default, no sorting
  });

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <HeaderLine title="Sản phẩm của chúng tôi" />

      {/* Filter Section */}
      <FilterComponent filters={filters} onFilterChange={handleFilterChange} />

      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Hiển thị tối đa 4 sản phẩm */}
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              discountPercentage={product.discountPercentage}
              ratings={product.ratings}
              id={product.id}
              buyed={product.buyed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
