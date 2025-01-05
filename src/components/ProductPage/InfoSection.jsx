import HeaderLine from "@components/common/HeaderLine";

const info = `<div class="elementor-widget-wrap elementor-element-populated">
  <div class="elementor-element elementor-element-58ed7e8 elementor-widget-divider--view-line_text elementor-widget-divider--element-align-center elementor-widget elementor-widget-divider">
    <div class="elementor-widget-container">
      <div class="elementor-divider">
        <span class="elementor-divider-separator"></span>
      </div>
    </div>
  </div>
  <div class="elementor-element elementor-element-172bf39 elementor-widget elementor-widget-heading">
    <div class="elementor-widget-container">
      <p class="elementor-heading-title font-base p-4 flex items-center justify-center text-lg">
        Tại Sao Nên Chọn Trang Sức Cao Cấp Thay Vì Trang Sức Phổ Thông?
      </p>
    </div>
  </div>
  <div class="elementor-element elementor-element-4dca300 elementor-aspect-ratio-169 elementor-widget elementor-widget-video">
    <div class="elementor-widget-container">
      <div class="elementor-wrapper elementor-fit-aspect-ratio elementor-open-inline">
        <iframe 
          src="https://www.youtube.com/embed/J5xcMPtdPw8?autoplay=1&mute=1&loop=1&modestbranding=1&rel=0&showinfo=0" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen
          class="w-full h-64 sm:h-96 rounded-md">
        </iframe>
      </div>
    </div>
  </div>
  <div class="elementor-element elementor-element-873c47b elementor-widget elementor-widget-heading">
    <div class="elementor-widget-container">
      <p class="elementor-heading-title font-base p-4 flex items-center justify-center text-lg">
        Tất cả sản phẩm của Silver Charm đều được thiết kế và chế tác bởi các nghệ nhân hàng đầu
      </p>
    </div>
  </div>
  <div class="elementor-element elementor-element-b212d0f elementor-widget elementor-widget-image">
    <div class="elementor-widget-container">
      <img
        width="776"
        height="1024"
        src="https://lili.vn/wp-content/uploads/2020/10/Che-tac-trang-suc-LiLi-2-776x1024.jpg"
        alt="Chế Tác Trang Sức Silver Charm 2"
        class="w-full rounded-lg shadow-md"
      />
    </div>
  </div>
  <div class="elementor-element elementor-element-5d4280d elementor-widget elementor-widget-image">
    <div class="elementor-widget-container">
      <img
        width="800"
        height="542"
        src="https://lili.vn/wp-content/uploads/2020/10/Che-tac-trang-suc-LiLi-1.jpg"
        alt="Chế Tác Trang Sức LiLi 1"
        class="w-full rounded-lg shadow-md"
      />
    </div>
  </div>
  <div class="elementor-element elementor-element-7dc85f2 elementor-widget elementor-widget-heading">
    <div class="elementor-widget-container">
      <p class="elementor-heading-title font-base p-4 flex items-center justify-center text-lg">
        Mọi Sản Phẩm đều được kiểm định chất lượng nghiêm ngặt trước khi đến tay khách hàng
      </p>
    </div>
  </div>
  <div class="elementor-element elementor-element-37875a2 elementor-widget elementor-widget-image">
    <div class="elementor-widget-container">
      <img
        width="800"
        height="542"
        src="https://lili.vn/wp-content/uploads/2020/10/Chung-chi-giam-dinh-bac-LiLi.jpg"
        alt="Chứng Chỉ Giám đính Bạc LiLi"
        class="w-full rounded-lg shadow-md"
      />
    </div>
  </div>
</div>`;
const InfoSection = () => {
  return (
    <>
      <div className="continer mx-auto px-8 py-6">
        <HeaderLine title="Chất lượng cao cấp" />
        <div
          className="flex justify-center w-full"
          dangerouslySetInnerHTML={{ __html: info }}
        ></div>
      </div>
    </>
  );
};

export default InfoSection;
