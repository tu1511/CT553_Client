import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Pagination } from "antd";
import Breadcrumbs from "@components/common/Breadcrumbs";
import NewsCard from "@components/NewsPage/NewsCard";

const NewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = parseInt(query.get("page") || "1", 10);

  const [totalPage, setTotalPage] = useState(1);
  const [news, setNews] = useState([]);

  const fakeRelatedNews = [
    {
      id: "1",
      title: "Top 10 sự kiện thể thao nổi bật",
      content:
        "<p>Tin tức về 10 sự kiện thể thao đáng chú ý trên toàn thế giới.</p>",
      updatedAt: "2025-01-02T12:00:00Z",
      thumbnail: "https://via.placeholder.com/300x200.png?text=Top+10+Sự+Kiện",
    },
    {
      id: "2",
      title: "Những câu chuyện truyền cảm hứng từ thể thao",
      content:
        "<p>Câu chuyện đầy cảm hứng từ những vận động viên nổi tiếng.</p>",
      updatedAt: "2025-01-03T15:30:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Cảm+Hứng+Thể+Thao",
    },
    {
      id: "3",
      title: "Dự đoán xu hướng thể thao năm 2025",
      content:
        "<p>Bài phân tích chi tiết về xu hướng thể thao trong năm 2025.</p>",
      updatedAt: "2025-01-04T14:00:00Z",
      thumbnail: "https://via.placeholder.com/300x200.png?text=Xu+Hướng+2025",
    },
    {
      id: "4",
      title: "Giải thưởng thể thao quốc tế 2025",
      content:
        "<p>Những cái tên nổi bật trong danh sách giải thưởng thể thao quốc tế năm nay.</p>",
      updatedAt: "2025-01-05T16:00:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Giải+Thưởng+2025",
    },
    {
      id: "5",
      title: "Bóng đá nữ: Những thành công đáng chú ý",
      content:
        "<p>Bóng đá nữ đã đạt được nhiều thành tựu lớn trên sân cỏ quốc tế.</p>",
      updatedAt: "2025-01-06T09:30:00Z",
      thumbnail: "https://via.placeholder.com/300x200.png?text=Bóng+Đá+Nữ",
    },
    {
      id: "6",
      title: "Công nghệ trong thể thao: Xu hướng mới",
      content:
        "<p>Cách công nghệ đang thay đổi cách chúng ta theo dõi và tham gia thể thao.</p>",
      updatedAt: "2025-01-07T18:00:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Công+Nghệ+Thể+Thao",
    },
    {
      id: "7",
      title: "Thể thao điện tử lên ngôi",
      content:
        "<p>Thể thao điện tử tiếp tục chứng minh vị thế là một ngành công nghiệp lớn.</p>",
      updatedAt: "2025-01-08T10:45:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Thể+Thao+Điện+Tử",
    },
    {
      id: "8",
      title: "Đánh giá các vận động viên trẻ triển vọng",
      content:
        "<p>Những gương mặt trẻ hứa hẹn sẽ tạo nên dấu ấn trong làng thể thao.</p>",
      updatedAt: "2025-01-09T13:15:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Vận+Động+Viên+Trẻ",
    },
    {
      id: "9",
      title: "Hành trình đến với Thế vận hội 2025",
      content:
        "<p>Câu chuyện về hành trình đầy cảm hứng của các vận động viên chuẩn bị cho Thế vận hội.</p>",
      updatedAt: "2025-01-10T08:20:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Thế+Vận+Hội+2025",
    },
    {
      id: "10",
      title: "Ảnh hưởng của thể thao đến sức khỏe tâm lý",
      content:
        "<p>Những lợi ích tâm lý mà thể thao mang lại cho vận động viên và người hâm mộ.</p>",
      updatedAt: "2025-01-11T17:10:00Z",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Thể+Thao+và+Sức+Khỏe",
    },
  ];

  useEffect(() => {
    // Giả lập lấy dữ liệu tin tức dựa trên trang hiện tại
    const itemsPerPage = 4; // Số lượng bài viết mỗi trang
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setTotalPage(Math.ceil(fakeRelatedNews.length / itemsPerPage));
    setNews(fakeRelatedNews.slice(startIndex, endIndex));
  }, [page]);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Tin tức", path: "/tin-tuc" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 py-6 flex flex-col">
        <div className="flex flex-wrap justify-center gap-10">
          {news.map((article) => (
            <Link to={`/tin-tuc/${article.id}`} key={article.id}>
              <NewsCard article={article} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            total={totalPage * 10} // Tổng số trang * 10 (Ant Design yêu cầu giá trị này đại diện cho số mục)
            pageSize={10} // Số mục mỗi trang
            onChange={handlePageChange}
            showSizeChanger={false} // Ẩn thay đổi kích thước trang
          />
        </div>
      </div>
    </>
  );
};

export default NewsPage;
