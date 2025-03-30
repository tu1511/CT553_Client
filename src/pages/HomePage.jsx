import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Gift, Share2, ThumbsUp } from "lucide-react";
import CarouselComponent from "@components/HomePage/CarouselComponent";
import FeatureCards from "@components/common/FeatureCards";
import ProductList from "@components/HomePage/ProductList";
import TrendingSearch from "@components/HomePage/TrendingSearch";
import UserReview from "@components/HomePage/UserReview";
import CouponsSection from "@components/HomePage/CouponsSection";
import productService from "@services/product.service";
import reviewsService from "@services/reviews.service";
import orderService from "@services/order.service";

function HomePage() {
  const [orders, setOrders] = useState([]);
  const [topReviews, setTopReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderPromise = accessToken
          ? orderService.getOrderByBuyId(accessToken, 0, 1000)
          : Promise.resolve({ metadata: { orders: [] } });
        const newestProductsPromise = productService.getAll({
          type: "Newest",
          limit: 8,
        });
        const trendingProductsPromise = productService.getAll({
          type: "Trending",
          limit: 8,
        });
        const saleProductsPromise = productService.getAll({
          type: "Sales",
          limit: 8,
        });
        const topReviewsPromise = reviewsService.getTopReviews();
        const recommendedProductsPromise = accessToken
          ? productService.getRecommended({ accessToken })
          : Promise.resolve({ metadata: [] });

        const [
          orderRes,
          newProductsRes,
          trendingProductsRes,
          topReviewsRes,
          recommendedRes,
          saleProductsRes,
        ] = await Promise.all([
          orderPromise,
          newestProductsPromise,
          trendingProductsPromise,
          topReviewsPromise,
          recommendedProductsPromise,
          saleProductsPromise,
        ]);

        setOrders(orderRes.metadata?.orders || []);
        setNewProducts(newProductsRes.metadata?.products || []);
        setTrendingProducts(trendingProductsRes.metadata?.products || []);
        setTopReviews(topReviewsRes?.metadata || []);
        setRecommendedProducts(recommendedRes?.metadata || []);
        setSaleProducts(saleProductsRes.metadata?.products || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const recommendedProductsHehe = recommendedProducts.filter(
    (product) => product !== null
  );

  return (
    <div className="bg-white">
      <CarouselComponent />
      <FeatureCards features={features} />
      {/* <TrendingSearch /> */}
      <CouponsSection />

      {accessToken && orders.length > 0 ? (
        <ProductList
          title="Sản phẩm dành cho bạn"
          products={recommendedProductsHehe}
        />
      ) : (
        ""
      )}
      <ProductList title="Sản phẩm mới nhất" products={newProducts} />
      <ProductList title="Sản phẩm nổi bật" products={trendingProducts} />
      <ProductList title="Sản phẩm đang khuyến mãi " products={saleProducts} />

      <section
        className="mt-4 relative w-full h-[250px] bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/banner/hero.png')` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center md:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
            Silver Charm - Trang Sức Cao Cấp
          </h1>
          <p className="text-sm md:text-lg text-black max-w-3xl leading-relaxed mb-6">
            Đến với Silver Charm, trang sức không chỉ là một phụ kiện - đó là
            hiện thân của niềm đam mê, tình yêu của chúng tôi, và cuối cùng, là
            món quà của Silver Charm dành cho bạn.
          </p>
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
