import { useState } from "react";
import PropTypes from "prop-types";
import { Table, Input, Skeleton } from "antd";

const { Search } = Input;

const TableComponent = ({
  loading,
  rows,
  columns,
  paginationModel,
  checkbox = true,
  handleSelected = () => {},
  onPaginationChange = () => {}, // Callback khi phân trang thay đổi
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Giá trị tìm kiếm

  const rowSelection = checkbox
    ? {
        selectedRowKeys,
        onChange: (keys) => {
          setSelectedRowKeys(keys);
          handleSelected(keys);
        },
      }
    : undefined;

  // Lọc dữ liệu dựa trên giá trị tìm kiếm
  const filteredRows = rows?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return (
    <div style={{ width: "100%" }}>
      {/* Header Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div></div>
        <Search
          placeholder="Tìm kiếm..."
          allowClear
          style={{ width: 300 }}
          value={searchValue} // Giá trị tìm kiếm hiển thị
          onChange={(e) => setSearchValue(e.target.value)} // Cập nhật ngay lập tức khi người dùng nhập
        />
      </div>

      {/* Table */}
      <Table
        loading={loading}
        dataSource={filteredRows} // Sử dụng dữ liệu đã lọc
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          pageSize: paginationModel.pageSize || 10,
          current: paginationModel.current || 1,
          total: filteredRows?.length, // Tổng số dữ liệu sau khi lọc
          pageSizeOptions: ["5", "10", "15"], // Danh sách tùy chọn số dòng
          showSizeChanger: true, // Hiển thị nút thay đổi số dòng mỗi trang
          onChange: (page, pageSize) =>
            onPaginationChange({ current: page, pageSize }),
        }}
        rowKey={(record) => record.key || record.id || record._id}
        locale={{
          emptyText: loading ? <Skeleton active /> : "Không có dữ liệu",
        }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        style={{
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
      {/* Custom Row Styles */}
      <style>
        {`
          .even-row {
            background-color: #eef2fd;
          }
          .odd-row {
            background-color: #ffffff;
          }
          .ant-table-thead > tr > th {
            font-weight: bold;
            font-size: 16px;
            text-align: center;
          }
          .ant-table-tbody > tr > td {
            font-size: 14px;
          }
          .ant-input-search {
            background-color: white;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

TableComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  paginationModel: PropTypes.object.isRequired,
  handleSelected: PropTypes.func,
  onPaginationChange: PropTypes.func, // Hàm callback khi phân trang thay đổi
  checkbox: PropTypes.bool,
};

export default TableComponent;
