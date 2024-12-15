import { BadgeCheck, ThumbsUp, Gift, Share2 } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: <BadgeCheck size={48} />,
      title: "ƯU ĐÃI THÀNH VIÊN",
      description:
        "Thành viên sẽ nhận được hộp trang sức trị giá 224.000đ và xu tích lũy,...",
    },
    {
      id: 2,
      icon: <ThumbsUp size={48} />,
      title: "ĐÁNH GIÁ TỪ GOOGLE",
      description:
        "5/5 sao theo đánh giá của khách hàng đã mua hàng của Silver Charm trên Google",
    },
    {
      id: 3,
      icon: <Gift size={48} />,
      title: "QUÀ TẶNG MIỄN PHÍ",
      description:
        "Bạn sẽ nhận được nhiều quà tặng hấp dẫn miễn phí cho đơn hàng bất kỳ",
    },
    {
      id: 4,
      icon: <Share2 size={48} />,
      title: "ƯU ĐÃI AFFILIATE",
      description:
        "Tham gia để nhận hoa hồng lên đến 17,5% giá trị đơn hàng và nhiều ưu đãi",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative border rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
          >
            {/* Icon */}
            <div className="flex justify-center mb-2">{feature.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
