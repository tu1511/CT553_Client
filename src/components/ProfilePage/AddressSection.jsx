import React, { useState } from "react";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog"; // Giả sử bạn đã tạo một modal để thêm/sửa địa chỉ
import { SquarePen, Trash2 } from "lucide-react";
// Giả sử bạn sử dụng react-feather để làm các icon

const AddressSection = () => {
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      fullname: "Nguyễn Văn A",
      phone: "0123456789",
      detail: "Số 1, Đường ABC, Phường XYZ",
      commune: "Phường 1",
      district: "Quận A",
      province: "Hồ Chí Minh",
      isDefault: true,
    },
    {
      fullname: "Trần Thị B",
      phone: "0987654321",
      detail: "Số 2, Đường DEF, Phường ZYX",
      commune: "Phường 2",
      district: "Quận B",
      province: "Hà Nội",
      isDefault: false,
    },
  ]);

  const handleClickOpen = (index = null) => {
    setEditAddress(index !== null ? addresses[index] : null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetDefault = (index) => {
    setAddresses((prev) =>
      prev.map((address, i) =>
        i === index
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  return (
    <div className="p-6">
      {/* Nút Thêm địa chỉ mới */}
      <button
        className="bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
        onClick={() => handleClickOpen()}
      >
        + Thêm địa chỉ mới
      </button>

      {/* Modal thêm/sửa địa chỉ */}
      <AddressFormDialog
        open={open}
        onClose={handleClose}
        addressData={editAddress}
      />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Danh sách địa chỉ</h2>
        {addresses.length > 0 ? (
          <div className="overflow-y-auto lg:max-h-96 max-h-full no-scrollbar">
            {addresses.map((address, index) => (
              <div key={index} className="border-t border-gray-300 py-5">
                <div className="flex justify-between">
                  {/* Hiển thị thông tin địa chỉ */}
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">
                        {address.fullname}
                      </h3>
                      <div className="border-r-2 border-gray-300 h-6 mx-4" />
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                    <p>{address.detail}</p>
                    <p>
                      {address.commune}, {address.district}, {address.province}
                    </p>
                    {address.isDefault && (
                      <span className="text-red-500 font-bold">Mặc định</span>
                    )}
                  </div>

                  {/* Các nút chức năng sửa, xóa, thiết lập mặc định */}
                  <div className="text-right items-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 hover:underline"
                      onClick={() => handleClickOpen(index)}
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>

                    {!address.isDefault && (
                      <>
                        <button
                          className="ml-4 text-red-500 hover:text-red-700 hover:underline"
                          onClick={() => handleDelete(index)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="block mt-2 text-gray-600 border border-gray-300 py-1 px-2 rounded hover:bg-gray-200"
                          onClick={() => handleSetDefault(index)}
                        >
                          Thiết lập mặc định
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có địa chỉ nào.</p>
        )}
      </div>
    </div>
  );
};

export default AddressSection;
