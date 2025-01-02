import { useState, useEffect } from "react";
import TableComponent from "@components/common/TableComponent";
import { Button, Select } from "antd";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { formatDate } from "@helpers/FormatDate";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const StatusFilterButtons = ({ filterStatus, handleStatusChange }) => {
  const statusList = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xử lý", value: "processing" },
    { label: "Đang vận chuyển", value: "shipping" },
    { label: "Đã giao hàng", value: "delivered" },
    { label: "Đã hủy", value: "cancelled" },
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
  const [ordersData, setOrdersData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [paginationModel, setPaginationModel] = useState({
    current: 1,
    pageSize: 5,
  });

  // Giả lập dữ liệu đơn hàng
  useEffect(() => {
    const fakeOrdersData = [
      {
        id: "1",
        orderCode: "OD123456",
        status: "processing",
        total: 100000,
        date: "2024-12-10",
      },
      {
        id: "2",
        orderCode: "OD123457",
        status: "delivered",
        total: 200000,
        date: "2024-12-08",
      },
      {
        id: "3",
        orderCode: "OD123458",
        status: "delivered",
        total: 150000,
        date: "2024-12-05",
      },
      {
        id: "4",
        orderCode: "OD123459",
        status: "processing",
        total: 120000,
        date: "2024-12-01",
      },
      {
        id: "5",
        orderCode: "OD123460",
        status: "cancelled",
        total: 50000,
        date: "2024-11-28",
      },
      {
        id: "6",
        orderCode: "OD123461",
        status: "shipping",
        total: 90000,
        date: "2024-11-20",
      },
    ];
    setOrdersData(fakeOrdersData);
  }, []);

  // Xử lý lọc trạng thái
  const handleStatusChange = (status) => setFilterStatus(status);

  // Xử lý sắp xếp
  const handleSortChange = (order) => setSortOrder(order);

  // Xử lý phân trang
  const handlePaginationChange = ({ current, pageSize }) => {
    setPaginationModel({ current, pageSize });
  };

  // Lọc và sắp xếp dữ liệu
  const filteredData = ordersData.filter((order) =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusClasses = {
          processing: "text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full",
          shipping: "text-blue-500 bg-blue-100 px-2 py-1 rounded-full",
          delivered: "text-green-500 bg-green-100 px-2 py-1 rounded-full",
          cancelled: "text-red-500 bg-red-100 px-2 py-1 rounded-full",
        };

        return (
          <span className={`${statusClasses[status] || "text-black"}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => toVietnamCurrencyFormat(total),
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Thanh công cụ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Bộ lọc trạng thái */}
        <StatusFilterButtons
          filterStatus={filterStatus}
          handleStatusChange={handleStatusChange}
        />

        {/* Sắp xếp theo ngày */}
        <Select
          defaultValue="newest"
          style={{ width: 200 }}
          onChange={handleSortChange}
        >
          <Option value="newest">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
        </Select>
      </div>

      {/* Bảng đơn hàng */}
      <TableComponent
        loading={false}
        rows={sortedData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationChange={handlePaginationChange}
        checkbox={false} // Ẩn checkbox chọn dòng
      />
    </div>
  );
};

export default OrderHistory;
