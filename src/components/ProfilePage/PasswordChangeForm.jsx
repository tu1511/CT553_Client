import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  changePasswordThunk,
  getLoggedInUser,
} from "@redux/thunk/accountThunk"; // Thunk redux
import HeaderLine from "@components/common/HeaderLine";

const PasswordChangeForm = () => {
  const dispatch = useDispatch(); // Giả sử dùng Redux để dispatch action
  const user = {
    id: 1,
    username: "user@example.com",
    loginMethod: "normal", // Thay đổi thành "google" hoặc "normal" để thử nghiệm
  };
  const [form] = Form.useForm();
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.loginMethod === "google") {
      setIsGoogleLogin(true);
    }
  }, [user]);

  const accessToken = localStorage.getItem("accessToken");

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setIsLoading(true);

      // Kiểm tra mật khẩu hợp lệ và dispatch thay đổi mật khẩu
      const response = await dispatch(
        changePasswordThunk({
          passwordData: { password: newPassword },
          accessToken,
        })
      ).unwrap();

      toast.success("Mật khẩu đã được thay đổi thành công");

      // Đặt lại giá trị form và mật khẩu
      setNewPassword("");
      setConfirmPassword("");

      // Cập nhật lại thông tin người dùng sau khi thay đổi mật khẩu
      dispatch(getLoggedInUser(accessToken)); // Lấy lại thông tin người dùng nếu cần
    } catch (error) {
      console.error(error);
      toast.error("Đổi mật khẩu thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isGoogleLogin ? (
        <div className="p-8">
          <p className="text-gray-800">
            Bạn không thể thay đổi mật khẩu khi đăng nhập bằng Google.
          </p>
        </div>
      ) : (
        <div className="px-8">
          <HeaderLine title="Thay đổi mật khẩu" />
          <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isGoogleLogin}
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ]}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isGoogleLogin}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isGoogleLogin || isLoading}
                loading={isLoading}
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
