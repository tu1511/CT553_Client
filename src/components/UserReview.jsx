import { Rate } from "antd";
import moment from "moment";

// eslint-disable-next-line react/prop-types
function UserReview({ reviews }) {
  return (
    <div className="container mx-auto py-8 px-6 md:px-8 ">
      <h2 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
        <span className="w-[30vw] border-t-2 border-black mr-4"></span>
        Đánh giá từ người dùng
        <span className="w-[30vw] border-t-2 border-black ml-4"></span>
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6"
          >
            {/* User Info */}
            <div className="flex items-center mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 mr-4"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  {review.name}
                </h4>
                <div className="flex items-center text-gray-500 text-xs">
                  {moment(review.date).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <Rate
                disabled
                defaultValue={review.rating}
                className="text-yellow-400 text-base"
              />
            </div>

            {/* Review Content */}
            <p className="text-gray-700 leading-relaxed line-clamp-4 italic">
              &quot;{review.content}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReview;
