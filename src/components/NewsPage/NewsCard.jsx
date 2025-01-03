import PropTypes from "prop-types";

const NewsCard = ({ article }) => {
  return (
    <div className="w-72 bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={
          String(article.thumbnail).startsWith("http")
            ? article.thumbnail
            : `http://localhost:5000/${String(article.thumbnail).replace(
                /\\/g,
                "/"
              )}`
        }
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {article.title}
        </h3>
        <div className="text-orange-500 text-sm mb-2 font-semibold">
          {new Date(article.updatedAt).toLocaleString("vi-VN", {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </div>
        <div
          className="text-gray-600 text-sm line-clamp-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard;
