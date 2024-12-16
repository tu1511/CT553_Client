const SectionWithImage = ({
  title,
  description,
  image1,
  image2,
  imagePosition = "left",
}) => {
  return (
    <div
      className={`container mx-auto px-8 py-6 flex flex-col ${
        imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center relative`}
    >
      {/* Hình ảnh */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={image1}
          alt={title}
          className="rounded-lg shadow-lg border-4 border-white z-10"
        />
        <img
          src={image2}
          alt="Overlay Image"
          className="rounded-lg shadow-lg border-4 border-white absolute top-12 w-2/3 z-0"
          style={{ [imagePosition === "left" ? "left" : "right"]: "3rem" }}
        />
      </div>

      {/* Nội dung */}
      <div
        className={`w-full lg:w-1/2 mt-6 lg:mt-0 ${
          imagePosition === "left" ? "lg:pl-12" : "lg:pr-12"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 uppercase text-gray-800">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-justify text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <>
      {/* Section 1: Giới thiệu */}
      <div className="container mx-auto px-8 py-6 mt-10">
        <h1 className="flex items-center uppercase justify-center text-3xl font-semibold mb-6">
          <span className="w-[30vw] border-t-2 border-black mr-4"></span>
          Về chúng tôi
          <span className="w-[30vw] border-t-2 border-black ml-4"></span>
        </h1>
        <p className="font-normal text-lg text-justify leading-relaxed text-gray-700">
          Đến với Silver Charm, trang sức không chỉ là một phụ kiện – nó còn
          mang một ý nghĩa lớn lao hơn rất nhiều. Thông qua đồ trang sức, chúng
          ta có khả năng không chỉ cá nhân hóa vẻ ngoài mà còn khơi gợi cảm xúc
          và tạo ra những kỷ niệm đẹp đáng nhớ. Đây chính là lý do mà Silver
          Charm được hình thành. Chúng tôi tạo ra đồ trang sức thủ công, cao cấp
          thể hiện cả con người bạn và những gì bạn đại diện. Trang sức là hiện
          thân của niềm đam mê, tình yêu của chúng tôi, và cuối cùng, là món quà
          của Silver Charm dành cho bạn.
        </p>
      </div>

      {/* Section 2: Đồ thủ công */}
      <div className="bg-black py-8">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl font-semibold uppercase text-white mb-4">
            100% Đồ trang sức thủ công
          </h2>
          <p className="text-lg text-white leading-relaxed">
            Được thiết kế và làm thủ công bởi những nghệ nhân hàng đầu tại
            studio hiện đại của chúng tôi, mỗi tác phẩm tuyệt đẹp đều được làm
            theo yêu cầu để trở nên độc đáo và chân thực như chính bạn. Đó là lý
            do tại sao Silver Charm luôn đặt chất lượng và quan trọng hơn là bạn
            – lên hàng đầu.
          </p>
        </div>
      </div>

      {/* Section 3, 4, 5 - Reusable Sections */}
      <SectionWithImage
        title="Bạn có thể tự tạo nét đẹp cho riêng mình"
        description="Do phương pháp tiếp cận theo yêu cầu riêng của chúng tôi, mỗi thiết kế
        đều được mang một nét riêng để gợi lên sự kết nối cảm xúc..."
        image1="https://lili.vn/wp-content/uploads/2021/02/Bo-trang-suc-bac-ma-vang-Cay-o-liu-LILI_561446-01.jpg"
        image2="https://lili.vn/wp-content/uploads/2021/02/Bo-trang-suc-bac-ma-vang-dinh-da-Citrine-hinh-chu-ong-vang-LILI_379148-13.jpg"
      />

      <SectionWithImage
        title="Vật liệu thân thiện với môi trường và chất lượng cao"
        description="Hơn nữa, chúng tôi cực kỳ tự hào về nghề thủ công của mình và do đó,
        việc sử dụng các vật liệu có ý thức về môi trường..."
        image1="https://lili.vn/wp-content/uploads/2021/01/Day-chuyen-bac-ma-vang-o-luc-to-ong-LILI_596971-8.jpg"
        image2="https://lili.vn/wp-content/uploads/2021/02/Bo-trang-suc-bac-ma-vang-Cay-o-liu-LILI_561446-01.jpg"
        imagePosition="right"
      />

      <SectionWithImage
        title="Nhiệm vụ của chúng tôi"
        description="Đội ngũ các nhà thiết kế và thợ thủ công tài năng của chúng tôi làm việc
        song song để mang từng sáng tạo trở nên sống động..."
        image1="https://lili.vn/wp-content/uploads/2021/02/Bo-trang-suc-bac-ma-vang-Cay-o-liu-LILI_561446-01.jpg"
        image2="https://lili.vn/wp-content/uploads/2021/01/Day-chuyen-bac-ma-vang-o-luc-to-ong-LILI_596971-8.jpg"
      />
    </>
  );
};

export default AboutUsPage;
