import HeaderLine from "@components/common/HeaderLine";
import { Rate } from "antd";
import moment from "moment";

// eslint-disable-next-line react/prop-types
function UserReview({ reviews }) {
  return (
    <div className="container mx-auto py-8 px-6 md:px-8 ">
      <HeaderLine title="Một số đánh giá từ người dùng" />

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5"
          >
            {/* User Info */}
            <div className="flex items-center mb-4">
              <img
                src={
                  review?.account?.avatar?.path ||
                  "https://ui-avatars.com/api/?name=" +
                    review?.account?.fullName
                }
                alt={review?.account?.fullName}
                className="w-14 h-14 rounded-full object-cover border border-primary mr-4"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  {review?.account?.fullName}
                </h4>
                <div className="flex items-center text-gray-500 text-xs">
                  {moment(review.updatedAt).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-2">
              <Rate
                disabled
                defaultValue={review.rating}
                className="text-yellow-400 text-base"
              />
            </div>

            {/* Review Content */}
            <p className="text-gray-700 leading-relaxed line-clamp-3 italic">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReview;
