import Breadcrumbs from "@components/common/Breadcrumbs";
import { formatDateTime } from "@helpers/formatDateTime";
import articleService from "@services/article.service";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const NewsCardDetail = () => {
  const { id } = useParams(); // Lấy slug từ URL

  const [article, SetArticle] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAll({});
        const unVisibleItems = response.metadata.filter(
          (article) => article.visible
        );
        setArticles(unVisibleItems);
      } catch (error) {
        console.error("Lỗi khi tải tin tức:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const currentNews = articles.find((item) => item.slug === id);
    SetArticle(currentNews || {});
    setRelatedNews(articles.filter((item) => item.slug !== id));
  }, [id, articles]);

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Tin tức", path: "tin-tuc" },
    { label: article.title || "Đang tải..." },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 pb-6 flex flex-col gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-1/4 hidden md:block overflow-hidden">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                Các Tin tức khác
              </h2>
              <div className="space-y-5">
                {relatedNews.slice(0, 5).map((related) => (
                  <Link
                    to={`/tin-tuc/${related.slug}`}
                    key={related.slug}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={related.thumbnailImage?.path}
                      alt={related.title}
                      className="w-20 h-20 max-w-full object-cover rounded-md"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors line-clamp-1">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(related.updatedAt).toLocaleString("vi-VN")}
                      </p>
                      <div
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            related.content.length > 200
                              ? related.content.substring(0, 200) + "..."
                              : related.content,
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </aside>

            <main className="md:w-3/4 flex-1">
              <h1 className="text-3xl font-bold text-primary mb-4">
                {article?.title || "Đang tải..."}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>Tác giả: {article?.author}</span>
                <span className="mx-2">|</span>
                <span>
                  {article.updatedAt
                    ? formatDateTime(article.updatedAt)
                    : "Đang tải..."}
                </span>
              </div>
              <div
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCardDetail;
