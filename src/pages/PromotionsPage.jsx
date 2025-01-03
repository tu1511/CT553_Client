import React, { useState } from "react";
import { Card, Typography, List, Button, Modal, Tag } from "antd";

const { Title, Paragraph, Text } = Typography;

const PromotionsPage = () => {
  const [promotions] = useState([
    {
      id: 1,
      title: "Giảm giá 50% nhân dịp Giáng Sinh",
      description:
        "Ưu đãi lớn nhất năm: Giảm ngay 50% cho tất cả sản phẩm nhân dịp Giáng Sinh.",
      details:
        "Chương trình áp dụng từ ngày 20/12 đến hết 25/12. Mua hàng trực tiếp tại cửa hàng hoặc online để được nhận ngay ưu đãi. Chương trình không áp dụng cho các sản phẩm giảm giá trước đó.",
      image: "https://via.placeholder.com/400x200.png?text=Giảm+giá+50%",
      validUntil: "2024-12-25",
      tag: "Giáng Sinh",
    },
    {
      id: 2,
      title: "Mua 1 tặng 1 - Ưu đãi đặc biệt",
      description:
        "Mua 1 sản phẩm đồ chơi bất kỳ, nhận ngay sản phẩm thứ hai miễn phí.",
      details:
        "Chương trình áp dụng từ ngày 01/01 đến 15/01. Khách hàng sẽ được tặng sản phẩm có giá trị thấp hơn hoặc bằng sản phẩm đã mua. Không áp dụng kèm các chương trình khuyến mãi khác.",
      image: "https://via.placeholder.com/400x200.png?text=Mua+1+Tặng+1",
      validUntil: "2024-01-15",
      tag: "Tết Nguyên Đán",
    },
    {
      id: 3,
      title: "Miễn phí vận chuyển toàn quốc",
      description: "Miễn phí vận chuyển cho mọi đơn hàng trên 500,000đ.",
      details:
        "Ưu đãi áp dụng từ ngày 01/12 đến 31/12. Không giới hạn số lượng đơn hàng, áp dụng cho cả khách hàng mới và cũ.",
      image: "https://via.placeholder.com/400x200.png?text=Free+Ship",
      validUntil: "2024-12-31",
      tag: "Miễn phí vận chuyển",
    },
  ]);

  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewDetails = (promotion) => {
    setSelectedPromotion(promotion);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPromotion(null);
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={2} style={{ fontWeight: "bold", color: "#333" }}>
          Chương Trình Khuyến Mãi
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          Cập nhật những ưu đãi hấp dẫn từ cửa hàng của chúng tôi
        </Text>
      </div>

      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={promotions}
        renderItem={(promo) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={promo.title}
                  src={promo.image}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              }
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Tag color="blue" style={{ marginBottom: "10px" }}>
                {promo.tag}
              </Tag>
              <Card.Meta
                title={
                  <Title
                    level={4}
                    ellipsis={{ rows: 2 }}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {promo.title}
                  </Title>
                }
                description={
                  <>
                    <Paragraph
                      ellipsis={{ rows: 3 }}
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        marginBottom: "10px",
                      }}
                    >
                      {promo.description}
                    </Paragraph>
                    <Text style={{ fontSize: "12px", color: "#888" }}>
                      Hạn dùng: {promo.validUntil}
                    </Text>
                  </>
                }
              />
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <Button type="primary" onClick={() => handleViewDetails(promo)}>
                  Xem chi tiết
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={<Title level={4}>{selectedPromotion?.title}</Title>}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedPromotion && (
          <>
            <img
              src={selectedPromotion.image}
              alt={selectedPromotion.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Paragraph style={{ fontSize: "14px", color: "#555" }}>
              {selectedPromotion.details}
            </Paragraph>
            <Text style={{ color: "#888", fontSize: "12px" }}>
              Hạn dùng: {selectedPromotion.validUntil}
            </Text>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PromotionsPage;
