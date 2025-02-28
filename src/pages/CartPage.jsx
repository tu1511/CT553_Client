import { useEffect, useState } from "react";
import { Checkbox, Button, InputNumber, Typography, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HeaderLine from "@components/common/HeaderLine";
import Breadcrumbs from "@components/common/Breadcrumbs";
import TableComponent from "@components/common/TableComponent"; // Import TableComponent
import { useDispatch } from "react-redux";
import { deleteItem, getCart, updateQuantity } from "@redux/thunk/cartThunk";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSelectAll = (checked) => {
    const updatedCart = cartItems.map((item) => ({
      ...item,
      isChecked: checked,
    }));

    setCartItems(updatedCart);
    setSelectedItems(checked ? updatedCart.map((item) => item.variant.id) : []);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSelectItem = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item.variant.id === id ? { ...item, isChecked: !item.isChecked } : item
      );

      setSelectedItems(
        updatedCart
          .filter((item) => item.isChecked)
          .map((item) => item.variant.id)
      );

      // Cập nhật vào localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleQuantityChange = (variantId, quantity) => {
    // console.log("quantity1", quantity);
    if (!quantity || quantity < 1) {
      handleRemoveItem(variantId);
      return;
    }
    // console.log("cartItems1", cartItems);
    // console.log("quantity2", quantity);
    const data = { variantId, quantity };
    dispatch(updateQuantity({ data })).then((response) => {
      if (response.payload) {
        setCartItems(response.payload.cart);
        setTotalPrice(response.payload.totalPrice);
      }
    });
    // console.log("cartItems2", cartItems);

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

  // console.log(cartItems);
  const handleOrderNow = () => {
    if (selectedItems && selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
      return;
    } else {
      setTimeout(() => {
        window.location.href = "/dat-hang";
      }, 300);
      toast.success("Chuyển sang trang thanh toán!");
    }
  };

  useEffect(() => {
    dispatch(getCart()).then((response) => {
      if (response.payload) {
        console.log("response.payload: ", response.payload);
        setCartItems(response.payload.cart);
        setSelectedItems(
          response.payload.cart
            .filter((item) => item.isChecked)
            .map((item) => item.variant.id)
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const total = cartItems
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.finalPricePerOne * item.quantity, 0);

    setTotalPrice(total);
  }, [cartItems]);

  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={
            cartItems.length > 0 && cartItems.every((item) => item.isChecked)
          }
        />
      ),
      dataIndex: "isChecked",
      render: (_, record) => (
        <Checkbox
          checked={record.isChecked}
          onChange={() => handleSelectItem(record.variant.id)}
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (product) => (
        <Link to={`/san-pham/${product.slug}`}>
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
        </Link>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "variant",
      render: (variant) => <Text>{variant.size}</Text>,
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
          min={0}
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
            <HeaderLine title="Giỏ hàng của bạn" />
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
