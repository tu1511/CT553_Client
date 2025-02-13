import { useEffect, useState } from "react";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog"; // Modal thêm/sửa địa chỉ
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddressThunk,
  getUserAddressThunk,
} from "@redux/thunk/addressThunk";
import { toast } from "react-toastify";

const AddressSection = () => {
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch, accessToken]);

  console.log(addresses);

  // Mở modal thêm/sửa
  const handleClickOpen = (index = null) => {
    const addressData = index !== null ? addresses[index] : null;
    setEditAddress(addressData);
    setOpen(true);

    console.log("👉 Dữ liệu trước khi mở modal:", addressData); // Log dữ liệu ngay trước khi cập nhật
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
  };

  // Xóa địa chỉ
  const handleDelete = async (index) => {
    try {
      await dispatch(deleteAddressThunk({ id: index, accessToken }));
      dispatch(getUserAddressThunk(localStorage.getItem("accessToken")));
      toast.success("Xóa địa chỉ thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa địa chỉ:", error);
      toast.error("Không thể xóa địa chỉ. Vui lòng thử lại!");
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
                        {/* <button
                          className="block mt-2 text-gray-600 border border-gray-300 py-1 px-2 rounded hover:bg-gray-200"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          Thiết lập mặc định
                        </button> */}
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
