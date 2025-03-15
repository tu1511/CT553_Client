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
  const hasDiscount = discountPercentage > 0;
  const discountPrice = hasDiscount
    ? price - (price * discountPercentage) / 100
    : price;

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const productIds = cart.map((product) => product?.product?.id);

  // Hàm lưu sản phẩm vào danh sách đã xem
  const handleViewProduct = () => {
    const viewedProduct = {
      id,
      name,
      image,
      price: discountPrice,
      productLink,
      ratings,
      buyed,
      discountPercentage,
    };
    const storedViewed =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];

    // Kiểm tra sản phẩm đã tồn tại trong danh sách chưa
    const isAlreadyViewed = storedViewed.some((product) => product.id === id);

    if (!isAlreadyViewed) {
      const updatedViewed = [viewedProduct, ...storedViewed].slice(0, 10); // Giữ tối đa 10 sản phẩm
      localStorage.setItem("viewedProducts", JSON.stringify(updatedViewed));
    }
  };

  return (
    <Link
      to={productLink}
      onClick={handleViewProduct}
      className="max-w-sm bg-white rounded-lg shadow-lg dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300 ease-in-out relative"
    >
      {/* Chỉ hiển thị nếu có giảm giá */}
      {hasDiscount && (
        <div className="absolute top-4 right-2 bg-red-500 text-white py-1 px-3 rounded-lg font-bold text-sm z-50">
          -{discountPercentage}%
        </div>
      )}

      {/* Hình ảnh sản phẩm */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:brightness-110 brightness-105"
          src={image}
          alt={name}
        />
      </div>

      {/* Nội dung sản phẩm */}
      <div className="px-2 py-4 flex flex-col">
        {/* Tên sản phẩm */}
        <h5
          className="mb-2 text-lg line-clamp-2 font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors duration-300 h-[50px]"
          title={name} // Hiển thị tooltip khi hover để xem toàn bộ tên
        >
          {name}
        </h5>

        {/* Giá sản phẩm */}
        <div className="flex items-center space-x-2 mb-2">
          {hasDiscount && (
            <p className="text-lg font-semibold italic text-gray-700 dark:text-gray-400 line-through">
              {toVietnamCurrencyFormat(price)}
            </p>
          )}
          <p
            className={`text-lg font-semibold ${
              hasDiscount ? "text-primary" : "text-primary dark:text-white"
            }`}
          >
            {toVietnamCurrencyFormat(discountPrice)}
          </p>
        </div>

        {/* Đánh giá */}
        <div className="flex items-center space-x-1 mb-4">
          <Rate disabled allowHalf defaultValue={ratings} />
        </div>

        {/* Thêm vào giỏ hàng và các nút hành động */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            Đã bán: {buyed}
          </span>
          {
            // Nếu sản phẩm đã có trong giỏ hàng thì ẩn nút thêm vào giỏ hàng
            productIds.includes(id) ? (
              <ShoppingCart
                size={24}
                className="cursor-pointers transition-colors duration-300 text-primary"
              />
            ) : (
              <ShoppingCart
                size={24}
                className="cursor-pointer text-gray-700 dark:text-gray-400 hover:text-primary transition-colors duration-300"
              />
            )
          }
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
