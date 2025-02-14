import { useEffect, useState } from "react";
import {
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
import TableComponent from "@components/common/TableComponent"; // Import TableComponent
import { useDispatch } from "react-redux";
import { deleteItem, getCart, updateQuantity } from "@redux/thunk/cartThunk";
import { toast } from "react-toastify";

const { Text } = Typography;

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

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

  const handleQuantityChange = (variantId, quantity) => {
    console.log("quantity1", quantity);
    if (!quantity || quantity < 1) {
      return;
    }
    console.log("cartItems1", cartItems);
    console.log("quantity2", quantity);
    const data = { variantId, quantity };
    dispatch(updateQuantity({ data })).then((response) => {
      if (response.payload) {
        setCartItems(response.payload.cart);
        setTotalPrice(response.payload.totalPrice);
      }
    });
    console.log("cartItems2", cartItems);
    dispatch(getCart()).then((response) => {
      if (response.payload) {
        // console.log("response.payload: ", response.payload);
        setCartItems(response.payload.cart);
        setTotalPrice(response.payload.totalPrice);
      }
    });
  };

  const handleRemoveItem = (variantId) => {
    dispatch(deleteItem({ variantId }))
      .then(() => {
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
      })
      .catch((error) => {
        toast.error("Xóa sản phẩm thất bại! Vui lòng thử lại.");
        console.error("Lỗi khi xóa sản phẩm:", error);
      });

    dispatch(getCart()).then((response) => {
      if (response.payload) {
        // console.log("response.payload: ", response.payload);
        setCartItems(response.payload.cart);
        setTotalPrice(response.payload.totalPrice);
      }
    });
  };

  const handleOrderNow = () => {
    if (selectedItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
      return;
    }
    message.success("Đặt hàng thành công!");
  };

  useEffect(() => {
    dispatch(getCart()).then((response) => {
      if (response.payload) {
        console.log("response.payload: ", response.payload);
        setCartItems(response.payload.cart);
        setTotalPrice(response.payload.totalPrice);
      }
    });
  }, [dispatch]);

  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          // checked={
          //   cartItems.length > 0 && selectedItems.length === cartItems.length
          // }
        />
      ),
      dataIndex: "isChecked",
      render: (isChecked) => (
        <Checkbox
          checked={isChecked}
          // onChange={() => handleSelectItem(id)}
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (product) => (
        <div className="flex items-center">
          <Image
            src={product.images[0].image.path}
            alt={product.name}
            width={80}
            className="rounded-md"
          />
          <div className="ml-4">
            <Text>{product.name}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "finalPricePerOne",
      render: (finalPricePerOne) => (
        <Text>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(finalPricePerOne)}
        </Text>
      ),
    },
    {
      title: "Số lượng",
      // dataIndex: "quantity",
      key: "quantity",
      render: (record) => (
        <InputNumber
          min={1}
          max={record.variant.quantity}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.variant.id, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      render: (record) => (
        <Text>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.finalPricePerOne * record.quantity)}
        </Text>
      ),
    },
    {
      title: "Hành động",
      // dataIndex: "id",
      render: (record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record?.variant.id)}
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
        {cartItems?.length === 0 ? (
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
            <TableComponent
              loading={false}
              rows={cartItems}
              columns={columns}
              paginationModel={{ current: 1, pageSize: 5 }}
              checkbox={false} // Không cần checkbox tích hợp
            />
            <div className="flex justify-end items-center mt-6">
              <div className="mr-4">
                <Text className="text-lg font-semibold">
                  Tổng cộng:{" "}
                  <span className="text-primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice)}
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
