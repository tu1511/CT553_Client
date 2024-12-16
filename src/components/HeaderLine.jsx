// eslint-disable-next-line react/prop-types
const HeaderLine = ({ title }) => {
  return (
    <h2 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
      <span className="w-[30vw] border-t-2 border-black mr-4"></span>
      {title}
      <span className="w-[30vw] border-t-2 border-black ml-4"></span>
    </h2>
  );
};

export default HeaderLine;
