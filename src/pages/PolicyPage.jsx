import Breadcrumbs from "@components/common/Breadcrumbs";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PolicyPage = () => {
  const { id } = useParams(); // Get policy ID from route

  const [policy, setPolicy] = useState({});
  const [relatedPolicies, setRelatedPolicies] = useState([]);

  // Fake data for demonstration
  useEffect(() => {
    const fakePolicies = [
      {
        id: "1",
        title: "Chính sách bảo hành sản phẩm",
        content:
          "<p>Chúng tôi cam kết bảo hành sản phẩm trong vòng 12 tháng kể từ ngày mua hàng.</p>",
        updatedAt: "2025-01-01T10:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Policy+Thumbnail+1",
      },
      {
        id: "2",
        title: "Chính sách đổi trả hàng",
        content:
          "<p>Bạn có thể đổi trả hàng trong vòng 30 ngày kể từ ngày mua.</p>",
        updatedAt: "2025-01-02T12:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Policy+Thumbnail+2",
      },
      {
        id: "3",
        title: "Chính sách giao hàng",
        content:
          "<p>Chúng tôi cung cấp dịch vụ giao hàng miễn phí cho đơn hàng trên 500.000 VND.</p>",
        updatedAt: "2025-01-03T15:30:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Policy+Thumbnail+3",
      },
      {
        id: "4",
        title: "Chính sách bảo mật thông tin",
        content:
          "<p>Thông tin cá nhân của bạn được bảo mật tuyệt đối theo quy định của pháp luật.</p>",
        updatedAt: "2025-01-04T14:00:00Z",
        thumbnail:
          "https://via.placeholder.com/100x100.png?text=Policy+Thumbnail+4",
      },
    ];

    // Find the selected policy
    const currentPolicy = fakePolicies.find((item) => item.id === id);

    setPolicy(currentPolicy || {}); // If not found, set as {}
    setRelatedPolicies(fakePolicies.filter((item) => item.id !== id)); // Exclude the current policy from related list
  }, [id]);

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Chính sách", path: "/chinh-sach" },
    { label: policy.title || "Đang tải..." },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 pb-6 flex flex-col gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar for Related Policies */}
            <aside className="md:w-1/4 hidden md:block">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                Các chính sách khác
              </h2>
              <div className="space-y-5">
                {relatedPolicies.map((related) => (
                  <Link
                    to={`/chinh-sach/${related.id}`}
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

            {/* Main Policy Content */}
            <main className="flex-1">
              <h1 className="text-3xl font-bold text-orange-600 mb-4">
                {policy?.title || "Đang tải..."}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>
                  {policy.updatedAt
                    ? new Date(policy.updatedAt).toLocaleString("vi-VN", {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    : "Đang tải..."}
                </span>
                <span className="mx-2">|</span>
                <span>Silver Charm</span>
              </div>
              <div
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyPage;
