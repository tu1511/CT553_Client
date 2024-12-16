import CarouselComponent from "@components/CarouselComponent";
import FeatureCards from "@components/FeatureCards";
import ProductList from "@components/ProductList";
import TrendingSearch from "@components/TrendingSearch";
import UserReview from "@components/UserReview";
import { BadgeCheck, Gift, Share2, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  const products = [
    {
      id: 1,
      image:
        "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
      name: "Dây chuyền bạc cao cấp",
      price: 1200000, // Giá gốc
      discountPercentage: 20, // Phần trăm giảm
      ratings: 4, // Số sao đánh giá (1 đến 5)
      buyed: 2, // Số lượng đã bán
    },
    {
      id: 2,
      image:
        "https://lili.vn/wp-content/uploads/2022/08/Nhan-bac-nu-dinh-da-CZ-hoa-buom-LILI_661591_2-400x400.jpg",
      name: "Nhẫn bạc đẹp",
      price: 500000, // Giá gốc
      discountPercentage: 10, // Phần trăm giảm
      ratings: 5, // Số sao đánh giá (1 đến 5)
      buyed: 5, // Số lượng đã bán
    },
    {
      id: 3,
      image:
        "https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6.jpg",
      name: "Dây chuyền bạc thời trang",
      price: 1500000, // Giá gốc
      discountPercentage: 15, // Phần trăm giảm
      ratings: 3, // Số sao đánh giá (1 đến 5)
      buyed: 3, // Số lượng đã bán
    },
    {
      id: 4,
      image:
        "https://lili.vn/wp-content/uploads/2021/12/Nhan-doi-bac-hiep-si-va-cong-chua-dinh-da-CZ-LILI_819229_2-400x400.jpg",
      name: "Nhẫn bạc thời trang đẹp quá trời",
      price: 600000, // Giá gốc
      discountPercentage: 25, // Phần trăm giảm
      ratings: 4, // Số sao đánh giá (1 đến 5)
      buyed: 7, // Số lượng đã bán
    },
    {
      id: 5,
      image:
        "https://lili.vn/wp-content/uploads/2021/11/Lac-tay-bac-nu-co-4-la-cach-dieu-LILI_661577_6-400x400.jpg",
      name: "Lắc tay bạc",
      price: 700000, // Giá gốc
      discountPercentage: 30, // Phần trăm giảm
      ratings: 5, // Số sao đánh giá (1 đến 5)
      buyed: 10, // Số lượng đã bán
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      name: "Chocker bạc",
      price: 800000, // Giá gốc
      discountPercentage: 10, // Phần trăm giảm
      ratings: 2, // Số sao đánh giá (1 đến 5)
      buyed: 8, // Số lượng đã bán
    },
  ];

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

  const reviews = [
    {
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      content: "Sản phẩm rất đẹp và chất lượng. Tôi rất hài lòng với dịch vụ!",
      date: "2024-06-15",
    },
    {
      name: "Trần Thị B",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 4,
      content: "Đóng gói chắc chắn, giao hàng nhanh. Chất lượng khá tốt!",
      date: "2024-06-10",
    },
    {
      name: "Phạm Văn C",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 5,
      content: "Rất tuyệt vời, đáng để mua. Sẽ giới thiệu cho bạn bè!",
      date: "2024-06-05",
    },
  ];

  return (
    <div className="bg-white">
      {/* carousel section */}
      <CarouselComponent />

      {/* feature section */}
      <FeatureCards features={features} />

      {/* trending search section */}
      <TrendingSearch />

      {/* product list section */}
      <ProductList title="Sản phẩm yêu thích nhất" products={products} />

      <ProductList title="Sản phẩm mới nhất" products={products} />

      <ProductList title="Sản phẩm khuyến mãi" products={products} />

      {/* hero banner section */}
      <section
        className="mt-4 relative w-full h-[250px] bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/banner/hero.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center md:px-8">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
            Silver Charm - Trang Sức Cao Cấp
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-black max-w-3xl leading-relaxed mb-6">
            Đến với Silver Charm, trang sức không chỉ là một phụ kiện - đó là
            hiện thân của niềm đam mê, tình yêu của chúng tôi, và cuối cùng, là
            món quà của Silver Charm dành cho bạn.
          </p>

          {/* Button */}
          <Link
            to="/ve-chung-toi"
            className="bg-white uppercase font-semibold border-black border-2 rounded-xl text-black hover:bg-black hover:text-white py-2 px-4 transition duration-300 ease-in-out"
          >
            VỀ CHÚNG TÔI
          </Link>
        </div>
      </section>

      <UserReview reviews={reviews} />
    </div>
  );
}

export default HomePage;
