import { Rate } from "antd";
import { toVietnamCurrencyFormat } from "../../helpers/ConvertCurrency";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProductCard({
  image,
  name,
  price,
  discountPercentage,
  ratings,
  productLink,
  id,
  buyed,
}) {
  const discountPrice = price - (price * discountPercentage) / 100;

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
      {/* Phần trăm giảm */}
      <div className="absolute top-4 right-2 bg-red-500 text-white py-1 px-3 rounded-lg font-bold text-sm z-50">
        -{discountPercentage}%
      </div>

      {/* Hình ảnh sản phẩm */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:brightness-110 brightness-105"
          src={image}
          alt={name}
        />
      </div>

      {/* Nội dung sản phẩm */}
      <Link to={productLink} className="px-2 py-4 flex flex-col">
        {/* Tên sản phẩm */}
        <h5
          className="mb-2 text-lg line-clamp-2 font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors duration-300 h-[50px]"
          title={name} // Hiển thị tooltip khi hover để xem toàn bộ tên
        >
          {name}
        </h5>

        {/* Giá sản phẩm */}
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-lg font-semibold italic text-gray-700 dark:text-gray-400 line-through">
            {toVietnamCurrencyFormat(price)}
          </p>
          <p className="text-lg font-semibold text-red-600">
            {toVietnamCurrencyFormat(discountPrice)}
          </p>
        </div>

        {/* Đánh giá */}
        <div className="flex items-center space-x-1 mb-4">
          <Rate disabled defaultValue={ratings} />
        </div>

        {/* Thêm vào giỏ hàng và các nút hành động */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            Đã bán: {buyed}
          </span>
          <ShoppingCart
            size={24}
            className="cursor-pointer text-gray-700 dark:text-gray-400 hover:text-primary transition-colors duration-300"
          />
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
