import { useState } from "react";
import { Select, Input } from "antd";

const { Option } = Select;

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    material: "",
    gender: "",
    priceRange: "",
    searchText: "",
    sortBy: "",
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 p-4 border rounded-lg shadow-lg bg-gray-50">
        {/* Chất liệu */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Chất liệu
          </label>
          <Select
            placeholder="Chọn chất liệu"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("material", value)}
          >
            <Option value="">Tất cả</Option>
            <Option value="silver">Bạc</Option>
            <Option value="gold">Vàng</Option>
            <Option value="platinum">Bạch kim</Option>
          </Select>
        </div>

        {/* Giới tính */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Giới tính
          </label>
          <Select
            placeholder="Chọn giới tính"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("gender", value)}
          >
            <Option value="">Tất cả</Option>
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="unisex">Unisex</Option>
          </Select>
        </div>

        {/* Khoảng giá */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Khoảng giá
          </label>
          <Select
            placeholder="Chọn khoảng giá"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("priceRange", value)}
          >
            <Option value="">Tất cả</Option>
            <Option value="0-500000">0 - 500,000 VND</Option>
            <Option value="500000-1000000">500,000 - 1,000,000 VND</Option>
            <Option value="1000000-5000000">1,000,000 - 5,000,000 VND</Option>
          </Select>
        </div>

        {/* Tìm kiếm */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Tìm kiếm
          </label>
          <Input
            placeholder="Nhập từ khóa..."
            style={{ width: 200 }}
            onChange={(e) => handleFilterChange("searchText", e.target.value)}
          />
        </div>

        {/* Sắp xếp */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Sắp xếp
          </label>
          <Select
            placeholder="Sắp xếp theo"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("sortBy", value)}
          >
            <Option value="">Mặc định</Option>
            <Option value="priceAsc">Giá tăng dần</Option>
            <Option value="priceDesc">Giá giảm dần</Option>
            <Option value="newest">Mới nhất</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
