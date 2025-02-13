import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import authService from "@services/auth.service";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { fullName, email, password, phone } = values;

      // Gọi API đăng ký
      await authService.register({ fullName, email, password, phone });

      toast.success("Đăng ký thành công!");
      navigate("/dang-nhap"); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hình minh họa */}
        <div className="hidden lg:block w-1/2 bg-secondary p-4">
          <img
            src="/src/assets/register.png"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form đăng ký */}
        <div className="w-full lg:w-1/2 p-6">
          <Title level={2} className="text-center">
            Đăng Ký Tài Khoản
          </Title>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Họ và Tên"
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên!" },
                { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự!" },
              ]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
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
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu nhập lại không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{
                  backgroundColor: "#c60018",
                  borderColor: "#ffffff",
                  color: "white",
                }}
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Text>
              Đã có tài khoản?{" "}
              <Link
                to="/dang-nhap"
                className="hover:text-primary text-blue-500"
              >
                Đăng nhập
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
