import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Radio, Select } from "antd";
import openApiService from "@services/open-api.service"; // Import dịch vụ API

// eslint-disable-next-line react/prop-types
const AddressFormDialog = ({ open, onClose, addressData }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh thành khi component được mount
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

  // Gọi API lấy danh sách tỉnh thành
  const fetchProvinces = async () => {
    try {
      const provincesData = await openApiService.getProvinces();
      setProvinces(provincesData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tỉnh thành:", error.message);
    }
  };

  // Gọi API lấy danh sách quận huyện theo tỉnh thành
  const fetchDistricts = async (provinceCode) => {
    try {
      const districtsData = await openApiService.getDistricts(provinceCode);
      setDistricts(districtsData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận huyện:", error.message);
    }
  };

  // Gọi API lấy danh sách xã phường theo quận huyện
  const fetchCommunes = async (districtCode) => {
    try {
      const communesData = await openApiService.getWards(districtCode);
      setCommunes(communesData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xã phường:", error.message);
    }
  };

  const handleProvinceChange = (value) => {
    fetchDistricts(value); // Lấy danh sách quận huyện khi tỉnh thành thay đổi
    form.setFieldsValue({ district: undefined, commune: undefined });
  };

  const handleDistrictChange = (value) => {
    fetchCommunes(value); // Lấy danh sách xã phường khi quận huyện thay đổi
    form.setFieldsValue({ commune: undefined });
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
      visible={open}
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
        layout="horizontal" // Layout ngang
        initialValues={{
          isDefault: false, // Mặc định không phải địa chỉ chính
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
              label: province.name,
              value: province.code,
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
              label: district.name,
              value: district.code,
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
            options={communes.map((commune) => ({
              label: commune.name,
              value: commune.code,
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
