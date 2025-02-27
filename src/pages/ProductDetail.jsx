import Breadcrumbs from "@components/common/Breadcrumbs";
import HeaderLine from "@components/common/HeaderLine";
import ProductList from "@components/HomePage/ProductList";
import InfoSection from "@components/ProductPage/InfoSection";
import RatingSection from "@components/ProductPage/RatingSection";
import productService from "@services/product.service";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@redux/thunk/cartThunk";
import { toast } from "react-toastify";
import categoryService from "@services/category.service";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll({
          // accessToken,
          type: "All",
          limit: 4,
        });

        setProducts(data.metadata?.products || []);
        console.log("products", data.metadata?.products);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = (image) => {
    setCurrentImage(image?.image?.path);
  };
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuantity((prev) => prev + 1);
  const handleBuyNow = () => {
    alert(`Mua ngay ${quantity} sản phẩm!`);
    navigate("/dat-hang");
  };
  const handleAddToCart = () => {
    let discountPrice;
    if (!product.productDiscount || product.productDiscount.length === 0) {
      discountPrice = 0;
    } else {
      const { discountValue } = product.productDiscount[0];
      discountPrice = (selectedVariant.price * discountValue) / 100;
    }

    console.log("cartItem", {
      variant: selectedVariant,
      quantity: quantity,
      product: product,
      finalPricePerOne: selectedVariant.price - discountPrice,
    });

    dispatch(
      addToCart({
        data: {
          variant: selectedVariant,
          quantity: quantity,
          isChecked: true,
          product: product,
          finalPricePerOne: selectedVariant.price - discountPrice,
        },
      })
    );
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    productService.getOneBySlug({ slug }).then((data) => {
      setProduct(data?.metadata);
      console.log("product", data?.metadata);
      // Đặt mặc định variant đầu tiên
      if (data?.metadata?.variants?.length > 0) {
        console.log("variant", data?.metadata?.variants[0]);
        setSelectedVariant(data?.metadata?.variants[0]); // Mặc định chọn variant đầu tiên
      }
      if (data?.metadata?.images?.length > 0) {
        setCurrentImage(data.metadata.images[0].image.path);
      }
    });
  }, [slug]);

  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const fetchBreadcrumb = async () => {
      try {
        // console.log("cateogry", product.categories[0]?.categoryId);
        const response = await categoryService.getBreadcrumbFromCategory(
          product.categories[0]?.categoryId
        );
        // console.log(response);
        const res = response?.metadata || [];
        setBreadcrumb([
          { label: "Trang chủ", path: "/" },
          ...res.map((item) => ({
            label: item.name,
            path: item.slug,
          })),
          { label: product?.name, path: `/san-pham/slug/${product?.slug}` },
        ]);
      } catch (error) {
        console.error("Failed to fetch breadcrumb: ", error);
      }
    };
    fetchBreadcrumb();
  }, [product]);

  const discountPrice = product?.productDiscount[0]?.discountValue || 0;
  console.log("discountPrice", discountPrice);

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
              {product?.images.slice(0, 6).map((image, index) => (
                <img
                  key={index}
                  src={image?.image?.path}
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
                alt={product?.name}
                className="h-[76vh] w-[100%] rounded-lg border border-gray-300 object-cover"
              />
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-dashed border-black pb-2">
              {product?.name}
            </h1>
            <div className="flex space-x-6 items-center mb-4">
              <p className="text-lg text-gray-600 border-r-2 pr-4 border-gray-300">
                Loại sản phẩm:{" "}
                <span className="text-primary font-medium">
                  {product?.categories[0]?.category?.name}
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
                        index < Math.floor(product?.rating || 5)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>
                <p className="ml-2 text-gray-500">
                  ({product?.rating || 5} / 5 điểm đánh giá)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {selectedVariant ? (
                <p className="text-3xl font-bold text-primary">
                  {toVietnamCurrencyFormat(
                    selectedVariant.price -
                      selectedVariant.price * (discountPrice / 100)
                  )}
                </p>
              ) : (
                <p className="text-3xl font-bold text-primary">
                  {toVietnamCurrencyFormat(product?.price)}
                </p>
              )}
              {discountPrice > 0 && (
                <p className="text-lg text-gray-500 line-through italic">
                  {toVietnamCurrencyFormat(selectedVariant.price)}
                </p>
              )}
              {discountPrice > 0 && (
                <p className="text-sm border p-2 bg-primary rounded-xl font-bold text-white">
                  Giảm {discountPrice}%
                </p>
              )}
            </div>

            <div className="text-gray-700 leading-relaxed mb-6 font-normal italic">
              <p>{product?.overview}</p>
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
              <div>
                <label htmlFor="size" className="text-gray-700 font-medium">
                  Kích thước:
                </label>
                <select
                  id="size"
                  className="ml-2 border border-gray-300 rounded-lg py-2 px-3 focus:ring-primary focus:border-primary text-gray-800"
                  onChange={(e) => {
                    setSelectedVariantId(e.target.value);
                    setSelectedVariant(product.variants[e.target.value]);
                  }}
                  value={selectedVariantId}
                >
                  <option value="">Chọn size</option>
                  {product?.variants?.map((variant, index) => (
                    <option key={variant.id} value={index}>
                      {variant.size}
                    </option>
                  ))}
                </select>
              </div>
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
        <div className="container mx-auto px-10 w-[70%]">
          <div
            className="leading-relaxed  "
            dangerouslySetInnerHTML={{ __html: product?.description }}
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
                <span className="text-gray-600">
                  {product?.categories[0]?.category?.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <span className="font-semibold text-gray-700">Màu sắc:</span>
                <span className="text-gray-600">{product?.color}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">Chất liệu:</span>
                <span className="text-gray-600">{product?.material}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">Đá:</span>
                <span className="text-gray-600">{product?.stone}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <span className="font-semibold text-gray-700">Giới tính:</span>
                <span className="text-gray-600">{product?.gender}</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">
                  Độ hoàn thiện:
                </span>
                <span className="text-gray-600">{product?.completion}</span>
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
