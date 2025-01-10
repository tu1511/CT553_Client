import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "@redux/thunk/authThunk";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

const UserProfileForm = () => {
  // State cục bộ để lưu thông tin người dùng
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    // avatar: "",
  });

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.authUser);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken && !userData) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [accessToken, dispatch, userData]);

  // Cập nhật state cục bộ khi dữ liệu từ Redux thay đổi
  useEffect(() => {
    if (userData) {
      setUser({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "Nam",
        birthday: userData.birthday || "",
        avatar:
          userData.avatar ||
          `https://ui-avatars.com/api/?name=${userData.fullName}&size=128`,
      });
    }
  }, [userData]);

  // Xử lý thay đổi thông tin người dùng
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Xử lý thay đổi ảnh đại diện
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý khi người dùng nhấn Cập Nhật
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin đã cập nhật:", user);
    toast.success("Thông tin tài khoản đã được cập nhật thành công!");
  };

  // Xử lý khi người dùng nhấn Hủy
  const handleCancel = () => {
    toast.error("Đã hủy cập nhật thông tin tài khoản.");
  };

  return (
    <div className="bg-white p-8">
      <div className="flex gap-8 items-start">
        {/* Avatar */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-72 h-72 rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-6 border-2 bg-white text-black p-2 rounded-full cursor-pointer hover:bg-primary-700"
              title="Thay đổi ảnh đại diện"
            >
              <Camera size={50} />
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <p className="text-gray-600 mt-4">Nhấn vào ảnh để thay đổi</p>
        </div>

        {/* Form */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Thông Tin Tài Khoản
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/** Form field rendering */}
            {[
              {
                label: "Họ và Tên",
                name: "fullName",
                type: "text",
                value: user.fullName,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                value: user.email,
              },
              {
                label: "Số Điện Thoại",
                name: "phone",
                type: "tel",
                value: user.phone,
              },
              {
                label: "Ngày Sinh",
                name: "birthday",
                type: "date",
                value: user.birthday,
              },
            ].map(({ label, name, type, value }) => (
              <div key={name} className="flex items-center gap-4">
                <label className="w-1/3 text-gray-600 font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder={`Nhập ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}

            {/* Giới Tính */}
            <div className="flex items-center gap-4">
              <label className="w-1/3 text-gray-600 font-medium">
                Giới Tính
              </label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            {/* Nút Cập Nhật và Hủy */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Cập Nhật Thông Tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
