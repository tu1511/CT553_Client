import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginThunk } from "@redux/thunk/authThunk";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@config/firebaseConfig";
import authService from "@services/auth.service";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSuccess = async (values) => {
    try {
      setLoading(true);
      await dispatch(loginThunk(values));
      toast.success("Đăng nhập thành công!");
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      console.log("Thông tin đăng nhập Google:", user);

      // Gửi token lên backend để xác thực nếu cần
      const userData = {
        email: user.email,
        fullName: user.displayName,
        phone: user.phoneNumber || "",
        avatarURL: user.photoURL,
      };

      const response = await authService.signInWithGoogle(userData);

      console.log("Dữ liệu trả về từ API:", response);

      localStorage.setItem(
        "accessToken",
        response?.metadata?.tokens?.accessToken
      );

      toast.success("Đăng nhập bằng Google thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error?.data?.message);
      if (error?.data?.message === "Account is blocked") {
        toast.error("Tài khoản của bạn đã bị khóa!");
      } else {
        toast.error("Đăng nhập bằng Google thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:block w-1/2 bg-secondary p-4">
          <img
            src="/src/assets/login.png"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <Title level={2} className="text-center">
            Đăng Nhập
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onSuccess}
            className="space-y-4"
          >
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
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
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
            <div className="text-center mt-2">hoặc</div>
            <div className="flex justify-center mt-4">
              <Button
                className="w-full flex items-center justify-center bg-white border border-gray-300 hover:border-gray-500 hover:shadow-md p-3 rounded-full transition duration-300"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img
                  src="https://img.icons8.com/color/48/google-logo.png"
                  className="w-6 h-6 mr-2"
                  alt="Google logo"
                />
                <span className="font-medium text-gray-700">
                  Đăng nhập bằng Google
                </span>
              </Button>
            </div>
          </Form>
          <div className="text-center mt-2">
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
