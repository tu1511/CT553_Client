import Breadcrumbs from "@components/common/Breadcrumbs";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const NewsCardDetail = () => {
  const { id } = useParams(); // Lấy ID bài viết từ route

  const [news, setNews] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);

  // Dữ liệu fake
  useEffect(() => {
    const fakeRelatedNews = [
      {
        id: "1",
        title: "Cập nhật mới nhất về thể thao 2025",
        content:
          "<p>Đây là nội dung chi tiết của Tin tức thể thao 2025, cung cấp thông tin đầy đủ về xu hướng và sự kiện.</p>",
        updatedAt: "2025-01-01T10:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Related+Thumbnail+1",
      },
      {
        id: "2",
        title: "Top 10 sự kiện thể thao nổi bật",
        content:
          "<p>Tin tức về 10 sự kiện thể thao đáng chú ý trên toàn thế giới.</p>",
        updatedAt: "2025-01-02T12:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Related+Thumbnail+1",
      },
      {
        id: "3",
        title: "Những câu chuyện truyền cảm hứng từ thể thao",
        content:
          "<p>Câu chuyện đầy cảm hứng từ những vận động viên nổi tiếng.</p>",
        updatedAt: "2025-01-03T15:30:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Related+Thumbnail+2",
      },
      {
        id: "4",
        title: "Dự đoán xu hướng thể thao năm 2025",
        content:
          "<p>Bài phân tích chi tiết về xu hướng thể thao trong năm 2025.</p>",
        updatedAt: "2025-01-04T14:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Related+Thumbnail+3",
      },
    ];

    // Lấy bài viết hiện tại từ fake dữ liệu
    const currentNews = fakeRelatedNews.find((item) => item.id === id);

    setNews(currentNews || {}); // Nếu không tìm thấy, đặt thành {}
    setRelatedNews(fakeRelatedNews.filter((item) => item.id !== id)); // Loại bỏ bài viết hiện tại khỏi danh sách liên quan
  }, [id]); // Lắng nghe sự thay đổi của `id`

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Tin tức", path: "/tin-tuc" },
    { label: news.title || "Đang tải..." },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 py-6 flex flex-col gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar cho Tin tức liên quan */}
            <aside className="md:w-1/4 hidden md:block">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                Các Tin tức khác
              </h2>
              <div className="space-y-5">
                {relatedNews.map((related) => (
                  <Link
                    to={`/tin-tuc/${related.id}`}
                    key={related.id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(related.updatedAt).toLocaleString("vi-VN")}
                      </p>
                      <div
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: related.content }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </aside>

            {/* Nội dung chính của bài viết */}
            <main className="flex-1">
              <h1 className="text-3xl font-bold text-orange-600 mb-4">
                {news?.title || "Đang tải..."}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>
                  {news.updatedAt
                    ? new Date(news.updatedAt).toLocaleString("vi-VN", {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    : "Đang tải..."}
                </span>
                <span className="mx-2">|</span>
                <span>KBTSports</span>
              </div>
              <div
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCardDetail;
