// eslint-disable-next-line react/prop-types
const FeatureCards = ({ features }) => {
  return (
    <div className="container mx-auto px-8 py-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative border rounded-2xl p-4 text-center shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
          >
            {/* Icon */}
            <div className="flex justify-center mb-2">{feature.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800 uppercase">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-black leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
