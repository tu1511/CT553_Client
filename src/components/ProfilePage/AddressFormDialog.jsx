import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Radio, Select } from "antd";
import addressService from "@services/address.service"; // Import dịch vụ API

const AddressFormDialog = ({ open, onClose, addressData }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (addressData) {
      form.setFieldsValue({
        fullname: addressData.fullname,
        phone: addressData.phone,
        detail: addressData.detail,
        commune: addressData.commune,
        district: addressData.district,
        province: addressData.province,
        isDefault: addressData.isDefault,
      });
    } else {
      form.resetFields();
    }
  }, [addressData, form]);

  const fetchProvinces = async () => {
    try {
      const provincesData = await addressService.getProvinces();
      setProvinces(provincesData?.metadata || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tỉnh thành:", error.message);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const districtsData = await addressService.getDistricts(provinceId);
      setDistricts(districtsData?.metadata || []);
      setWards([]); // Reset danh sách xã/phường
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận huyện:", error.message);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const wardsData = await addressService.getWards(districtId);
      setWards(wardsData?.metadata || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xã phường:", error.message);
    }
  };

  const handleProvinceChange = (value) => {
    fetchDistricts(value); // Gọi API với ProvinceID
    form.setFieldsValue({ district: undefined, commune: undefined }); // Reset giá trị
  };

  const handleDistrictChange = (value) => {
    fetchWards(value); // Gọi API với DistrictID
    form.setFieldsValue({ commune: undefined }); // Reset giá trị
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Dữ liệu địa chỉ:", values);
        onClose();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={addressData ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          style={{
            backgroundColor: "#c60012",
            borderColor: "#ffffff",
            color: "white",
          }}
        >
          Tạo địa chỉ
        </Button>,
      ]}
      width={750}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={{
          isDefault: false,
        }}
      >
        <Form.Item
          label="Họ tên"
          name="fullname"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh thành!" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Select
            onChange={handleProvinceChange}
            placeholder="Chọn tỉnh thành"
            options={provinces.map((province) => ({
              label: province.ProvinceName,
              value: province.ProvinceID,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận huyện!" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Select
            onChange={handleDistrictChange}
            placeholder="Chọn quận huyện"
            options={districts.map((district) => ({
              label: district.DistrictName,
              value: district.DistrictID,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Xã/Phường"
          name="commune"
          rules={[{ required: true, message: "Vui lòng chọn xã phường!" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Select
            placeholder="Chọn xã phường"
            options={wards.map((commune) => ({
              label: commune.WardName, // Sửa để phù hợp với API
              value: commune.WardCode,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Địa chỉ chi tiết"
          name="detail"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ chi tiết!" },
          ]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Chọn làm địa chỉ mặc định"
          name="isDefault"
          valuePropName="checked"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Radio />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressFormDialog;
