import { useEffect, useState } from "react";
import { Button, Radio, Table, Divider } from "antd";
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
import CouponModal from "@components/OrderPage/CouponModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  console.log("selectedCouponId", selectedCoupon);

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

  const products = checkedProducts.map((item) => ({
    id: item.product.id,
    name: item?.product?.name,
    image: item?.product?.images[0]?.image?.path,
    price: item?.variant?.price,
    finalPrice: item?.finalPricePerOne,
    discount: item?.product?.productDiscount[0]?.discountValue || 0,
    quantity: item?.quantity,
    variantId: item?.product?.variants[0]?.id,
  }));

  console.log("products", products);

  const items = products.map((product) => ({
    variantId: product.variantId,
    productId: product.id,
    quantity: product.quantity,
    discount: product.discount,
    price: product.price,
    finalPrice: product.finalPrice,
  }));

  useEffect(() => {
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch, accessToken]);

  const calculateTotal = () => {
    const productTotal = products.reduce(
      (total, product) => total + product.finalPrice * product.quantity,
      0
    );

    return productTotal;
  };

  const couponValue = selectedCoupon?.coupon?.discountValue;
  let totalDiscount = 0;
  if (selectedCoupon) {
    totalDiscount = (calculateTotal() * couponValue) / 100;
  } else {
    totalDiscount = 0;
  }

  const handleAddressSelect = (selectedId) => {
    setIdAddress(selectedId);
  };

  const totalPrice = calculateTotal();
  const finalPrice = totalPrice + shippingFee - totalDiscount;

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
      finalPrice: finalPrice,
      totalDiscount: totalDiscount,
      usedCouponId: selectedCoupon?.couponId,
    });

    const orderData = {
      deliveryAddressId: idAddress,
      shippingFee: shippingFee,
      paymentMethodId: idPaymentMethod,
      items: items,
      totalPrice: calculateTotal(),
      finalPrice: finalPrice,
      totalDiscount: totalDiscount,
      usedCouponId: selectedCoupon?.couponId,
    };

    try {
      const response = await orderService.createOrder(accessToken, orderData);
      const paymentMethodId = response?.data?.metadata?.paymentMethod.id;
      if (paymentMethodId === 2) {
        const paymentData = {
          orderId: response?.data?.metadata?.id,
          amount: response?.data?.metadata?.finalPrice,
        };
        const paymentResponse = await paymentService.createVnPayPaymentURL(
          paymentData
        );

        if (paymentResponse) {
          window.location.href = paymentResponse.metadata.redirectUrl;
          toast.success("Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn!");
        } else {
          toast.error("Lỗi khi tạo đơn hàng, vui lòng thử lại.");
          throw new Error("Lỗi khi tạo đơn hàng, vui lòng thử lại.");
        }
      }

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
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (record) =>
        `${(record.finalPrice * record.quantity).toLocaleString()} VND`,
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
            <h2 className="text-xl font-semibold  mb-4">
              <span className="text-primary">*</span>Phương thức thanh toán
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

            <div className="">
              <h2 className="text-xl font-semibold">Mã giảm giá</h2>{" "}
              {selectedCoupon ? (
                <div className="w-[400px] border border-primary p-4 rounded-lg mt-3">
                  <div className="font-semibold">
                    Mã: {selectedCoupon.coupon.code}{" "}
                  </div>
                  <div className="italic text-gray-500">
                    Giảm {selectedCoupon.coupon.discountValue}% cho đơn hàng tối
                    thiểu{" "}
                    {toVietnamCurrencyFormat(
                      selectedCoupon.coupon.minimumPriceToUse
                    )}
                  </div>
                </div>
              ) : (
                <div className="">Không có mã giảm giá nào được chọn</div>
              )}
              <div className=" text-center mt-4">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#c60018",
                    borderColor: "#ffffff",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Chọn mã giảm giá
                </Button>
              </div>
              <CouponModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectCoupon={setSelectedCoupon}
              />
            </div>
            <Divider />

            <div className="mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng giá sản phẩm:</span>
                <span>{toVietnamCurrencyFormat(calculateTotal())} </span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <div className="flex">
                  <span>
                    Phí vận chuyển{" "}
                    <span className="italic font-normal text-primary">
                      (Giao hàng nhanh)
                    </span>
                    :
                  </span>
                </div>
                <span>{toVietnamCurrencyFormat(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Giảm giá:</span>
                <span>-{toVietnamCurrencyFormat(totalDiscount)}</span>
              </div>

              <div className="flex justify-between text-lg font-semibold border-t pt-2 text-primary">
                <span className="">Tổng cộng:</span>
                <span>{toVietnamCurrencyFormat(finalPrice)}</span>
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
