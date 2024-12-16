import { Modal, Form, Input, Button } from "antd";

// eslint-disable-next-line react/prop-types
const FeedbackModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  // Xử lý submit form
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Gửi dữ liệu form lên component cha
        onSubmit(values);
        form.resetFields(); // Reset form sau khi submit
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  return (
    <Modal
      title="Ý kiến của bạn"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#c60018",
            borderColor: "#ffffff",
            color: "white",
          }}
        >
          Gửi ý kiến
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Tên */}
        <Form.Item
          label="Tên của bạn"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên của bạn!",
            },
          ]}
        >
          <Input placeholder="Nhập tên của bạn" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email của bạn!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>

        {/* Nội dung Ý kiến */}
        <Form.Item
          label="Ý kiến"
          name="feedback"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung ý kiến!",
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập ý kiến của bạn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;
