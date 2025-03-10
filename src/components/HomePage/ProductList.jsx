import ProductCard from "@components/common/ProductCard";

// eslint-disable-next-line react/prop-types
function ProductList({ title = "", products = [] }) {
  return (
    <div className="container mx-auto px-8 py-6">
      <h2 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
        <span className="w-[30vw] border-t-2 border-black mr-4"></span>
        {title}
        <span className="w-[30vw] border-t-2 border-black ml-4"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Hiển thị tối đa 4 sản phẩm */}
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            productLink={`/san-pham/${product?.slug}`}
            image={
              Array.isArray(product.images) && product.images.length > 0
                ? product?.images[0]?.image?.path
                : "https://via.placeholder.com/150"
            }
            name={product.name || "Sản phẩm không có tên"}
            price={product?.variants?.[0]?.price}
            discountPercentage={product.discountPercentage || 10}
            ratings={product.ratings || 5}
            id={product.id}
            buyed={product.soldNumber || 0}
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
