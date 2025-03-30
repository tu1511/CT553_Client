import { useEffect, useMemo, useState } from "react";
import HeaderLine from "@components/common/HeaderLine";
import ProductCard from "@components/common/ProductCard";
import productService from "@services/product.service";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import categoryService from "@services/category.service";
import { Pagination, Select, Slider } from "antd";

const PRODUCT_NEWEST = "Newest";
const PRODUCT_TRENDING = "Trending";
const PRODUCT_ALL = "All";
const PRODUCT_SALES = "Sales";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    type: PRODUCT_ALL,
    filterMinPrice: 0,
    filterMaxPrice: 3000000,
  });

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = parseInt(query.get("page") || "1", 10);

  const { slug } = useParams();

  useEffect(() => {
    if (slug === "san-pham") {
      setCategory(null);
      return;
    }
  }, [slug]);
  const [category, setCategory] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const fetchBreadcrumb = async () => {
      if (!category?.id) {
        setBreadcrumb([
          { label: "Trang chủ", path: "/" },
          { label: "Trang sức", path: "san-pham" },
        ]);
        return;
      }

      try {
        const response = await categoryService.getBreadcrumbFromCategory(
          category.id
        );
        setBreadcrumb([
          { label: "Trang chủ", path: "/" },
          { label: "Trang sức", path: "san-pham" },
          ...(response?.metadata || []).map((item) => ({
            label: item.name,
            path: item.slug,
          })),
        ]);
      } catch (error) {
        console.error("Failed to fetch breadcrumb: ", error);
      }
    };

    fetchBreadcrumb();
  }, [category]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryService.getOneBySlug({
          accessToken,
          slug,
        });
        if (response?.metadata) {
          setCategory(response.metadata);
        }
      } catch (error) {
        console.error("Failed to fetch category: ", error);
      }
    };

    fetchCategory();
  }, [accessToken, slug]);

  console.log("filterMin", filters.filterMinPrice);
  console.log("filterMax", filters.filterMaxPrice);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll({
          type: filters.type,
          limit: 12,
          page,
          categoryIds: category?.id ? [category?.id] : [],
          filterMinPrice: filters.filterMinPrice,
          filterMaxPrice: filters.filterMaxPrice,
        });
        const visibleProducts =
          data.metadata?.products?.filter(
            (product) => product.visible !== false
          ) || [];
        setProducts(visibleProducts);
        setTotalPage(data?.metadata?.pagination?.totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [accessToken, category, page, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const calculateAverageRating = (reviews = []) => {
    const validReviews = reviews.filter(
      (review) => review.rating !== null && review.rating !== undefined
    );
    if (validReviews.length === 0) return 0; // Mặc định 5 nếu không có rating hợp lệ
    const totalRating = validReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / validReviews.length;
  };

  return (
    <>
      <Breadcrumbs items={breadcrumb} />
      <div className="container mx-auto p-8">
        <HeaderLine title="Sản phẩm của chúng tôi" />

        {/* Bộ lọc sản phẩm */}
        <div className="flex justify-end gap-10 items-center mb-8">
          {/* Thanh trượt lọc giá */}
          <div className="w-64">
            <Slider
              range
              min={0}
              max={3000000}
              step={10000}
              value={[filters.filterMinPrice, filters.filterMaxPrice]}
              onChange={(value) =>
                handleFilterChange({
                  filterMinPrice: value[0],
                  filterMaxPrice: value[1],
                })
              }
            />
            <div className="text-center text-sm">
              Giá: {filters.filterMinPrice.toLocaleString()} -{" "}
              {filters.filterMaxPrice.toLocaleString()} VND
            </div>
          </div>
          {/* Lọc theo loại sản phẩm */}
          <Select
            className="w-48"
            value={filters.type}
            onChange={(value) => handleFilterChange({ type: value })}
            placeholder="Chọn danh mục"
          >
            <Select.Option value={PRODUCT_ALL}>Mặc định</Select.Option>
            <Select.Option value={PRODUCT_NEWEST}>Mới nhất</Select.Option>
            <Select.Option value={PRODUCT_TRENDING}>
              Sản phẩm bán chạy
            </Select.Option>
            <Select.Option value={PRODUCT_SALES}>
              Sản phẩm giảm giá
            </Select.Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productLink={`/san-pham/${product?.slug}`}
              image={
                product?.images?.[0]?.image?.path ||
                "https://via.placeholder.com/150"
              }
              name={product.name || "Sản phẩm không có tên"}
              price={product?.variants?.[0]?.price}
              discountPercentage={product?.productDiscount?.[0]?.discountValue}
              ratings={calculateAverageRating(product?.reviews)}
              id={product.id}
              buyed={product.soldNumber || 0}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            total={totalPage * 10}
            pageSize={12}
            onChange={(page) => navigate(`?page=${page}`)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
