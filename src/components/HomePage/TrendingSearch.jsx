import img1 from "/src/assets/category/vong-lac.png";
import img2 from "/src/assets/category/nhan.png";
import img3 from "/src/assets/category/day-chuyen.png";
import img4 from "/src/assets/category/bong-tai.png";
import img5 from "/src/assets/category/charm-pandora.png";
import img6 from "/src/assets/category/khuyen-xo.png";

const TrendingSearch = () => {
  const products = [
    { id: 1, name: "VÒNG - LẮC", image: img1 },
    { id: 2, name: "NHẪN", image: img2 },
    { id: 3, name: "DÂY CHUYỀN", image: img3 },
    { id: 4, name: "BÔNG TAI", image: img4 },
    { id: 5, name: "CHARM PANDORA", image: img5 },
    { id: 6, name: "KHUYÊN XỎ", image: img6 },
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="flex items-center justify-center uppercase text-3xl font-semibold mb-6">
        <span className="w-[30vw] border-t-2 border-black mr-4"></span>
        XU HƯỚNG TÌM KIẾM
        <span className="w-[30vw] border-t-2 border-black ml-4"></span>
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="text-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-56 h-56 border-2 object-cover rounded-lg"
            />
            <p className="mt-3 text-sm font-semibold">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearch;
