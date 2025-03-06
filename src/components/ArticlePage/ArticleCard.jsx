import { formatDateTime } from "@helpers/formatDateTime";
import PropTypes from "prop-types";

const ArticleCard = ({ article }) => {
  return (
    <div className="w-72 bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={
          article.thumbnailImage?.path ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={article.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {article.title}
        </h3>
        <div className="text-primary text-sm mb-2 font-semibold">
          {formatDateTime(article.updatedAt)}
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleCard;
