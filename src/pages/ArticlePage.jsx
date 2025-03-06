import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Pagination } from "antd";
import Breadcrumbs from "@components/common/Breadcrumbs";
import NewsCard from "@components/ArticlePage/ArticleCard";
import articleService from "@services/article.service";

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = parseInt(query.get("page") || "1", 10);
  const itemsPerPage = 4; // Số lượng bài viết mỗi trang

  const [totalItems, setTotalItems] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAll({});
        const visibleArticles = response.metadata.filter(
          (article) => article.visible
        );

        setTotalItems(visibleArticles.length);

        // Cắt mảng để chỉ lấy bài viết thuộc trang hiện tại
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setArticles(visibleArticles.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Lỗi khi tải tin tức:", error);
      }
    };
    fetchArticles();
  }, [page]); // Cập nhật khi thay đổi trang

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Tin tức", path: "/tin-tuc" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 py-6 flex flex-col">
        {articles?.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-10">
              {articles.map((article) => (
                <Link to={`/tin-tuc/${article.slug}`} key={article.id}>
                  <NewsCard article={article} />
                </Link>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng mục trên mỗi trang
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Không có bài viết nào.</p>
        )}
      </div>
    </>
  );
};

export default ArticlePage;
