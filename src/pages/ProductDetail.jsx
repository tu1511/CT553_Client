import Breadcrumbs from "@components/common/Breadcrumbs";
import HeaderLine from "@components/common/HeaderLine";
import ProductList from "@components/HomePage/ProductList";
import InfoSection from "@components/ProductPage/InfoSection";
import RatingSection from "@components/ProductPage/RatingSection";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";

import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dữ liệu mới
const productData = {
  productName:
    "Vòng cổ bạc nữ đẹp và độc đính pha lê Swarovski hình trái tim LILI_972812",
  price: "1194000",
  overview:
    "Bạn có đang tìm kiếm một món trang sức tinh tế và sang trọng? Dây chuyền bạc trái tim pha lê Swarovski LILI_972812 được thiết kế nhằm thỏa mãn yêu cầu đó. Thử tưởng tượng bạn diện em nó ra ngoài đi chơi, đi làm hay đi hẹn hò, đảm bảo bạn sẽ thêm phần xinh đẹp và thu hút đó. Sản phẩm được làm từ bạc 92.5% nguyên chất, đính viên pha lê Swarovski hình trái tim cao cấp và nhiều viên Cubic Zirconia lấp lánh, được chế tác tỉ mỉ và công phu bởi những nghệ nhân lành nghề. Sẽ không bất ngờ khi sự xinh xắn, đáng yêu của bạn thu hút mọi người xung quanh đâu nhé !!",
  productImagePath: [
    "https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1-400x400.jpg",
    "https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4-400x400.jpg",
    "https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3-400x400.jpg",
    "https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5-400x400.jpg",
    "https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2-400x400.jpg",
  ],
  sold_number: 0,
  discountPrice: 10,
  rating: 0,
  reviews: [],
  description:
    '<div class="elementor-widget-container"><p><img loading="lazy" decoding="async" class="img-border-15px aligncenter wp-image-46994 size-full" src="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3.jpg" alt="Nhẫn Bạc Nữ đính Kim Cương Moissanite Elfleda LILI 564974 3" width="800" height="800" srcset="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3.jpg 800w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3-400x400.jpg 400w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3-150x150.jpg 150w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_3-768x768.jpg 768w" sizes="auto, (max-width: 800px) 100vw, 800px"></p><p><img loading="lazy" decoding="async" class="img-border-15px aligncenter wp-image-46995 size-full" src="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4.jpg" alt="Nhẫn Bạc Nữ đính Kim Cương Moissanite Elfleda LILI 564974 4" width="800" height="800" srcset="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4.jpg 800w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4-400x400.jpg 400w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4-150x150.jpg 150w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_4-768x768.jpg 768w" sizes="auto, (max-width: 800px) 100vw, 800px"></p><p><img loading="lazy" decoding="async" class="img-border-15px aligncenter wp-image-46996 size-full" src="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5.jpg" alt="Nhẫn Bạc Nữ đính Kim Cương Moissanite Elfleda LILI 564974 5" width="800" height="800" srcset="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5.jpg 800w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5-400x400.jpg 400w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5-150x150.jpg 150w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_5-768x768.jpg 768w" sizes="auto, (max-width: 800px) 100vw, 800px"></p><p><img loading="lazy" decoding="async" class="img-border-15px aligncenter wp-image-46993 size-full" src="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2.jpg" alt="Nhẫn Bạc Nữ đính Kim Cương Moissanite Elfleda LILI 564974 2" width="800" height="800" srcset="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2.jpg 800w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2-400x400.jpg 400w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2-150x150.jpg 150w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_2-768x768.jpg 768w" sizes="auto, (max-width: 800px) 100vw, 800px"></p><p><img loading="lazy" decoding="async" class="img-border-15px aligncenter wp-image-46992 size-full" src="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1.jpg" alt="Nhẫn Bạc Nữ đính Kim Cương Moissanite Elfleda LILI 564974 1" width="800" height="800" srcset="https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1.jpg 800w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1-400x400.jpg 400w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1-150x150.jpg 150w, https://lili.vn/wp-content/uploads/2022/07/Nhan-bac-nu-dinh-kim-cuong-Moissanite-Elfleda-LILI_564974_1-768x768.jpg 768w" sizes="auto, (max-width: 800px) 100vw, 800px"></p></div>',
  category: "Dây chuyền",
  color: "Bạc và pha lê xanh dương/xanh dương tím/vàng/vàng xanh lá",
  material: "Bạc 925",
  stone: "Pha lê Swarovski, Cubic Zirconia",
  gender: "Nữ",
  completion: "Xuất sắc",
};

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
];

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(
    productData.productImagePath[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const navigate = useNavigate();

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    alert(`Kích thước được chọn: ${size}`);
  };

  const handleImageClick = (image) => setCurrentImage(image);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuantity((prev) => prev + 1);
  const handleBuyNow = () => {
    alert(`Mua ngay ${quantity} sản phẩm!`);
    navigate("/dat-hang");
  };
  const handleAddToCart = () => alert("Thêm vào giỏ hàng!");

  // const sizes = ["S", "M", "L", "XL"];

  const breadcrumb = [
    { label: "Trang chủ", path: "/" },
    { label: "Dây chuyền", path: "/day-chuyen" },
    { label: productData.productName, path: `/san-pham/${productData.id}` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumb} />
      <div className="container mx-auto px-8 pb-6">
        {/* Product top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10">
          {/* Hình ảnh sản phẩm */}
          <div className="flex items-start space-x-8">
            {/* Hình nhỏ nằm bên trái */}
            <div className="flex flex-col space-y-4 overflow-y-auto scrollbar-hide">
              {productData.productImagePath.slice(0, 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hình ${index + 1}`}
                  className={`w-20 h-20 cursor-pointer object-cover border rounded-lg ${
                    currentImage === image
                      ? "border-primary"
                      : "border-gray-300"
                  } hover:border-primary transition duration-200`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>

            {/* Hình lớn nằm bên phải */}
            <div>
              <img
                src={currentImage}
                alt={productData.productName}
                className="h-[76vh] w-[100%] rounded-lg border border-gray-300 object-cover"
              />
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-dashed border-black pb-2">
              {productData.productName}
            </h1>
            <div className="flex space-x-6 items-center mb-4">
              <p className="text-lg text-gray-600 border-r-2 pr-4 border-gray-300">
                Loại sản phẩm:{" "}
                <span className="text-primary font-medium">
                  {productData.category}
                </span>
              </p>
              <div className="flex items-center">
                <p className="text-lg text-gray-600">Đánh giá:</p>
                <span className="ml-2 flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={`${
                        index < Math.floor(productData.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>
                <p className="ml-2 text-gray-500">
                  ({productData.rating} / 5 điểm đánh giá)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {productData.discountPrice > 0 ? (
                <>
                  <p className="text-3xl font-bold text-primary">
                    {toVietnamCurrencyFormat(
                      productData.price -
                        (productData.price * productData.discountPrice) / 100
                    )}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    {toVietnamCurrencyFormat(productData.price)}
                  </p>
                  <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-bold">
                    -{productData.discountPrice}%
                  </span>
                </>
              ) : (
                <p className="text-3xl font-bold text-primary">
                  {toVietnamCurrencyFormat(productData.price)}
                </p>
              )}
            </div>

            <div className="text-gray-700 leading-relaxed mb-6 font-normal italic">
              <p>{productData.overview}</p>
            </div>

            {/* Chọn số lượng và kích thước */}
            <div className="flex flex-wrap gap-6 items-center mb-6">
              {/* Số lượng */}
              <div className="flex items-center gap-2">
                <button
                  className="bg-primary text-white px-3 py-2 rounded-full hover:bg-primary-dark shadow transition"
                  onClick={decrement}
                >
                  -
                </button>
                <span className="w-20 text-center border border-gray-300 py-2 rounded-lg text-gray-800">
                  {quantity}
                </span>
                <button
                  className="bg-primary text-white px-3 py-2 rounded-full hover:bg-primary-dark shadow transition"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              {/* Kích thước */}
              {/* <div>
                <label htmlFor="size" className="text-gray-700 font-medium">
                  Kích thước:
                </label>
                <select
                  id="size"
                  className="ml-2 border border-gray-300 rounded-lg py-2 px-3 focus:ring-primary focus:border-primary text-gray-800"
                >
                  <option value="">Chọn size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>

            {/* Hành động */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Nút "MUA NGAY" */}
              <button
                className="bg-primary text-white py-3 px-8 rounded-lg shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-300 ease-in-out w-full sm:w-auto"
                onClick={handleBuyNow}
              >
                MUA NGAY
              </button>

              {/* Nút "THÊM VÀO GIỎ HÀNG" */}
              <button
                className="bg-white uppercase font-semibold border-2 border-gray-800 text-gray-800 rounded-lg py-3 px-8 hover:bg-gray-800 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out w-full sm:w-auto"
                onClick={handleAddToCart}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mt-10 ">
          <HeaderLine title="Mô tả sản phẩm" />
        </div>
        <div className="container mx-auto px-8 w-[80%]">
          <div
            className="leading-relaxed  "
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-6">
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <HeaderLine title="Thông số sản phẩm" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">Loại:</span>
                <span className="text-gray-600">{productData.category}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <span className="font-semibold text-gray-700">Màu sắc:</span>
                <span className="text-gray-600">{productData.color}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">Chất liệu:</span>
                <span className="text-gray-600">{productData.material}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">Đá:</span>
                <span className="text-gray-600">{productData.stone}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <span className="font-semibold text-gray-700">Giới tính:</span>
                <span className="text-gray-600">{productData.gender}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">
                  Độ hoàn thiện:
                </span>
                <span className="text-gray-600">{productData.completion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RatingSection />

      <ProductList title="Sản phẩm tương tự" products={products} />

      <InfoSection />
    </>
  );
};

export default ProductDetail;
