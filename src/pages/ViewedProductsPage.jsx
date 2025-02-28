import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@components/common/Breadcrumbs";
import ProductCard from "@components/common/ProductCard";
import { Pagination } from "antd";
import { Archive } from "lucide-react";

const ViewedProductsPage = () => {
  const itemsPerPage = 8; // Số sản phẩm mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const viewedProducts =
    JSON.parse(localStorage.getItem("viewedProducts")) || [];

  useEffect(() => {
    // Tính toán các sản phẩm trong trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(viewedProducts.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Sản phẩm đã xem", path: "/san-pham-da-xem" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 pb-6">
        {viewedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-600 bg-gray-50 p-6 rounded-lg shadow-md">
            <Archive size={64} className="text-gray-400" />

            <p className="text-lg font-semibold text-gray-700">
              Bạn chưa xem sản phẩm nào!
            </p>

            <Link
              to="/"
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              🏠 Trở về Trang chủ
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  productLink={product.productLink}
                  name={product.name}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                  ratings={product.ratings}
                  id={product.id}
                  buyed={product.buyed}
                />
              ))}
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={viewedProducts.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewedProductsPage;
