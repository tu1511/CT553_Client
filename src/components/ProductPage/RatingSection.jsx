import { useEffect, useState, useCallback } from "react";
import { Button, Rate, Input, Upload, List, Avatar } from "antd";
import { toast } from "react-toastify";
import HeaderLine from "@components/common/HeaderLine";
import reviewsService from "@services/reviews.service";
import ReviewSummary from "@components/ProductPage/ReviewSummary";
import uploadService from "@services/upload.service";
import { Plus } from "lucide-react";
import { formatDateTime } from "@helpers/formatDateTime";
import { useLocation } from "react-router-dom";

function RatingSection({
  productId,
  reviews,
  totalRatings,
  averageRating,
  ratingsData,
}) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviewsProduct, setReviewsProduct] = useState(() => [...reviews]);
  useEffect(() => {
    setReviewsProduct([...reviews]);
  }, [reviews]);
  console.log("reviewsProduct", reviewsProduct);
  console.log("reviews", reviews);
  const [fileList, setFileList] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);

  const accessToken = localStorage.getItem("accessToken");

  const handleLoadMore = () => setVisibleComments((prev) => prev + 5);
  const handleShowLess = () => setVisibleComments(5);

  const location = useLocation();
  const selectedOrder = location.state?.order;

  console.log("Dữ liệu đơn hàng nhận được:", selectedOrder);

  const handleSubmit = async () => {
    if (!rating || !review.trim()) {
      return toast.error("Vui lòng chọn số sao và nhập nhận xét!");
    }

    const reviewData = {
      orderId: selectedOrder?.id,
      variantId: selectedOrder?.orderDetail[0]?.variantId,
      productId,
      rating,
      comment: review,
      uploadedImageIds: fileList.map((file) => file.uid) || [],
    };

    console.log("Dữ liệu đánh giá:", reviewData);

    try {
      await reviewsService.createReview(accessToken, reviewData);
      toast.success("Đánh giá của bạn đã được gửi thành công!");

      // Reset form sau khi gửi đánh giá
      setReview("");
      setRating(5);
      setFileList([]);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error?.data?.message);
      if (
        error?.data?.message ===
        "You have already reviewed this product for this order"
      ) {
        toast.error("Bạn đã đánh giá sản phẩm trong đơn hàng này rồi!");
      } else {
        toast.error("Vui lòng mua sản phẩm trước khi đánh giá!");
      }
    }

    // Refresh lại danh sách đánh giá
    const response = await reviewsService.getReviewByProductId(
      selectedOrder?.orderDetail[0]?.variant?.productId
    );
    setReviewsProduct(
      response.metadata?.reviews ? response.metadata.reviews : []
    );
  };

  const handleImageUpload = async ({ file, fileList: newFileList }) => {
    if (file.status === "removed") {
      setFileList(newFileList);
      return;
    }

    const toUpload = newFileList.filter((f) => f.originFileObj);
    if (!toUpload.length) return setFileList(newFileList);

    if (toUpload.some((file) => !file.type.startsWith("image/"))) {
      return toast.error("Chỉ được phép tải lên ảnh!");
    }

    try {
      const response = await uploadService.uploadImages(
        toUpload.map((f) => f.originFileObj)
      );
      if (response?.metadata) {
        const uploadedFiles = response.metadata.map((meta) => ({
          uid: meta.id,
          name: meta.filename || "image",
          url: meta.path,
        }));
        setFileList([
          ...newFileList.filter((f) => !f.originFileObj),
          ...uploadedFiles,
        ]);
        toast.success("Tải ảnh lên thành công");
      } else {
        toast.error("Lỗi khi tải ảnh lên");
      }
    } catch (error) {
      toast.error("Tải ảnh lên thất bại");
    }
  };

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <HeaderLine title="Đánh giá và nhận xét" />
        <ReviewSummary
          averageRating={averageRating}
          totalRatings={totalRatings}
          ratingsData={ratingsData}
        />
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-3 text-gray-800">
            Bạn đánh giá sao về sản phẩm này?
          </p>
          <Rate value={rating} onChange={setRating} className="mb-4" />
          <Input.TextArea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Nhập nhận xét..."
            rows={4}
            className="mb-4"
          />
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleImageUpload}
            multiple
          >
            {fileList.length >= 8 ? null : (
              <div>
                <Plus />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
          <div className="mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
            >
              Đánh giá ngay
            </Button>
          </div>
        </div>
        {reviewsProduct && reviewsProduct.length > 0 && (
          <List
            className="mt-8"
            dataSource={reviewsProduct.slice(0, visibleComments).reverse()}
            renderItem={(comment) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={comment?.account?.avatar?.path}>
                      {comment?.account?.fullName?.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">
                        {comment?.account?.fullName || "Người dùng ẩn danh"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {comment?.createdAt
                          ? formatDateTime(comment.createdAt)
                          : "Không xác định"}
                      </span>
                    </div>
                  }
                  description={
                    <>
                      <Rate
                        disabled
                        value={comment?.rating || 0}
                        className="mb-2"
                      />
                      <p className="text-gray-700">
                        <span className="font-semibold">Đánh giá: </span>
                        {comment?.comment || "Không có nội dung"}
                      </p>

                      {/* Hiển thị hình ảnh nếu có */}
                      {comment?.reviewImage?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {comment.reviewImage.map((img, index) => (
                            <img
                              key={index}
                              src={img?.image?.path}
                              alt="review"
                              className="w-40 h-40 object-cover rounded-lg shadow-md"
                            />
                          ))}
                        </div>
                      )}

                      {/* Hiển thị phản hồi bình luận nếu có */}
                      {comment?.replyByReview?.length > 0 && (
                        <div className="mt-4 space-y-2 p-3 bg-gray-100 rounded-lg shadow-sm">
                          {comment.replyByReview.map((reply, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Avatar
                                size={30}
                                src={reply?.account?.avatar?.path}
                              >
                                {reply?.account?.fullName?.charAt(0)}
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-gray-800">
                                    Quản trị viên
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {reply?.createdAt
                                      ? formatDateTime(reply.createdAt)
                                      : "Không xác định"}
                                  </span>
                                </div>
                                <p className="text-gray-700 mt-1">
                                  <span className="font-semibold">
                                    Phản hồi:{" "}
                                  </span>
                                  {reply?.comment}
                                </p>
                                {comment?.replyByReview[0]?.reviewImage
                                  ?.length > 0 && (
                                  <div className="flex gap-2 mt-2">
                                    {comment.replyByReview[0]?.reviewImage.map(
                                      (img, index) => (
                                        <img
                                          key={index}
                                          src={img?.image?.path}
                                          alt="review"
                                          className="w-40 h-40 object-cover rounded-lg shadow-md"
                                        />
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}

        {reviews.length > 5 && (
          <div className="mt-6 flex justify-center">
            {visibleComments < reviews.length ? (
              <Button onClick={handleLoadMore} type="link">
                Xem thêm
              </Button>
            ) : (
              <Button onClick={handleShowLess} type="link">
                Thu gọn
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RatingSection;
