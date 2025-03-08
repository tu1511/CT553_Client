import { useEffect, useState } from "react";
import { Button, Rate, Input, List, Avatar, Progress, Upload } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import HeaderLine from "@components/common/HeaderLine";
import reviewsService from "@services/reviews.service";
import { formatDateTime } from "@helpers/formatDateTime";
import ReviewSummary from "@components/ProductPage/ReviewSummary";
import uploadService from "@services/upload.service";
import { Form } from "react-router-dom";
import { Plus } from "lucide-react";

function RatingSection({ productId }) {
  const [ratingsData] = useState([0, 0, 0, 1, 1]); // Giả lập số lượng đánh giá
  const [averageRating] = useState(4.5); // Giả lập điểm trung bình
  const [totalRatings] = useState(2); // Giả lập tổng số đánh giá
  const [visibleComments, setVisibleComments] = useState(5);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviewImages, setReviewImages] = useState([]); // Ảnh được tải lên

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsService.getReviewByProductId(productId);
        setReviews(response.metadata?.reviews);
      } catch (error) {
        console.error("Failed to fetch reviews: ", error);
      }
    };

    fetchReviews();
  }, [productId]);

  console.log("reviews", reviews);

  const handleSubmit = () => {
    if (!rating || !review.trim()) {
      toast.error("Vui lòng chọn đánh giá và nhập nhận xét!");
      return;
    }

    const reviewData = {
      rating,
      comment: review,
      images: reviewImages,
      productId,
    };

    console.log("Dữ liệu đánh giá:", reviewData);

    toast.success("Đánh giá thành công!");
    setReview("");
    setRating(5);
    setReviewImages([]);
  };

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  console.log("fileList", fileList);

  const handleImageUpload = async ({ file, fileList: newFileList }) => {
    // Nếu file có trạng thái "removed", cập nhật lại fileList và form mà không gọi API.
    if (file.status === "removed") {
      setFileList(newFileList);
      form.setFieldsValue({
        uploadedImageIds: newFileList.map((f) => f.uid),
        images: newFileList,
      });
      return;
    }

    // Tách ra các file đã được upload và các file mới (có originFileObj)
    const alreadyUploaded = newFileList.filter((f) => !f.originFileObj);
    const toUpload = newFileList.filter((f) => f.originFileObj);

    // Nếu có file mới cần upload, tiến hành upload
    if (toUpload.length > 0) {
      // Kiểm tra loại file
      const filesToUpload = toUpload
        .map((f) => f.originFileObj)
        .filter(Boolean);
      if (filesToUpload.some((file) => !file.type.startsWith("image/"))) {
        return toast.error("Chỉ được phép tải lên ảnh!");
      }

      try {
        // Gọi API uploadImages với mảng các file mới
        const response = await uploadService.uploadImages(filesToUpload);
        if (response?.metadata) {
          const uploadedFiles = response.metadata.map((meta) => ({
            uid: meta.id,
            name: meta.filename || "image",
            url: meta.path,
          }));

          // Kết hợp file đã upload với file mới vừa upload
          const mergedFiles = [...alreadyUploaded, ...uploadedFiles];
          setFileList(mergedFiles);
          form.setFieldsValue({
            uploadedImageIds: mergedFiles.map((file) => file.uid),
            images: mergedFiles,
          });
          toast.success("Tải ảnh lên thành công");
        } else {
          toast.error("Lỗi khi tải ảnh lên");
        }
      } catch (error) {
        toast.error("Tải ảnh lên thất bại");
      }
    } else {
      // Nếu không có file mới cần upload, chỉ cập nhật fileList và form
      setFileList(newFileList);
      form.setFieldsValue({
        uploadedImageIds: newFileList.map((f) => f.uid),
        images: newFileList,
      });
    }
  };

  const handleRemoveImage = (url) => {
    const updatedImages = reviewImages.filter((img) => img !== url);
    setReviewImages(updatedImages);
  };

  const handleLoadMore = () => setVisibleComments((prev) => prev + 5);
  const handleShowLess = () => setVisibleComments(5);

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
            placeholder="Nhập nhận xét của bạn ở đây..."
            rows={4}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-4">
            <Form.Item label="Hình ảnh sản phẩm" name="uploadedImageIds">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false} // Ngăn upload tự động, xử lý theo API nếu cần
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
            </Form.Item>
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

          {reviewImages.length > 0 && (
            <div className="flex flex-wrap mt-4 gap-3">
              {reviewImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Ảnh ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <CloseCircleOutlined
                    className="absolute top-1 right-1 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveImage(img)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {reviews && reviews.length > 0 && (
          <List
            className="mt-8"
            dataSource={reviews.slice(0, visibleComments)}
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
                        <div className="mt-4 space-y-2">
                          {comment.replyByReview.map((reply, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg shadow-sm"
                            >
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
