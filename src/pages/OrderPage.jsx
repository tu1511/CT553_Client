import { useEffect, useState } from "react";
import { Button, Radio, Table, Modal, Divider } from "antd";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddressThunk } from "@redux/thunk/addressThunk";

import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import paymentService from "@services/payment.service";
import AddressList from "@components/OrderPage/AddressList";
import orderService from "@services/order.service";
import { CreditCard, Package } from "lucide-react";
import { deleteItem } from "@redux/thunk/cartThunk";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  const { addresses } = useSelector((state) => state.address);
  const { cart } = useSelector((state) => state.cart);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const idPaymentMethod = selectedPaymentMethod?.id;

  // Cập nhật lại feeShipping mỗi khi fee thay đổi

  const [idAddress, setIdAddress] = useState(null);
  console.log("idAddress", idAddress);
  const [shippingFee, setShippingFee] = useState(0);

  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await paymentService.getPaymentMethods();
        if (response?.metadata) {
          setPaymentMethods(response.metadata); // Cập nhật state với danh sách phương thức thanh toán
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phương thức thanh toán:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const checkedProducts = Array.isArray(cart)
    ? cart.filter((item) => item.isChecked)
    : [];

  console.log("checkedProducts", checkedProducts);

  const products = checkedProducts.map((item) => ({
    id: item.product.id,
    name: item?.product?.name,
    image: item?.product?.images[0]?.image?.path,
    price: item?.product?.variants[0]?.price,
    discount: item?.product?.productDiscount[0]?.discountValue || 0,
    quantity: item?.quantity,
    variantId: item?.product?.variants[0]?.id,
  }));

  const items = products.map((product) => ({
    variantId: product.variantId,
    productId: product.id,
    quantity: product.quantity,
    price: product.price,
  }));

  console.log("items", items);

  useEffect(() => {
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch, accessToken]);

  // const handleSelectShippingMethod = (id) => {
  //   const selectedMethod = shippingMethods.find((method) => method.id === id);
  //   if (selectedMethod) {
  //     setSelectedShippingMethod(selectedMethod);
  //     fetchFee(); // Gọi lại fetchFee để cập nhật phí ngay khi chọn
  //   }
  // };

  // console.log("products", products);
  const calculateTotal = () => {
    const productTotal = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    return productTotal;
  };

  const calculateDiscount = () => {
    const discountTotal = products.reduce(
      (total, product) =>
        total + (product.discount / 100) * product.price * product.quantity,
      0
    );
    return discountTotal;
  };

  console.log("total", calculateTotal());

  console.log("discount", calculateDiscount());

  const handleAddressSelect = (selectedId) => {
    setIdAddress(selectedId);
  };

  const totalPrice = calculateTotal() + shippingFee - calculateDiscount();

  const handleOrderSubmit = async () => {
    if (shippingFee === 0) {
      return toast.error("Vui lòng chọn địa chỉ giao hàng.");
    }
    if (!selectedPaymentMethod) {
      return toast.error("Vui lòng chọn phương thức thanh toán.");
    }

    // If all validations pass
    console.log("Order submitted successfully:", {
      deliveryAddressId: idAddress,
      shippingFee: shippingFee,
      paymentMethodId: idPaymentMethod,
      items: items,
      totalPrice: calculateTotal(),
      finalPrice: totalPrice,
      totalDiscount: calculateDiscount(),
    });

    const orderData = {
      deliveryAddressId: idAddress,
      shippingFee: shippingFee,
      paymentMethodId: idPaymentMethod,
      items: items,
      totalPrice: calculateTotal(),
      finalPrice: totalPrice,
      totalDiscount: calculateDiscount(),
    };

    try {
      const response = await orderService.createOrder(accessToken, orderData);

      if (response?.data) {
        toast.success("Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn!");
        console.log("Order submitted successfully:", response.data);

        const idsToDelete = checkedProducts.map((item) => item.variant.id);
        idsToDelete.forEach((id) => {
          dispatch(deleteItem({ variantId: id })); // Xóa từng id
        });

        setTimeout(() => {
          navigate("/cam-on");
        }, 2000);

        setSelectedPaymentMethod(null);
      } else {
        throw new Error("Lỗi khi tạo đơn hàng, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      console.error("Error creating order:", error);
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-4">
          <img
            src={record.image}
            alt={text}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
  ];

  const breadcrumb = [
    { label: "Trang chủ", path: "/" },
    { label: "Đặt hàng", path: "/dat-hang" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumb} />
      <div className="container mx-auto px-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md col-span-2">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              📍 Địa chỉ nhận hàng
            </h2>

            <AddressList
              addresses={addresses}
              onSelect={handleAddressSelect}
              onFeeChange={setShippingFee}
            />

            <Divider />
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Chi tiết đơn hàng
            </h2>
            <Table
              columns={columns}
              dataSource={products}
              pagination={false}
              rowKey="id"
              bordered
              size="small"
            />
            <Divider />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Phương thức thanh toán
            </h2>
            <Radio.Group
              className="flex flex-col gap-2"
              onChange={(e) =>
                setSelectedPaymentMethod(
                  paymentMethods.find((method) => method.id === e.target.value)
                )
              }
            >
              {paymentMethods.map((method) => (
                <Radio
                  value={method.id}
                  key={method.id}
                  className="flex items-center gap-2"
                >
                  {method.name === "COD" ? (
                    <>
                      <div className="flex items-center gap-2 border p-2 rounded-md  ">
                        <span className="text-black font-semibold">
                          Thanh toán khi nhận hàng
                        </span>
                        <Package size={20} className="text-yellow-500" />
                      </div>
                    </>
                  ) : method.name === "VNPAY" ? (
                    <>
                      <div className="flex items-center gap-2 border p-2 rounded-md ">
                        <span className="text-black font-semibold">
                          Thanh toán trực tuyến
                        </span>
                        <CreditCard size={20} className="text-blue-500" />
                      </div>
                    </>
                  ) : (
                    <span>{method.name}</span>
                  )}
                </Radio>
              ))}
            </Radio.Group>
            <Divider />

            <div className="mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Giá sản phẩm:</span>
                <span>{toVietnamCurrencyFormat(calculateTotal())} </span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Phí vận chuyển:</span>
                <span>{toVietnamCurrencyFormat(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Giảm giá:</span>
                <span>{toVietnamCurrencyFormat(0)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2 text-primary">
                <span className="">Tổng cộng:</span>
                <span>{toVietnamCurrencyFormat(totalPrice)}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="primary"
                block
                className="mt-4"
                style={{
                  backgroundColor: "#000000",
                  borderColor: "#ffffff",
                  color: "white",
                  fontWeight: "bold",
                }}
                size="large"
                onClick={() => {
                  navigate("/gio-hang");
                }}
              >
                Trở về giỏ hàng
              </Button>
              <Button
                type="primary"
                block
                className="mt-4"
                style={{
                  backgroundColor: "#c60018",
                  borderColor: "#ffffff",
                  color: "white",
                  fontWeight: "bold",
                }}
                size="large"
                onClick={handleOrderSubmit}
              >
                Xác nhận đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
