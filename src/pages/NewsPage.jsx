import React, { useState } from "react";
import { Card, Typography, List, Button, Modal, Pagination, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const NewsPage = () => {
  const [news] = useState([
    {
      id: 1,
      title: "Ưu đãi Giáng Sinh - Giảm giá đến 50% cho mọi sản phẩm",
      description:
        "Nhân dịp Giáng Sinh, cửa hàng chúng tôi giảm giá đến 50% cho các sản phẩm. Ưu đãi có hạn, hãy nhanh tay!",
      content:
        "Giáng Sinh là thời điểm lý tưởng để bạn chọn quà cho người thân và bạn bè. Chúng tôi mang đến ưu đãi lớn nhất năm: giảm giá đến 50% cho tất cả sản phẩm. Ngoài ra, khách hàng còn được nhận quà tặng hấp dẫn khi mua hàng.",
      image: "https://via.placeholder.com/400x200.png?text=Giảm+giá+50%",
      date: "2024-12-01",
    },
    {
      id: 2,
      title: "Ra mắt sản phẩm mới - Bộ đồ chơi sáng tạo cho bé",
      description:
        "Cửa hàng chúng tôi vừa nhập về bộ đồ chơi sáng tạo mới, giúp bé phát triển tư duy và kỹ năng.",
      content:
        "Chào mừng bộ sưu tập đồ chơi sáng tạo mới, giúp trẻ em phát triển trí thông minh, khả năng tư duy và sáng tạo. Sản phẩm được nhập khẩu chính hãng, an toàn tuyệt đối cho trẻ.",
      image: "https://via.placeholder.com/400x200.png?text=Sản+phẩm+mới",
      date: "2024-12-05",
    },
    {
      id: 3,
      title: "Chương trình Tết - Mua 1 tặng 1 các mặt hàng đồ chơi",
      description:
        "Đón Tết cùng ưu đãi Mua 1 tặng 1 dành riêng cho các khách hàng thân thiết.",
      content:
        "Nhằm tri ân khách hàng nhân dịp Tết Nguyên Đán, cửa hàng tổ chức chương trình ưu đãi đặc biệt. Với mỗi sản phẩm đồ chơi bất kỳ, khách hàng sẽ được nhận thêm một món quà hoàn toàn miễn phí.",
      image: "https://via.placeholder.com/400x200.png?text=Ưu+đãi+Tết",
      date: "2024-12-20",
    },
  ]);

  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 2;
  const paginatedNews = news.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleReadMore = (article) => {
    setSelectedNews(article);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
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
          Tin Tức Cửa Hàng
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          Cập nhật những tin tức mới nhất từ cửa hàng của chúng tôi
        </Text>
      </div>

      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={paginatedNews}
        renderItem={(article) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={article.title}
                  src={article.image}
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
                    {article.title}
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
                      {article.description}
                    </Paragraph>
                    <Text style={{ fontSize: "12px", color: "#888" }}>
                      Ngày đăng: {article.date}
                    </Text>
                  </>
                }
              />
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <Button type="primary" onClick={() => handleReadMore(article)}>
                  Đọc thêm
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Pagination
        style={{ textAlign: "center", marginTop: "30px" }}
        current={currentPage}
        pageSize={pageSize}
        total={news.length}
        onChange={(page) => setCurrentPage(page)}
      />

      <Modal
        title={<Title level={4}>{selectedNews?.title}</Title>}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedNews && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Paragraph style={{ fontSize: "14px", color: "#555" }}>
              {selectedNews.content}
            </Paragraph>
            <Text style={{ color: "#888", fontSize: "12px" }}>
              Ngày đăng: {selectedNews.date}
            </Text>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default NewsPage;
