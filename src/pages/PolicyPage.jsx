import Breadcrumbs from "@components/common/Breadcrumbs";
import HeaderLine from "@components/common/HeaderLine";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDateTime } from "@helpers/formatDateTime";
import policyService from "@services/policy.service";

const PolicyPage = () => {
  const { slug } = useParams(); // Get policy ID from route
  console.log("id", slug);

  const [policy, setPolicy] = useState({});

  useEffect(() => {
    const fetchPolicy = async () => {
      const response = await policyService.getOneBySlug(slug);
      setPolicy(response?.metadata);
    };

    fetchPolicy();
  }, [slug]);

  const breadcrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: policy.title || "Đang tải..." },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mx-auto px-8 pb-6 flex flex-col gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Main Policy Content */}
            <main className="flex-1">
              <HeaderLine title={policy.title || "Đang tải..."} />
              <div className="flex items-center text-sm text-black mb-6">
                <span className="text-primary font-semibold">Silver Charm</span>
                <span className="mx-2">|</span>
                <span className="text-gray-700 italic">
                  Cập nhật vào{" "}
                  {policy.updatedAt
                    ? formatDateTime(policy?.updatedAt)
                    : "Đang tải..."}
                </span>
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
