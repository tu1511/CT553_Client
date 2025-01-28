import { useEffect, useState } from "react";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog"; // Modal thêm/sửa địa chỉ
import { SquarePen, Trash2 } from "lucide-react";
import addressService from "@services/address.service";

const AddressSection = () => {
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  // Lấy danh sách địa chỉ từ API
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressService.getAll({ accessToken });
        setAddresses(response?.metadata || []);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
    fetchAddress();
  }, [accessToken]);

  // Mở modal thêm/sửa
  const handleClickOpen = (index = null) => {
    setEditAddress(index !== null ? addresses[index] : null);
    setOpen(true);
  };

  // Đóng modal
  const handleClose = async (newAddress) => {
    setOpen(false);
    if (newAddress) {
      if (editAddress) {
        // Sửa địa chỉ
        try {
          await addressService.update(editAddress.id, newAddress, {
            accessToken,
          });
          setAddresses((prev) =>
            prev.map((address) =>
              address.id === editAddress.id
                ? { ...address, ...newAddress }
                : address
            )
          );
        } catch (error) {
          console.error("Failed to update address:", error);
        }
      } else {
        // Thêm mới địa chỉ
        try {
          const response = await addressService.create(newAddress, {
            accessToken,
          });
          setAddresses((prev) => [...prev, response]);
        } catch (error) {
          console.error("Failed to add address:", error);
        }
      }
    }
    setEditAddress(null);
  };

  // Xóa địa chỉ
  const handleDelete = async (id) => {
    try {
      await addressService.delete(id, { accessToken });
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  // Thiết lập mặc định
  const handleSetDefault = async (id) => {
    try {
      await addressService.setDefault(id, { accessToken });
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === id
            ? { ...address, isDefault: true }
            : { ...address, isDefault: false }
        )
      );
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  return (
    <div className="p-8">
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
              <div key={address.id} className="border-t border-gray-300 py-5">
                <div className="flex justify-between">
                  {/* Hiển thị thông tin địa chỉ */}
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">
                        {address.contactName}
                      </h3>
                      <div className="border-r-2 border-gray-300 h-6 mx-4" />
                      <p className="text-gray-600">{address.contactPhone}</p>
                    </div>
                    <p>{address.detailAddress}</p>
                    <p>
                      {address.wardName}, {address.districtName},{" "}
                      {address.provinceName}
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
                          onClick={() => handleDelete(address.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="block mt-2 text-gray-600 border border-gray-300 py-1 px-2 rounded hover:bg-gray-200"
                          onClick={() => handleSetDefault(address.id)}
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
