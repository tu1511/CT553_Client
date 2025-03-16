import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import bannerService from "@services/banner.service";

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
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannerService.getAll();
        console.log("response", response);
        setBanners(response.metadata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanners();
  }, []);

  console.log("banners", banners);
  return (
    <div className="relative">
      <Carousel
        autoplay
        effect="fade"
        arrows
        prevArrow={<ArrowButton direction="left" />}
        nextArrow={<ArrowButton direction="right" />}
      >
        {banners.map((image) => (
          <div key={image.priority}>
            <img
              src={image?.image?.path}
              alt={image.alt}
              className="w-full h-[75vh] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
