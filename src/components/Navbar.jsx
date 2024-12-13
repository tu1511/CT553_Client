// eslint-disable-next-line react/prop-types
const Navbar = ({ categories }) => {
  return (
    <nav className="bg-beige-100 border-b-2 border-red-700">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center px-4 py-2">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="px-4 py-2 text-sm uppercase font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-full transition-all duration-200"
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
