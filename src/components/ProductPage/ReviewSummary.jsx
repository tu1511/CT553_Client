import { Progress, Rate } from "antd";

const ReviewSummary = ({ averageRating, totalRatings, ratingsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Hiển thị điểm trung bình */}
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

      {/* Hiển thị biểu đồ đánh giá */}
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
  );
};

export default ReviewSummary;
