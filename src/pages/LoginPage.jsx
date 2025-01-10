import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginThunk } from "@redux/thunk/authThunk"; // Import your Redux thunk

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSuccess = async (values) => {
    try {
      setLoading(true);
      // Dispatch the login action
      await dispatch(loginThunk(values));

      toast.success("Đăng nhập thành công!");

      // Redirect to homepage or another route after successful login
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message === "Invalid credentials"
          ? "Email hoặc mật khẩu không đúng!"
          : "Đăng nhập không thành công!";
      toast.error(message);
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
            src="/src/assets/login.png"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form đăng nhập */}
        <div className="w-full lg:w-1/2 p-8">
          <Title level={2} className="text-center">
            Đăng Nhập
          </Title>

          <Form form={form} layout="vertical" onFinish={onSuccess}>
            {/* Email */}
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
              <Input />
            </Form.Item>

            {/* Mật khẩu */}
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>

            {/* Nút đăng nhập */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
                style={{
                  backgroundColor: "#c60018",
                  borderColor: "#ffffff",
                  color: "white",
                }}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>

          {/* Link đăng ký */}
          <div className="text-center">
            <Text>
              Chưa có tài khoản?{" "}
              <Link to="/dang-ky" className="text-blue-500 hover:text-primary">
                Đăng ký
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
