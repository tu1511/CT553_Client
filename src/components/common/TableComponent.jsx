import { useState, useEffect } from "react";
import { Table, Pagination, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency"; // Giả sử bạn có hàm formatCurrency
import { formatDate } from "@helpers/FormatDate";

const TableComponent = ({
  dataSource,
  columns,
  currentPage,
  ordersPerPage,
  onPageChange,
  onSearchChange,
  searchValue,
  showPagination = true,
  showSearch = false,
  showRowsPerPage = false, // Hiển thị lựa chọn số dòng trên mỗi trang
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(ordersPerPage); // Quản lý số dòng hiển thị mỗi trang

  // Hàm thay đổi số lượng dòng mỗi trang
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    onPageChange(1); // Quay lại trang 1 sau khi thay đổi số dòng
  };

  // Thêm tính năng tìm kiếm vào dữ liệu
  const filteredData = dataSource.filter((item) => {
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  // Cập nhật dataSource sau khi phân trang và lọc
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="mt-4 ">
      {/* Thanh tìm kiếm */}
      {showSearch && (
        <div className="text-right mb-4">
          <Input
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-1/3 p-2 border border-black rounded-md"
          />
        </div>
      )}

      {/* Bảng dữ liệu */}
      <Table
        columns={columns.map((col) => ({
          ...col,
          render: (text, record) => {
            if (col.dataIndex === "total") {
              return toVietnamCurrencyFormat(text);
            }
            if (col.dataIndex === "date") {
              return formatDate(text);
            }
            return text;
          },
        }))}
        dataSource={paginatedData} // Hiển thị dữ liệu đã phân trang
        rowKey="id"
        pagination={false} // Tắt pagination ở đây vì mình sẽ làm pagination thủ công
        className="border-separate table-auto w-full"
        style={{ borderCollapse: "separate" }}
        rowClassName="hover:bg-gray-100 transition-colors duration-200" // Hiệu ứng hover cho dòng
      />

      {/* Số dòng mỗi trang */}
      {showRowsPerPage && (
        <div className="my-4 flex justify-end px-4">
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: 120 }}
            className="border border-gray-300 rounded-md shadow-sm"
            options={[
              { label: "5", value: 5 },
              { label: "10", value: 10 },
              { label: "15", value: 15 },
            ]}
          />
        </div>
      )}

      {/* Phân trang */}
      {showPagination && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={rowsPerPage}
            total={filteredData.length}
            onChange={onPageChange}
            className="pagination"
          />
        </div>
      )}
    </div>
  );
};

TableComponent.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  ordersPerPage: PropTypes.number.isRequired,
  totalOrders: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  showPagination: PropTypes.bool,
  showSearch: PropTypes.bool,
  showRowsPerPage: PropTypes.bool,
};

export default TableComponent;
