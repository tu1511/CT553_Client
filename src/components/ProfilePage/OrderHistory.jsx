import { useState, useEffect } from "react";
import { Table, Button, Select, Modal, Divider } from "antd";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { formatDate } from "@helpers/FormatDate";
import orderService from "@services/order.service";
import { EllipsisVertical } from "lucide-react";
import { formatDateTime } from "@helpers/formatDateTime";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import paymentService from "@services/payment.service";

const { Option } = Select;

const STATUS_MAP = {
  AWAITING_CONFIRM: "Chờ xác nhận",
  AWAITING_FULFILLMENT: "Chờ xử lý",
  DELIVERING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELED: "Đã hủy",
  // RETURNED: "Đã trả hàng",
};

const PAYMENT_STATUS_MAP = {
  PENDING: "Chưa thanh toán",
  SUCCESS: "Đã thanh toán",
  FAILED: "Thất bại",
};

const statusClasses = {
  AWAITING_CONFIRM: "text-gray-600 bg-gray-200 px-2 py-1 rounded-full",
  AWAITING_FULFILLMENT: "text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full",
  DELIVERING: "text-blue-500 bg-blue-100 px-2 py-1 rounded-full",
  DELIVERED: "text-green-500 bg-green-100 px-2 py-1 rounded-full",
  CANCELED: "text-red-500 bg-red-100 px-2 py-1 rounded-full",
  // RETURNED: "text-purple-500 bg-purple-100 px-2 py-1 rounded-full",
};

const statusPaymentClasses = {
  PENDING: "text-blue-500 bg-blue-100 px-2 py-1 rounded-full",
  SUCCESS: "text-green-500 bg-green-100 px-2 py-1 rounded-full",
  FAILED: "text-red-500 bg-red-100 px-2 py-1 rounded-full",
};

const StatusFilterButtons = ({ filterStatus, handleStatusChange }) => {
  const statusList = [
    { label: "Tất cả", value: "all" },
    ...Object.entries(STATUS_MAP).map(([key, label]) => ({
      value: key,
      label,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusList.map((status) => (
        <Button
          key={status.value}
          type={filterStatus === status.value ? "primary" : "default"}
          onClick={() => handleStatusChange(status.value)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};

const OrderHistory = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrderByBuyId(
          accessToken,
          0,
          1000
        );
        setOrders(response.metadata?.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [accessToken]);

  const handleStatusChange = (status) => setFilterStatus(status);
  const handleSortChange = (order) => setSortOrder(order);
  const handleTableChange = (pagination) => setPagination(pagination);
  const showOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const filteredData = orders.filter((order) =>
    filterStatus === "all" ? true : order.currentStatus.name === filterStatus
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "id",
      key: "id",
      width: 130,
      render: (id) => <span className="text-blue-600">{`#${id}`}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "currentStatus",
      key: "currentStatus",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full ${
            statusClasses[status?.name] || "text-gray-600 bg-gray-200"
          }`}
        >
          {STATUS_MAP[status?.name] || "Không xác định"}
        </span>
      ),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (
        <span
          className={`px-2 py-1 rounded-full ${
            statusPaymentClasses[payment?.paymentStatus?.name] ||
            "text-gray-600 bg-gray-200"
          }`}
        >
          {PAYMENT_STATUS_MAP[payment?.paymentStatus?.name] || "Không xác định"}
        </span>
      ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: toVietnamCurrencyFormat,
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: formatDate,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <EllipsisVertical
          className="cursor-pointer"
          onClick={() => showOrderDetail(record)}
        />
      ),
    },
  ];

  const productData = selectedOrder?.orderDetail.map((item) => ({
    key: item.variant?.id,
    images: item.variant?.product?.images[0]?.image?.path,
    productName: item.variant?.product?.name,
    size: item.variant?.size,
    quantity: item?.quantity,
    price: item?.price,
    discount: item.variant?.product.productDiscount?.[0]?.discountValue || 0,
  }));

  console.log("selectedOrder", selectedOrder);

  const handlePayment = async (orderId) => {
    const paymentData = {
      orderId: orderId,
      amount: selectedOrder.finalPrice,
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
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <StatusFilterButtons
          filterStatus={filterStatus}
          handleStatusChange={handleStatusChange}
        />
        <Select
          defaultValue="newest"
          style={{ width: 200 }}
          onChange={handleSortChange}
        >
          <Option value="newest">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={sortedData}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <Modal
          title={
            <div className="text-2xl font-semibold text-gray-800">
              Chi tiết đơn hàng{" "}
              <span className="text-blue-600">#{selectedOrder.id}</span>
            </div>
          }
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1000}
          className="custom-modal"
        >
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong className="text-gray-900">Người mua:</strong>{" "}
                {selectedOrder.buyer.fullName}
              </p>
              <p>
                <strong className="text-gray-900">Ngày đặt hàng:</strong>{" "}
                {formatDateTime(selectedOrder.createdAt)}
              </p>

              <p>
                <strong className="text-gray-900">Email:</strong>{" "}
                {selectedOrder.buyer.email}
              </p>
              <p>
                <strong className="text-gray-900">Điện thoại:</strong>{" "}
                {selectedOrder.deliveryAddress.contactPhone}
              </p>

              <p>
                <strong className="text-gray-900">
                  Phương thức thanh toán:
                </strong>{" "}
                {selectedOrder.payment.paymentMethod.name}
              </p>
              <p>
                <strong className="text-gray-900">Địa chỉ giao hàng:</strong>{" "}
                {selectedOrder.deliveryAddress.detailAddress},{" "}
                {selectedOrder.deliveryAddress.wardName},{" "}
                {selectedOrder.deliveryAddress.districtName},{" "}
                {selectedOrder.deliveryAddress.provinceName}
              </p>
              <p>
                <strong className="text-gray-900">
                  Trạng thái thanh toán:
                </strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${
                    statusPaymentClasses[
                      selectedOrder?.payment?.paymentStatus?.name
                    ] || "text-gray-600 bg-gray-200"
                  }`}
                >
                  {PAYMENT_STATUS_MAP[selectedOrder.payment.paymentStatus.name]}
                </span>
              </p>
              {selectedOrder.payment.paymentStatus.name !== "SUCCESS" && (
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#c60018",
                    borderColor: "#ffffff",
                    color: "white",
                  }}
                  onClick={() => {
                    handlePayment(selectedOrder.id);
                  }}
                >
                  Thanh toán lại
                </Button>
              )}
            </div>

            <Divider />

            <h3 className="text-lg font-semibold text-gray-900">
              Chi tiết đơn hàng
            </h3>
            <Table
              columns={[
                {
                  title: "Hình ảnh",
                  dataIndex: "images",
                  key: "images",
                  render: (images, record, index) => {
                    const productSlug =
                      selectedOrder?.orderDetail[index]?.variant?.product?.slug; // Lấy phần tử đầu tiên của variant
                    return (
                      <Link to={productSlug ? `/san-pham/${productSlug}` : "#"}>
                        <div className="flex justify-center">
                          <img
                            src={images}
                            alt="product"
                            className="w-16 h-16 rounded-md shadow-sm border"
                          />
                        </div>
                      </Link>
                    );
                  },
                },
                {
                  title: "Tên sản phẩm",
                  dataIndex: "productName",
                  key: "productName",
                  render: (productName, record, index) => {
                    const productSlug =
                      selectedOrder?.orderDetail[index]?.variant?.product?.slug; // Lấy phần tử đầu tiên của variant
                    return (
                      <Link to={productSlug ? `/san-pham/${productSlug}` : "#"}>
                        <div className="flex items-center">
                          <span>{productName}</span>
                        </div>
                      </Link>
                    );
                  },
                },
                {
                  title: "Size",
                  dataIndex: "size",
                  key: "size",
                  align: "center",
                },
                {
                  title: "Số lượng",
                  dataIndex: "quantity",
                  key: "quantity",
                  align: "center",
                },
                {
                  title: "Giá",
                  dataIndex: "price",
                  key: "price",
                  render: toVietnamCurrencyFormat,
                  align: "right",
                },
              ]}
              dataSource={productData}
              pagination={false}
              className="custom-table"
            />

            <Divider />
            <div className="space-y-2 text-lg">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-700">Tổng tiền:</span>
                <span className="text-black font-semibold">
                  {toVietnamCurrencyFormat(selectedOrder.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-700">Giá giảm:</span>
                <span className="text-black font-medium">
                  {toVietnamCurrencyFormat(selectedOrder?.totalDiscount)}
                </span>
              </div>

              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-700">Phí giao hàng:</span>
                <span className="text-black font-medium">
                  {toVietnamCurrencyFormat(selectedOrder?.shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-900">Thành tiền:</span>
                <span className="text-primary">
                  {toVietnamCurrencyFormat(selectedOrder.finalPrice)}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;
