import { useEffect, useState } from "react";
import { Table, Radio, Button } from "antd";
import AddressFormDialog from "@components/ProfilePage/AddressFormDialog";
import { SquarePen } from "lucide-react";
import shippingService from "@services/shipping.service";

const AddressList = ({ addresses, onSelect, onFeeChange }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  // Khi component render, chọn địa chỉ mặc định (isDefault: true)
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
        onSelect(defaultAddress.id);
      }
    }
  }, [addresses]);

  const handleSelect = (id) => {
    setSelectedAddress(id);
    onSelect(id);
  };

  const handleEdit = (address) => {
    setEditAddress(address);
    setOpen(true);
  };

  const handleClose = () => {
    setEditAddress(null);
    setOpen(false);
  };

  const selectedAddressInfo = addresses.find(
    (addr) => addr.id === selectedAddress
  );

  const fetchFee = async () => {
    try {
      if (!selectedAddressInfo) return;

      const response = await shippingService.getFee({
        toDistrictId: selectedAddressInfo.districtId,
        toWardCode: selectedAddressInfo.wardCode,
        weightInGram: 200,
      });

      if (response?.metadata?.service_fee) {
        const newFee = response.metadata.service_fee;
        onFeeChange(newFee); // Truyền phí ship lên component cha
      }
    } catch (error) {
      console.error("Error fetching fee:", error);
    }
  };

  useEffect(() => {
    fetchFee();
  }, [selectedAddressInfo]);

  return (
    <div className="bg-white">
      <Table
        columns={[
          {
            title: "",
            key: "select",
            render: (_, record) => (
              <Radio
                checked={selectedAddress === record.id}
                onChange={() => handleSelect(record.id)}
              />
            ),
          },
          {
            title: "TÊN NGƯỜI NHẬN",
            dataIndex: "contactName",
            key: "contactName",
            render: (text, record) => (
              <div className="flex flex-col">
                <span>{text}</span>
                {record.isDefault && (
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full w-fit">
                    MẶC ĐỊNH
                  </span>
                )}
              </div>
            ),
          },
          {
            title: "SỐ ĐIỆN THOẠI",
            dataIndex: "contactPhone",
            key: "contactPhone",
          },
          {
            title: "TỈNH / THÀNH PHỐ",
            dataIndex: "provinceName",
            key: "provinceName",
          },
          {
            title: "QUẬN / HUYỆN",
            dataIndex: "districtName",
            key: "districtName",
          },
          { title: "XÃ / PHƯỜNG", dataIndex: "wardName", key: "wardName" },
          {
            title: "CHI TIẾT",
            dataIndex: "detailAddress",
            key: "detailAddress",
          },
          {
            title: "",
            key: "actions",
            render: (_, record) => (
              <Button type="link" onClick={() => handleEdit(record)}>
                <SquarePen size={20} />
              </Button>
            ),
          },
        ]}
        dataSource={addresses}
        rowKey="id"
        pagination={false}
        rowClassName={(record) =>
          record.id === selectedAddress ? "bg-yellow-100" : ""
        }
      />
      {selectedAddressInfo && (
        <div className="mt-4">
          <span className="text-black font-bold">Giao tới: </span>
          <span className="text-primary font-semibold italic">
            {selectedAddressInfo.contactName},{" "}
            {selectedAddressInfo.contactPhone},{" "}
            {selectedAddressInfo.detailAddress
              ? `${selectedAddressInfo.detailAddress}, `
              : ""}
            {selectedAddressInfo.wardName}, {selectedAddressInfo.districtName},{" "}
            {selectedAddressInfo.provinceName}
          </span>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <Button
          type="primary"
          style={{
            backgroundColor: "#c60018",
            borderColor: "#ffffff",
            color: "white",
          }}
          onClick={() => setOpen(true)}
        >
          + Thêm địa chỉ mới
        </Button>
      </div>
      <AddressFormDialog
        open={open}
        onClose={handleClose}
        addressData={editAddress}
      />
    </div>
  );
};

export default AddressList;
