import { useState } from "react";
import {
  Table,
  Checkbox,
  Button,
  InputNumber,
  Typography,
  Image,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HeaderLine from "@components/common/HeaderLine";
import Breadcrumbs from "@components/common/Breadcrumbs";

const { Text, Title } = Typography;

// Fake dữ liệu
const fakeCart = [
  {
    id: "1",
    productName: "Dây chuyền bạc cao cấp",
    image:
      "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
    price: 1200000,
    discountPercent: 20,
    quantity: 2,
  },
  {
    id: "2",
    productName: "Nhẫn bạc thời trang",
    image:
      "https://lili.vn/wp-content/uploads/2021/12/Nhan-doi-bac-hiep-si-va-cong-chua-dinh-da-CZ-LILI_819229_2-400x400.jpg",
    price: 500000,
    discountPercent: 10,
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(fakeCart);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleQuantityChange = (id, value) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((itemId) => itemId !== id)
    );
    message.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (total, item) =>
          total +
          item.price * ((100 - item.discountPercent) / 100) * item.quantity,
        0
      );
  };

  const handleOrderNow = () => {
    if (selectedItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
      return;
    }
    message.success("Đặt hàng thành công!");
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={
            cartItems.length > 0 && selectedItems.length === cartItems.length
          }
        />
      ),
      dataIndex: "id",
      render: (id) => (
        <Checkbox
          checked={selectedItems.includes(id)}
          onChange={() => handleSelectItem(id)}
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="flex items-center">
          <Image
            src={record.image}
            alt={text}
            width={80}
            className="rounded-md"
          />
          <div className="ml-4">
            <Text>{text}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (price, record) => (
        <Text>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price * ((100 - record.discountPercent) / 100))}
        </Text>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "id",
      render: (id, record) => (
        <Text>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            record.price *
              ((100 - record.discountPercent) / 100) *
              record.quantity
          )}
        </Text>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      render: (id) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(id)}
        />
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giỏ hàng", path: "/gio-hang" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container mx-auto p-8">
        <HeaderLine title="Giỏ hàng của bạn" />
        {cartItems.length === 0 ? (
          <div className="text-center mt-8">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
              width={150}
            />
            <Text className="text-gray-500 text-lg">
              Giỏ hàng của bạn đang trống
            </Text>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={cartItems}
              rowKey="id"
              pagination={false}
              className="mb-8"
            />
            <div className="flex justify-end items-center">
              <div className="mr-4">
                <Text className="text-lg font-semibold">
                  Tổng cộng:{" "}
                  <span className="text-primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(calculateTotal())}
                  </span>
                </Text>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={handleOrderNow}
                disabled={selectedItems.length === 0}
                style={{
                  backgroundColor: "#c60018",
                  borderColor: "#ffffff",
                  color: "white",
                }}
              >
                Đặt hàng ngay
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
