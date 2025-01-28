import { useEffect, useState } from "react";
import HeaderLine from "@components/common/HeaderLine";
// import ProductList from "@components/HomePage/ProductList";
import FilterComponent from "@components/ProductPage/FilterComponent";
import ProductCard from "@components/common/ProductCard";
import productService from "@services/product.service";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { useParams } from "react-router-dom";
import categoryService from "@services/category.service";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    material: "",
    gender: "",
    priceRange: "",
    searchText: "",
    sortBy: "",
  });

  const [products, setProducts] = useState([]);
  const accessToken = localStorage.getItem("accessToken"); // Không nên đặt trong useEffect

  // console.log(products[0]);
  const { slug } = useParams();
  console.log(slug);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryService.getOneBySlug({
          accessToken,
          slug,
        });
        if (response?.metadata) {
          setCategory(response.metadata);
        } else {
          console.warn("No metadata found in response");
        }
      } catch (error) {
        console.error("Failed to fetch category: ", error);
      }
    };

    fetchCategory();
  }, [accessToken, slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!accessToken) {
          console.warn(
            "⚠ Không tìm thấy accessToken, có thể yêu cầu đăng nhập."
          );
          return;
        }

        const data = await productService.getAll({
          accessToken,
          type: "All",
          limit: 24,
          categoryIds: category?.id ? [category?.id] : [],
        });

        setProducts(data.metadata?.products || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [accessToken, category]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    const { type, material, gender, priceRange, searchText } = filters;

    // Lọc theo type (phải kiểm tra product.type thay vì name)
    if (type && product.type !== type) {
      return false;
    }

    // Lọc theo chất liệu
    if (material && product.material !== material) {
      return false;
    }

    // Lọc theo giới tính
    if (gender && product.gender !== gender) {
      return false;
    }

    // Lọc theo khoảng giá (kiểm tra tránh lỗi split)
    if (priceRange) {
      const range = priceRange.split("-").map(Number);
      if (
        range.length === 2 &&
        (product.price < range[0] || product.price > range[1])
      ) {
        return false;
      }
    }

    // Lọc theo tên sản phẩm
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
    if (filters.sortBy === "priceAsc") return a.price - b.price;
    if (filters.sortBy === "priceDesc") return b.price - a.price;
    if (filters.sortBy === "newest") return b.id - a.id; // Sắp xếp mới nhất
    return 0; // Không sắp xếp
  });

  const breadcrumb = [
    { label: "Trang chủ", path: "/" },
    {
      label: `${category?.name || "Sản phẩm của chúng tôi"}`,
      path: `/san-pham/${category?.slug}`,
    },
    // { label: "Dây chuyền", path: "/day-chuyen" },
    // { label: product?.name, path: `/san-pham/slug/${product?.slug}` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumb} />
      <div className="container mx-auto p-8">
        {/* Header */}
        <HeaderLine title="Sản phẩm của chúng tôi" />

        {/* Filter Section */}
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="container mx-auto px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Hiển thị tối đa 4 sản phẩm */}
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                productLink={`/san-pham/${product?.slug}`}
                image={
                  Array.isArray(product.images) && product.images.length > 0
                    ? product?.images[0]?.image?.path
                    : "https://via.placeholder.com/150"
                }
                name={product.name || "Sản phẩm không có tên"}
                price={product?.variants?.[0]?.price}
                discountPercentage={product.discountPercentage || 10}
                ratings={product.ratings || 5}
                id={product.id}
                buyed={product.soldNumber || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
