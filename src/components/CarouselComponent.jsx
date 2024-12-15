import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "/src/assets/banner/1.jpg"; // Import ảnh trực tiếp
import banner2 from "/src/assets/banner/2.jpg";
import banner3 from "/src/assets/banner/3.jpg";

const images = [
  { id: 1, src: banner1, alt: "Elegant Jewelry" },
  { id: 2, src: banner2, alt: "Stylish Collection" },
  { id: 3, src: banner3, alt: "Premium Quality" },
];

// eslint-disable-next-line react/prop-types
const ArrowButton = ({ direction, onClick }) => (
  <div
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full text-white cursor-pointer z-10 ${
      direction === "left" ? "left-6" : "right-6"
    } hover:bg-black/70 transition duration-300`}
  >
    {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
  </div>
);

const CarouselComponent = () => {
  return (
    <div className="relative">
      <Carousel
        autoplay
        effect="fade"
        arrows
        prevArrow={<ArrowButton direction="left" />}
        nextArrow={<ArrowButton direction="right" />}
      >
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[70vh] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
