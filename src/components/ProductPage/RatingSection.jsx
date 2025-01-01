import { useState } from "react";
import { Button, Rate, Input, List, Avatar, Progress, Upload } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const fakeComments = [
  {
    id: 1,
    user: { fullname: "Nguyễn Văn A", avatar: "" },
    content: "Sản phẩm rất tốt, đáng giá tiền!",
    star: 5,
    createdAt: new Date().toISOString(),
    replies: [
      {
        content: "Cảm ơn bạn đã đánh giá!",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    user: { fullname: "Trần Thị B", avatar: "" },
    content: "Giao hàng nhanh, chất lượng ổn.",
    star: 4,
    createdAt: new Date().toISOString(),
    replies: [],
  },
];

function RatingSection() {
  const [ratingsData] = useState([0, 0, 0, 1, 1]); // Giả lập số lượng đánh giá
  const [averageRating] = useState(4.5); // Giả lập điểm trung bình
  const [totalRatings] = useState(2); // Giả lập tổng số đánh giá
  const [comments] = useState(fakeComments); // Giả lập bình luận
  const [visibleComments, setVisibleComments] = useState(5);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviewImages, setReviewImages] = useState([]); // Ảnh được tải lên

  const handleSubmit = () => {
    if (!rating || !review.trim()) {
      toast.error("Vui lòng chọn đánh giá và nhập nhận xét!");
      return;
    }
    toast.success("Đánh giá thành công!");
    setReview("");
    setRating(0);
    setReviewImages([]);
  };

  const handleImageUpload = ({ fileList }) => {
    const imageUrls = fileList.map((file) =>
      file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url
    );
    setReviewImages(imageUrls);
  };

  const handleRemoveImage = (url) => {
    const updatedImages = reviewImages.filter((img) => img !== url);
    setReviewImages(updatedImages);
  };

  const handleLoadMore = () => setVisibleComments((prev) => prev + 5);
  const handleShowLess = () => setVisibleComments(5);

  return (
    <div className="container mx-auto py-8 px-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">
        Đánh giá & Nhận xét sản phẩm
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-4xl font-extrabold text-gray-800">
            {averageRating}/5
          </span>
          <div className="mt-2">
            <Rate disabled allowHalf value={averageRating} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {totalRatings} đánh giá và nhận xét
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          {[...ratingsData].reverse().map((count, index) => {
            const starLevel = 5 - index;
            const percentage = totalRatings ? (count / totalRatings) * 100 : 0;

            return (
              <div key={starLevel} className="flex items-center mb-3">
                <span className="text-sm w-16 text-gray-600">
                  {starLevel} sao
                </span>
                <div className="flex-1 mx-3">
                  <Progress
                    percent={Math.round(percentage)}
                    showInfo={false}
                    strokeColor="#faad14"
                    trailColor="#e8e8e8"
                    style={{ height: "10px" }}
                  />
                </div>
                <span className="text-sm text-gray-600">{count} lượt</span>
              </div>
            );
          })}
        </div>
      </div>

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
          <Upload
            multiple
            listType="picture"
            onChange={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} className="bg-gray-100">
              Thêm ảnh
            </Button>
          </Upload>
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

      <List
        className="mt-8"
        dataSource={comments.slice(0, visibleComments)}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{comment.user.fullname[0]}</Avatar>}
              title={
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">
                    {comment.user.fullname}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              }
              description={
                <>
                  <Rate disabled value={comment.star} className="mb-2" />
                  <p className="text-gray-700">{comment.content}</p>
                </>
              }
            />
          </List.Item>
        )}
      />

      {comments.length > 5 && (
        <div className="mt-6 flex justify-center">
          {visibleComments < comments.length ? (
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
  );
}

export default RatingSection;
