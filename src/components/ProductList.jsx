import ProductCard from "@components/ProductCard";

// eslint-disable-next-line react/prop-types
function ProductList({ title = "", products = [] }) {
  return (
    <div className="container mx-auto px-8 py-6">
      <h2 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
        <span className="w-[30vw] border-t-2 border-black mr-4"></span>
        {title}
        <span className="w-[30vw] border-t-2 border-black ml-4"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Hiển thị tối đa 5 sản phẩm */}
        {products.slice(0, 5).map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discountPercentage={product.discountPercentage}
            ratings={product.ratings}
            id={product.id}
            buyed={product.buyed}
          />
        ))}
      </div>

      <div className=" flex justify-center items-center mt-8">
        <button className="bg-white uppercase font-semibold border-black border-2 rounded-xl text-black hover:bg-black hover:text-white py-2 px-4 transition duration-300 ease-in-out">
          Xem tất cả {title}
        </button>
      </div>
    </div>
  );
}

export default ProductList;
