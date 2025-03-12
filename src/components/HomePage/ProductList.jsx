import HeaderLine from "@components/common/HeaderLine";
import ProductCard from "@components/common/ProductCard";

// eslint-disable-next-line react/prop-types
function ProductList({ title = "", products = [] }) {
  const calculateAverageRating = (reviews = []) => {
    const validReviews = reviews.filter(
      (review) => review.rating !== null && review.rating !== undefined
    );
    if (validReviews.length === 0) return 0; // Mặc định 5 nếu không có rating hợp lệ
    const totalRating = validReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / validReviews.length;
  };

  return (
    <div className="container mx-auto px-8 py-6">
      <HeaderLine title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Hiển thị tối đa 4 sản phẩm */}
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product?.id}
            productLink={`/san-pham/${product?.slug}`}
            image={
              Array.isArray(product?.images) && product?.images.length > 0
                ? product?.images[0]?.image?.path
                : "https://via.placeholder.com/150"
            }
            name={product?.name || "Sản phẩm không có tên"}
            price={product?.variants?.[0]?.price}
            discountPercentage={product?.productDiscount[0]?.discountValue}
            ratings={calculateAverageRating(product?.reviews)}
            id={product?.id}
            buyed={product?.soldNumber || 0}
          />
        ))}
      </div>

      {/* <div className=" flex justify-center items-center mt-8">
        <button className="bg-white uppercase font-semibold border-black border-2 rounded-xl text-black hover:bg-black hover:text-white py-2 px-4 transition duration-300 ease-in-out">
          Xem tất cả {title}
        </button>
      </div> */}
    </div>
  );
}

export default ProductList;
