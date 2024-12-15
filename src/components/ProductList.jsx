import ProductCard from "@components/ProductCard";

function ProductList({ title = "Sản phẩm yêu thích nhất" }) {
  // Tiêu đề tự động điều chỉnh
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
        "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
      name: "Nhẫn bạc đẹp",
      price: 500000, // Giá gốc
      discountPercentage: 10, // Phần trăm giảm
      ratings: 5, // Số sao đánh giá (1 đến 5)
      buyed: 5, // Số lượng đã bán
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "Dây chuyền bạc thời trang",
      price: 1500000, // Giá gốc
      discountPercentage: 15, // Phần trăm giảm
      ratings: 3, // Số sao đánh giá (1 đến 5)
      buyed: 3, // Số lượng đã bán
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      name: "Nhẫn bạc thời trang",
      price: 600000, // Giá gốc
      discountPercentage: 25, // Phần trăm giảm
      ratings: 4, // Số sao đánh giá (1 đến 5)
      buyed: 7, // Số lượng đã bán
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
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

  return (
    <div className="container mx-auto p-8">
      <h2 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
        <span className="w-[30vw] border-t-2 border-black mr-4"></span>
        {title}
        <span className="w-[30vw] border-t-2 border-black ml-4"></span>
      </h2>
      {/* Tiêu đề tự động điều chỉnh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {" "}
        {/* Số cột thay đổi */}
        {products.slice(0, 5).map(
          (
            product // Hiển thị tối đa 5 sản phẩm
          ) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              discountPercentage={product.discountPercentage} // Truyền phần trăm giảm
              ratings={product.ratings}
              id={product.id}
              buyed={product.buyed} // Truyền số lượng đã bán
            />
          )
        )}
      </div>
    </div>
  );
}

export default ProductList;
