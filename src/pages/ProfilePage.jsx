import Breadcrumbs from "@components/common/Breadcrumbs";
import AddressSection from "@components/ProfilePage/AddressSection";
import OrderHistory from "@components/ProfilePage/OrderHistory";
import PasswordChangeForm from "@components/ProfilePage/PasswordChangeForm";
import UserProfileForm from "@components/ProfilePage/UserProfileForm";
import VoucherManagement from "@components/ProfilePage/VoucherManagement";
import {
  CircleUser,
  Gift,
  Lock,
  MapPinHouse,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "profile";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  // const [user] = useState(fakeUser);
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.account.account);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: "profile", label: "Hồ Sơ", icon: <CircleUser /> },
    { id: "address", label: "Địa Chỉ", icon: <MapPinHouse /> },
    { id: "change-password", label: "Đổi Mật Khẩu", icon: <Lock /> },
    { id: "orders", label: "Đơn Mua", icon: <ShoppingCart /> },
    { id: "vouchers", label: "Kho Vouchers", icon: <Gift /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return <UserProfileForm />;
      case "update-profile":
        return <UserProfileForm />;
      case "address":
        return <AddressSection />;
      case "change-password":
        return <PasswordChangeForm />;
      case "orders":
        return <OrderHistory />;
      case "vouchers":
        return <VoucherManagement />;
      default:
        return <UserProfileForm />;
    }
  };

  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Thông tin tài khoản", path: "/tai-khoan" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container mx-auto pb-6 px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-4">
              <img
                src={
                  user?.avatarImagePath
                    ? user.avatarImagePath.startsWith("http")
                      ? user.avatarImagePath
                      : `http://localhost:5000/${user.avatarImagePath.replace(
                          /\\/g,
                          "/"
                        )}`
                    : `https://ui-avatars.com/api/?name=${user?.fullName}&size=128`
                }
                alt="User avatar"
                className="mx-auto rounded-full mb-2 size-24 border-2 border-primary"
              />
              <p className="text-lg font-bold">
                {user?.fullName || "Người dùng"}
              </p>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setSelectedTab("update-profile")}
              >
                Sửa Hồ Sơ
              </button>
            </div>
            <ul className="space-y-3">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                      selectedTab === tab.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.icon} <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
