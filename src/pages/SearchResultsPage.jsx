import { useState, useEffect, useMemo } from "react";
import { Select, Pagination } from "antd";
import ProductCard from "@components/common/ProductCard";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { useLocation } from "react-router-dom";
import productService from "@services/product.service";
import { toast } from "react-toastify";

const { Option } = Select;

const SearchResultsPage = () => {
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const searchString = query.get("tu-khoa");
  console.log("searchString", searchString);

  const imageUrl = query.get("hinh-anh");
  console.log("imageUrl", imageUrl);

  const [products, setProducts] = useState([]);

  // search product
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchString?.trim() && !imageUrl?.trim()) return; // Kiểm tra nếu searchString rỗng hoặc chỉ chứa khoảng trắng

      if (searchString) {
        try {
          const response = await productService.search({
            search: searchString,
          });

          const fullTextResults =
            response?.metadata?.fullTextSearchResult || [];
          const semanticResults =
            response?.metadata?.semanticSearchResult || [];

          if (fullTextResults.length > 0) {
            toast.success(`Tìm thấy ${fullTextResults.length} sản phẩm!`);
            setProducts(fullTextResults);
          } else if (semanticResults.length > 0) {
            toast.success(`Tìm thấy ${semanticResults.length} sản phẩm!`);
            setProducts(semanticResults);
          } else {
            toast.info("Không tìm thấy sản phẩm nào.");
            setProducts([]); // Xóa danh sách nếu không tìm thấy gì
          }
        } catch (error) {
          toast.error("Lỗi khi tìm kiếm sản phẩm!", { autoClose: 2000 });
          console.error("Search Error:", error);
        }
      } else if (imageUrl) {
        try {
          const response = await productService.searchImage({ imageUrl });

          const results = response?.metadata || [];

          if (results.length > 0) {
            toast.success(`Tìm thấy ${results.length} sản phẩm!`);
            setProducts(results);
          } else {
            toast.info("Không tìm thấy sản phẩm nào.");
            setProducts([]); // Xóa danh sách nếu không tìm thấy gì
          }
        } catch (error) {
          toast.error("Lỗi khi tìm kiếm sản phẩm!");
          console.error("Search Error:", error);
        }
      }
    };

    fetchProducts();
  }, [searchString, imageUrl]);
  // useEffect sẽ chạy lại khi searchString thay đổi

  console.log("products", products);

  const itemsPerPage = 8; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when sorted
  }, [products]);

  const handleSortChange = (value) => {
    setProducts((prevProducts) => {
      let sorted = [...prevProducts]; // Tạo bản sao mới của mảng

      if (value === "priceAsc") {
        sorted.sort(
          (a, b) =>
            a.variants[0].priceHistory[0].price -
            b.variants[0].priceHistory[0].price
        );
      } else if (value === "priceDesc") {
        sorted.sort(
          (a, b) =>
            b.variants[0].priceHistory[0].price -
            a.variants[0].priceHistory[0].price
        );
      }

      return [...sorted]; // Trả về một mảng mới để React nhận diện sự thay đổi
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    {
      label: `Kết quả tìm kiếm ${
        searchString ? `cho ${searchString}` : "bằng hình ảnh"
      }`,
    },
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
              productLink={`/san-pham/${product?.slug}`}
              image={product?.images[0]?.image?.path}
              name={product.name}
              price={product.variants[0]?.priceHistory[0].price}
              discountPercentage={product?.productDiscount[0]?.discountValue}
              ratings={4}
              id={product.id}
              buyed={product.soldNumber || 0}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={products.length}
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
