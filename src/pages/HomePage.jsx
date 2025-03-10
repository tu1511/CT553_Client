import CarouselComponent from "@components/HomePage/CarouselComponent";
import FeatureCards from "@components/common/FeatureCards";
import ProductList from "@components/HomePage/ProductList";
import TrendingSearch from "@components/HomePage/TrendingSearch";
import UserReview from "@components/HomePage/UserReview";
import { BadgeCheck, Gift, Share2, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "@services/product.service";
import CouponsSection from "@components/HomePage/CouponsSection";
import reviewsService from "@services/reviews.service";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll({
          // accessToken,
          type: "All",
          limit: 8,
        });

        setProducts(data.metadata?.products || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

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

  const [topReviews, setTopReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const response = await reviewsService.getTopReviews();
        setTopReviews(response?.metadata);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };
    fetchTopReviews();
  }, []);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await productService.getRecommended({ accessToken });
        setRecommendedProducts(response?.metadata || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm đề xuất:", error);
      }
    };
    fetchRecommendedProducts();
  }, [accessToken]);

  return (
    <div className="bg-white">
      {/* carousel section */}
      <CarouselComponent />

      {/* feature section */}
      <FeatureCards features={features} />

      {/* trending search section */}
      <TrendingSearch />

      {/* coupons section */}
      <CouponsSection />

      {accessToken ? (
        <ProductList
          title="Sản phẩm dành cho bạn"
          products={recommendedProducts}
        />
      ) : (
        ""
      )}
      {/* product list section */}
      <ProductList title="Sản phẩm yêu thích nhất" products={products} />

      <ProductList title="Sản phẩm mới nhất" products={products} />

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

      <UserReview reviews={topReviews} />
    </div>
  );
}

export default HomePage;
