import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { Rate } from "antd";
import { Star } from "lucide-react";
import React, { useState } from "react";

// Dữ liệu mới
const productData = {
  productName: "Dây chuyền bạc nữ khắc tên hình trái tim DCN0460",
  productImagePath: [
    "https://tnj.vn/16938-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
    "https://tnj.vn/16939-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
    "https://tnj.vn/16940-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
    "https://tnj.vn/16936-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
    "https://tnj.vn/16941-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
    "https://tnj.vn/11492-small_default/day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.jpg",
  ],
  price: "480000",
  productType: "Dây chuyền bạc nữ",
  sold_number: 0,
  discountPrice: 10,
  rating: 0,
  reviews: [],
  overview: `
    <ul style="list-style-type:circle;">
      <li>Dây chuyền bạc nữ khắc tên chất liệu bạc cao cấp 925</li>
      <li>Thiết kế tinh xảo trên công nghệ 3D tiên tiến</li>
      <li>Bảo hành miễn phí trọn đời đánh bóng làm mới hoặc rơi đá</li>
      <li>Kiểu dáng trẻ trung thời trang</li>
    </ul>
  `,
  description:
    '<h2 class="product-description__title">Giới thiệu sản phẩm dây chuyền bạc&nbsp;nữ khắc tên hình trái tim&nbsp;DCN0460</h2>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;"><span style="font-weight:bolder;height:auto;">&nbsp;- Dây chuyền bạc khắc tên hình trái tim</span><span style="height:auto;font-weight:bolder;"><span style="font-weight:bolder;height:auto;"><span><span style="font-size:14px;font-weight:bolder;"><span><span style="font-size:14px;font-weight:bolder;"><span><span><b>&nbsp;DCN0460</b></span><span style="font-size:14px;font-weight:bolder;">&nbsp;</span></span></span></span></span></span></span><span><span style="font-size:14px;font-weight:bolder;">được khách hàng lựa chọn nhiều nhất</span></span></span></p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">&nbsp;&nbsp;<span style="text-decoration:underline;"><em><strong><a href="https://tnj.vn/16-day-chuyen-bac-nu">Dây chuyền bạc nữ</a></strong></em></span>&nbsp;khắc tên hình trái tim được thiết kế cách điệu được khắc tên theo yêu cầu cực HOT&nbsp;- sản phẩm độc quyền bởi Trang Sức TNJ</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">&nbsp;- Bộ sản phẩm: 1&nbsp;dây + mặt sản phẩm</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">&nbsp;- Đóng gói: sản phẩm có hộp đựng sang trọng đi kèm</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">&nbsp;-&nbsp;Dây chuyền bạc nữ khắc&nbsp;tên hình trái tim DCN0460 biểu tượng cho tình yêu vĩnh cửu và mãi mãi rất phù hợp để làm quà tặng cho dịp lễ tết Valentine, 20/10, Noel,... sắp tới</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;"></p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;"><span style="height:auto;font-weight:bolder;">- Thông tin chi tiết về sản phẩm:</span></p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Chất liệu <strong><a href="https://tnj.vn/tin-tuc/bac-925-la-gi.html">Bạc cao cấp 925</a></strong>. Độ trắng sáng cao, không lo bị đen, xỉn màu.</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">&nbsp;Chất liệu bạc 925: 92,5% bạc nguyên chất phần còn lại là hợp chất làm tăng độ cứng và sáng bóng cho sản phẩm.</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Giá trên là giá cho 1&nbsp;dây kèm mặt</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Khắc tên hoặc ngày tháng miễn phí theo yêu cầu</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Dây chuyền dài 45cm có thể cắt ngắn hoặc nối dài dây theo yêu cầu</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Giao hàng toàn quốc và thanh toán khi nhận được hàng</p>\n<p style="margin-top:0px;font-size:14px;color:#666666;line-height:24px;text-align:justify;height:auto;font-family:Montserrat, sans-serif;">❄ Hoàn tiền 200% nếu không đúng mẫu mã và chất lượng</p>\n<h2 class="product-description__title">Hình ảnh chi tiết&nbsp;<a href="https://tnj.vn/day-chuyen-bac-nu/957-day-chuyen-bac-nu-khac-ten-hinh-trai-tim-dcn0460.html">dây chuyền bạc nữ khắc tên hình trái tim&nbsp;DCN0460</a></h2>\n<p style="text-align:center;"><img src="https://tnj.vn/img/cms/day-chuyen-kem-mat-nu/DCN0460-1/day-chuyen-bac-nu-khac-ten-theo-yeu-cau-DCN0460-1.jpg" alt="Dây chuyền bạc nữ khắc tên hình trái tim DCN0460" width="900" height="900"></p>\n<h3 style="text-align:center;">&nbsp;Dây chuyền bạc nữ được làm từ chất liệu bạc cao cấp 925</h3>\n<p><img src="https://tnj.vn/img/cms/day-chuyen-kem-mat-nu/DCN0460-1/day-chuyen-bac-nu-khac-ten-theo-yeu-cau-DCN0460-3.jpg" alt="Dây chuyền bạc nữ khắc tên hình trái tim DCN0460" width="900" height="900"></p>\n<h3 style="text-align:center;">Dây chuyền bạc nữ khắc tên hình trái&nbsp;tim DCN0460</h3>\n<p style="text-align:center;"><img src="https://tnj.vn/img/cms/day-chuyen-kem-mat-nu/DCN0460-1/day-chuyen-bac-nu-khac-ten-theo-yeu-cau-DCN0460-7.jpg" alt="Dây chuyền bạc nữ khắc tên hình trái tim DCN0460" width="900" height="900"></p>\n<p style="text-align:center;"><img src="https://tnj.vn/img/cms/day-chuyen-kem-mat-nu/DCN0460-1/day-chuyen-bac-nu-khac-ten-theo-yeu-cau-DCN0460.jpg" alt="Dây chuyền bạc nữ khắc tên hình trái tim DCN0460" width="900" height="900"></p>\n<h3 style="text-align:center;">Hình ảnh cụ thể sản phẩm dây chuyền bạc nữ khắc tên hình trái tim DCN0460 khi đeo trên cổ</h3>\n<h2><strong>Tại sao bạn nên mua dây chuyền bạc nữ khắc tên tại&nbsp;Trang Sức TNJ</strong></h2>\n<p><strong><img src="https://tnj.vn/img/cms/tai-sao-mua-hang-tai-tnj-1.png" alt="Tại sao nên mua nhẫn đôi bạc trang sức tnj" style="margin-left:auto;margin-right:auto;" width="900" height="900"></strong></p>\n<h2><strong><strong>Quy trình thiết kế và sản xuất dây chuyền bạc nữ khắc tên tại Trang Sức TNJ</strong></strong></h2>\n<p><span style="text-decoration:underline;"><em><strong><a href="https://tnj.vn/16-day-chuyen-bac-nu">Dây chuyền bạc nữ</a></strong></em></span>&nbsp;khắc tên hình trái tim DCN0460 được thiết kế với quy trình khép kín với máy móc hiện đại cùng đội ngũ thợ kim hoàn lành nghề có nhiều năm kinh nghiệm đam mê với nghề</p>\n<p><iframe width="900" height="506" src="https://www.youtube.com/embed/Wm8to68EPRw" frameborder="0"></iframe></p>\n<h3 style="text-align:center;">Trang Sức TNJ trong bản tin Chào Buổi Sáng của truyền hình quốc gia trên VTV1</h3>\n<p><img src="https://tnj.vn/img/cms/quy-trinh-san-xuat-trang-suc-tnj-12.png" alt="xưởng tnj" width="870" height="870"></p>\n<p><img src="https://tnj.vn/img/cms/khac-ten-theo-yeu-cau-tren-cong-nghe-laser-hien-dai-1%20.jpg" alt="khắc tên trên công nghệ laser hiện đại" width="870" height="870"></p>\n<p><img src="https://tnj.vn/img/cms/anh-cua-hang-trang-suc-TNJ1-1.jpg" alt="anh-cua-hang-trang-suc-tnj" style="margin-left:auto;margin-right:auto;" width="900" height="506"></p>\n<p><img src="https://tnj.vn/img/cms/anh-cua-hang-trang-suc-TNJ1.jpg" alt="anh-cua-hang-trang-suc-tnj" style="margin-left:auto;margin-right:auto;" width="900" height="506"></p>\n<h2>Hộp đựng sản phẩm sang trọng đi kèm&nbsp;&nbsp;</h2>\n<p><img src="https://tnj.vn/img/cms/hop-dung-san-pham-trang-suc-tnj.jpg" alt="hộp đựng sản phẩm trang sức tnj" width="900" height="506"></p>\n<p><strong>Dây chuyền bạc nữ&nbsp;khắc tên</strong>&nbsp;<strong>hình trái tim DCN0460</strong> chắc chắn sẽ làm bạn hài lòng. Liên hệ ngay với TNJ &nbsp;qua Hotline/Zalo: 0976827283 - 0979238755 để sở hữu ngay sản phẩm đầy ý nghĩa này nhé!</p>\n<p>Địa chỉ: Số 193 Khương Trung - Thanh Xuân - Hà Nội</p>\n<p style="text-align:left;"></p>\n<p></p>\n<p></p>\n<p></p>',
};

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(
    productData.productImagePath[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (image) => setCurrentImage(image);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuantity((prev) => prev + 1);
  const handleBuyNow = () => alert("Mua ngay!");
  const handleAddToCart = () => alert("Thêm vào giỏ hàng!");

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Product top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col items-center p-2">
            <img
              src={currentImage}
              alt={productData.productName}
              className="w-96 h-96 object-contain"
            />
            <div className="flex space-x-4 mt-4 overflow-x-auto no-scrollbar">
              {productData.productImagePath.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={`w-20 h-24 cursor-pointer object-contain border rounded-lg ${
                    currentImage === image
                      ? "border-primary"
                      : "border-gray-300"
                  } hover:border-primary`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{productData.productName}</h1>
          <p className="mb-2">
            Loại sản phẩm:{" "}
            <span className="text-primary">{productData.productType}</span>
          </p>
          <div className="flex items-center space-x-1 mb-4">
            Đánh giá: {productData.rating}{" "}
            <Star size={20} className="text-yellow-400" /> / 1 lượt đánh giá
          </div>
          <div className="flex items-center gap-3 mb-1">
            {/* Kiểm tra có giảm giá không */}
            {productData.discountPrice > 0 ? (
              <>
                <p className="text-2xl font-bold text-primary">
                  {toVietnamCurrencyFormat(
                    productData.price -
                      (productData.price * productData.discountPrice) / 100
                  )}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  {toVietnamCurrencyFormat(productData.price)}
                </p>
                <p>-{productData.discountPrice}%</p>
              </>
            ) : (
              <p className="text-2xl font-bold text-primary">
                {toVietnamCurrencyFormat(productData.price)}
              </p>
            )}
          </div>

          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: productData.overview }}
          ></div>
          {/* Quantity */}
          <div className="flex items-center mt-5">
            <button
              className="bg-primary text-white py-2 px-3 rounded-full"
              onClick={decrement}
            >
              -
            </button>
            <span className="w-16 text-center border mx-1 py-2">
              {quantity}
            </span>
            <button
              className="bg-primary text-white py-2 px-3 rounded-full"
              onClick={increment}
            >
              +
            </button>
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row mt-4 gap-2">
            <button
              className="bg-primary text-white py-3 rounded-lg w-full"
              onClick={handleBuyNow}
            >
              MUA NGAY
            </button>
            <button
              className="bg-orange-500 text-white py-3 rounded-lg w-full"
              onClick={handleAddToCart}
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
      </div>
      {/* Product bottom */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Thông tin sản phẩm</h2>
        <div
          className="mt-4 text-gray-700 w-[50vw]"
          dangerouslySetInnerHTML={{ __html: productData.description }}
        ></div>
      </div>
    </div>
  );
};

export default ProductDetail;
