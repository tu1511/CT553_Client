import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Table, Modal, Divider } from "antd";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddressThunk } from "@redux/thunk/addressThunk";
import shippingService from "@services/shipping.service";

import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";

const fakePaymentMethods = [
  { id: "1", name: "Thanh toán khi nhận hàng (COD)" },
  { id: "2", name: "Thanh toán qua VNPay" },
];

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  const { addresses } = useSelector((state) => state.address);
  const { cart } = useSelector((state) => state.cart);

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [fee, setFee] = useState(0);

  const [shippingMethods, setShippingMethods] = useState([
    { id: 1, name: "Giao hàng nhanh", feeShipping: fee },
  ]);

  // Cập nhật lại feeShipping mỗi khi fee thay đổi
  useEffect(() => {
    setShippingMethods((prev) =>
      prev.map((method) => ({
        ...method,
        feeShipping: fee,
      }))
    );
  }, [fee]);
  const [open, setOpen] = useState(false);

  const [editAddress, setEditAddress] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  const checkedProducts = Array.isArray(cart)
    ? cart.filter((item) => item.isChecked)
    : [];

  const products = checkedProducts.map((item) => ({
    id: item.product.id,
    name: item?.product?.name,
    image: item?.product?.images[0]?.image?.path,
    price: item?.finalPricePerOne,
    quantity: item?.quantity,
  }));

  useEffect(() => {
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch, accessToken]);

  const [formData, setFormData] = useState({
    contactName: addresses[0]?.contactName || "",
    contactPhone: addresses[0]?.contactPhone || "",
    address: addresses[0]
      ? `${
          addresses[0]?.detailAddress ? addresses[0]?.detailAddress + ", " : ""
        }${addresses[0]?.wardName}, ${addresses[0]?.districtName}, ${
          addresses[0]?.provinceName
        }`
      : "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (addresses[0]) {
      setFormData((prevState) => ({
        ...prevState,
        contactName: addresses[0]?.contactName || "",
        contactPhone: addresses[0]?.contactPhone || "",
        address: `${
          addresses[0]?.detailAddress ? addresses[0]?.detailAddress + ", " : ""
        }${addresses[0]?.wardName}, ${addresses[0]?.districtName}, ${
          addresses[0]?.provinceName
        }`,
      }));
    }
  }, [addresses]);

  const fetchFee = async () => {
    try {
      const response = await shippingService.getFee({
        toDistrictId: selectedAddress?.districtId,
        toWardCode: selectedAddress?.wardCode,
        weightInGram: 200,
      });

      console.log("response", response);
      if (response?.metadata?.service_fee) {
        setFee(response?.metadata?.service_fee);
      }
    } catch (error) {
      console.error("Error fetching fee:", error);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      fetchFee(); // Gọi fetchFee khi selectedAddress thay đổi
    }
  }, [selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const productTotal = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    return productTotal;
  };
  const shippingFee = shippingMethods[0]?.feeShipping;
  const total = calculateTotal() + shippingFee;

  const handleOrderSubmit = () => {
    // Validate required fields
    if (!formData.contactName.trim()) {
      return toast.error("Vui lòng nhập họ và tên.");
    }

    if (!formData.contactPhone.trim()) {
      return toast.error("Vui lòng nhập số điện thoại.");
    }

    if (!/^\d{10,11}$/.test(formData.contactPhone)) {
      return toast.error(
        "Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số."
      );
    }

    if (!formData.email.trim()) {
      return toast.error("Vui lòng nhập email.");
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      return toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
    }

    if (!formData.address.trim()) {
      return toast.error("Vui lòng nhập địa chỉ nhận hàng.");
    }

    if (!selectedShippingMethod) {
      return toast.error("Vui lòng chọn phương thức vận chuyển.");
    }

    if (!selectedPaymentMethod) {
      return toast.error("Vui lòng chọn phương thức thanh toán.");
    }

    // If all validations pass
    toast.success("Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn!");
    console.log("Order submitted successfully:", {
      formData,
      selectedShippingMethod,
      selectedPaymentMethod,
      products: products,
      total: calculateTotal(),
    });

    console.log(formData);

    setTimeout(() => {
      navigate("/cam-on");
    }, 3000);
    // Optionally, you can clear the form or redirect the user
    setFormData({
      contactName: "",
      contactPhone: "",
      address: "",
      email: "",
      notes: "",
    });
    setSelectedShippingMethod(null);
    setSelectedPaymentMethod(null);
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md col-span-2">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-3">
              Thông tin người đặt
            </h2>
            <Form layout="vertical">
              <Form.Item label="Họ và tên" required>
                <Input
                  name="contactName"
                  value={formData.contactName}
                  placeholder="Nhập họ và tên"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Số điện thoại" required>
                <Input
                  name="contactPhone"
                  value={formData.contactPhone}
                  placeholder="Nhập số điện thoại"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Email" required>
                <Input
                  name="email"
                  value={formData.email}
                  placeholder="Nhập email"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label={
                  <div className="flex items-center justify-between w-[60vw]">
                    <span>Địa chỉ nhận hàng</span>
                    <span
                      type="primary"
                      onClick={() => setIsAddressModalVisible(true)}
                      className=" cursor-pointer font-medium border px-2 py-1 rounded-lg  bg-primary text-white"
                    >
                      Thay đổi
                    </span>
                  </div>
                }
                required
              >
                <Input
                  name="address"
                  value={formData.address}
                  placeholder="Nhập địa chỉ"
                  readOnly
                />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <Input.TextArea
                  name="notes"
                  value={formData.notes}
                  placeholder="Nhập ghi chú (nếu có)"
                  rows={3}
                  onChange={handleChange}
                />
              </Form.Item>
            </Form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Phương thức vận chuyển
            </h2>
            <Radio.Group
              className="flex flex-col gap-2 mb-4"
              onChange={(e) =>
                setSelectedShippingMethod(
                  shippingMethods.find((method) => method.id === e.target.value)
                )
              }
              value={selectedShippingMethod?.id} // Gán giá trị đã chọn
            >
              {shippingMethods.map((method) => (
                <Radio value={method.id} key={method.id}>
                  {method.name} ({toVietnamCurrencyFormat(method.feeShipping)})
                </Radio>
              ))}
            </Radio.Group>
            <Divider />
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Phương thức thanh toán
            </h2>
            <Radio.Group
              className="flex flex-col gap-2"
              onChange={(e) =>
                setSelectedPaymentMethod(
                  fakePaymentMethods.find(
                    (method) => method.id === e.target.value
                  )
                )
              }
            >
              {fakePaymentMethods.map((method) => (
                <Radio value={method.id} key={method.id}>
                  {method.name}
                </Radio>
              ))}
            </Radio.Group>
            <Divider />
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Tóm tắt đơn hàng
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
            <div>
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
                <span>{toVietnamCurrencyFormat(total)}</span>
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

        <Modal
          title="Chọn địa chỉ"
          visible={isAddressModalVisible}
          onCancel={() => setIsAddressModalVisible(false)}
          footer={null}
        >
          <div className="flex justify-end mb-4">
            <Button
              type="primary"
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
              onClick={() => {
                setEditAddress(null);
                setOpen(true);
              }}
            >
              Thêm địa chỉ
            </Button>
          </div>
          {addresses.map((address) => {
            const fullAddress = `${
              address.detailAddress ? address.detailAddress + ", " : ""
            }${address.wardName}, ${address.districtName}, ${
              address.provinceName
            }`;

            return (
              <div
                key={address.id}
                className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedAddress(address);
                  setFormData((prev) => ({
                    ...prev,
                    contactName: address.contactName,
                    contactPhone: address.contactPhone,
                    email: address.email || "",
                    address: fullAddress,
                  }));
                  setIsAddressModalVisible(false);
                }}
              >
                <p className="font-semibold">{address.contactName}</p>
                <p>{address.contactPhone}</p>
                <p>{fullAddress}</p>
              </div>
            );
          })}
        </Modal>

        <AddressFormDialog
          open={open}
          onClose={() => setOpen(false)}
          addressData={editAddress}
        />
      </div>
    </>
  );
};

export default OrderPage;
