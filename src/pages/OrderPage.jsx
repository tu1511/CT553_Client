import React, { useState } from "react";
import { Button, Form, Input, Radio, Table, Modal, Divider, Space } from "antd";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog";
import Breadcrumbs from "@components/common/Breadcrumbs";
import { toast } from "react-toastify";

const fakeShippingMethods = [
  { id: "1", name: "Giao hàng tiết kiệm", fee: 30000 },
  { id: "2", name: "Giao hàng nhanh", fee: 50000 },
];

const fakePaymentMethods = [
  { id: "1", name: "Thanh toán khi nhận hàng (COD)" },
  { id: "2", name: "Chuyển khoản ngân hàng" },
];

const fakeProducts = [
  {
    id: 1,
    name: "Dây chuyền bạc cao cấp",
    image:
      "https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-bac-nu-phong-cach-co-trang-CZ-LILI_831944_2-400x400.jpg",
    price: 1200000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Nhẫn bạc đẹp",
    image:
      "https://lili.vn/wp-content/uploads/2022/08/Nhan-bac-nu-dinh-da-CZ-hoa-buom-LILI_661591_2-400x400.jpg",
    price: 500000,
    quantity: 2,
  },
];

const fakeAddresses = [
  {
    id: 1,
    fullname: "Nguyễn Văn A",
    phone: "0123456789",
    address: "Số 1, Đường ABC, Phường XYZ, Hồ Chí Minh",
  },
  {
    id: 2,
    fullname: "Trần Thị B",
    phone: "0987654321",
    address: "Số 2, Đường DEF, Phường ZYX, Hà Nội",
  },
];

const OrderPage = () => {
  const [formData, setFormData] = useState({
    fullname: fakeAddresses[0].fullname,
    phone: fakeAddresses[0].phone,
    address: fakeAddresses[0].address,
    email: "",
    notes: "",
  });
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(fakeAddresses[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const productTotal = fakeProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const shippingFee = selectedShippingMethod?.fee || 0;
    return productTotal + shippingFee;
  };

  const handleOrderSubmit = () => {
    // Validate required fields
    if (!formData.fullname.trim()) {
      return toast.error("Vui lòng nhập họ và tên.");
    }

    if (!formData.phone.trim()) {
      return toast.error("Vui lòng nhập số điện thoại.");
    }

    if (!/^\d{10,11}$/.test(formData.phone)) {
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
      products: fakeProducts,
      total: calculateTotal(),
    });

    // Optionally, you can clear the form or redirect the user
    setFormData({
      fullname: "",
      phone: "",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-3">
              Thông tin người đặt
            </h2>
            <Form layout="vertical">
              <Form.Item label="Họ và tên" required>
                <Input
                  name="fullname"
                  value={formData.fullname}
                  placeholder="Nhập họ và tên"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Số điện thoại" required>
                <Input
                  name="phone"
                  value={formData.phone}
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Phương thức vận chuyển
            </h2>
            <Radio.Group
              className="flex flex-col gap-2 mb-4"
              onChange={(e) =>
                setSelectedShippingMethod(
                  fakeShippingMethods.find(
                    (method) => method.id === e.target.value
                  )
                )
              }
            >
              {fakeShippingMethods.map((method) => (
                <Radio value={method.id} key={method.id}>
                  {method.name} ({method.fee.toLocaleString()} VND)
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
              dataSource={fakeProducts}
              pagination={false}
              rowKey="id"
              bordered
              size="small"
            />
            <Divider />
            <div className="flex justify-between text-lg font-semibold">
              <span>Tổng cộng:</span>
              <span>{calculateTotal().toLocaleString()} VND</span>
            </div>
            <Button
              type="primary"
              block
              className="mt-4"
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
              size="large"
              onClick={handleOrderSubmit}
            >
              Xác nhận đặt hàng
            </Button>
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
          {fakeAddresses.map((address) => (
            <div
              key={address.id}
              className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedAddress(address);
                setFormData((prev) => ({
                  ...prev,
                  fullname: address.fullname,
                  phone: address.phone,
                  address: address.address,
                }));
                setIsAddressModalVisible(false);
              }}
            >
              <p className="font-semibold">{address.fullname}</p>
              <p>{address.phone}</p>
              <p>{address.address}</p>
            </div>
          ))}
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
