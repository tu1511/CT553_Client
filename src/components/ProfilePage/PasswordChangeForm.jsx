import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";

// eslint-disable-next-line react/prop-types
const PasswordChangeForm = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = {
    id: 1,
    username: "user@example.com",
    loginMethod: "normal", // Thay đổi thành "google" hoặc "normal" để thử nghiệm
  };
  const [form] = Form.useForm();
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  useEffect(() => {
    // Kiểm tra xem người dùng có đăng nhập bằng Google không
    if (user?.loginMethod === "google") {
      setIsGoogleLogin(true);
    }
  }, [user]);

  // eslint-disable-next-line no-unused-vars
  const handlePasswordChange = (values) => {
    if (isGoogleLogin) {
      message.warning(
        "Bạn không thể thay đổi mật khẩu khi đăng nhập bằng Google."
      );
      return;
    }
    message.success("Mật khẩu đã được thay đổi thành công!");
  };

  return (
    <>
      {isGoogleLogin ? (
        <p style={{ color: "red" }}>
          Bạn không thể thay đổi mật khẩu khi đăng nhập bằng Google.
        </p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            Thay Đổi Mật Khẩu
          </h2>
          <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
              ]}
            >
              <Input.Password disabled={isGoogleLogin} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
              ]}
            >
              <Input.Password disabled={isGoogleLogin} />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password disabled={isGoogleLogin} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isGoogleLogin}
                style={{
                  backgroundColor: "#c60012",
                  borderColor: "#ffffff",
                  color: "white",
                }}
              >
                Thay đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default PasswordChangeForm;
