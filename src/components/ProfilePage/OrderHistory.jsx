import React, { useState, useEffect } from "react";
import TableComponent from "@components/common/TableComponent";
import { Button, Select } from "antd";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency"; // Hàm format tiền tệ

// Component nút trạng thái
const StatusFilterButtons = ({ filterStatus, handleStatusChange }) => {
  const statusList = [
    { label: "Tất cả", value: "all", color: "blue" },
    { label: "Chờ xử lý", value: "processing", color: "yellow" },
    { label: "Đang vận chuyển", value: "shipping", color: "blue" },
    { label: "Đã giao hàng", value: "delivered", color: "green" },
    { label: "Đã hủy", value: "cancelled", color: "red" },
  ];

  return (
    <div className="flex space-x-2">
      {statusList.map((status) => (
        <Button
          key={status.value}
          onClick={() => handleStatusChange(status.value)}
          className={`${
            filterStatus === status.value
              ? `bg-${status?.color}-500 text-white`
              : "bg-white text-black"
          } px-4 py-2 rounded transition duration-200`}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};

// Component chính
const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số dòng mỗi trang
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

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
      // Thêm đơn hàng tại đây
    ];
    setOrdersData(fakeOrdersData);
  }, []);

  // Xử lý thay đổi trạng thái lọc
  const handleStatusChange = (status) => setFilterStatus(status);

  // Xử lý sắp xếp đơn hàng
  const handleSortChange = (order) => setSortOrder(order);

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
    { title: "Mã Đơn Hàng", dataIndex: "orderCode", key: "orderCode" },
    { title: "Trạng Thái", dataIndex: "status", key: "status" },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => toVietnamCurrencyFormat(text),
    },
    { title: "Ngày Đặt Hàng", dataIndex: "date", key: "date" },
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Thanh công cụ */}
      <div className="flex justify-between items-center mb-4">
        {/* Lọc trạng thái */}
        <StatusFilterButtons
          filterStatus={filterStatus}
          handleStatusChange={handleStatusChange}
        />

        {/* Lọc theo ngày */}
        <Select
          defaultValue="newest"
          style={{ width: 150 }}
          onChange={handleSortChange}
        >
          <Select.Option value="newest">Mới nhất</Select.Option>
          <Select.Option value="oldest">Cũ nhất</Select.Option>
        </Select>
      </div>

      {/* Bảng dữ liệu */}
      <TableComponent
        dataSource={sortedData}
        columns={columns}
        currentPage={currentPage}
        ordersPerPage={ordersPerPage}
        totalOrders={sortedData.length}
        onPageChange={setCurrentPage}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterStatus={filterStatus}
        showSearch={true}
        showPagination={true}
        showRowsPerPage={true}
      />
    </div>
  );
};

export default OrderHistory;
