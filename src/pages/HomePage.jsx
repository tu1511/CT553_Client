import CarouselComponent from "@components/CarouselComponent";
import FeatureCards from "@components/FeatureCards";
import ProductList from "@components/ProductList";
import TrendingSearch from "@components/TrendingSearch";

function HomePage() {
  return (
    <div className="bg-white">
      {/* carousel section */}
      <CarouselComponent />

      {/* feature section */}
      <FeatureCards />

      {/* trending search section */}
      <TrendingSearch />

      {/* product list section */}
      <ProductList title="Sản phẩm yêu thích nhất" />
      <ProductList title="Sản phẩm mới nhất" />

      {/* Contact section */}
      <section className="contact py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Liên hệ</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            chúng tôi để cùng nhau thực hiện các dự án vì một môi trường xanh.
          </p>
          <button className="btn btn-primary py-4 px-8 text-lg rounded-lg shadow-xl hover:bg-green-600 transition ease-in-out duration-300 transform hover:scale-105">
            Gửi yêu cầu
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
