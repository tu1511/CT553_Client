import { useEffect, useState } from "react";
import VoucherCard from "@components/common/VoucherCard";
import { Button } from "antd";
import { Link } from "react-router-dom";
import couponService from "@services/coupon.service";
import HeaderLine from "@components/common/HeaderLine";

const VoucherManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponService.getCollected(accessToken);
        console.log("response", response);
        const unusedCoupons = response.metadata.filter(
          (coupon) => !coupon.used
        );

        setCoupons(unusedCoupons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupons();
  }, [accessToken]);

  console.log("coupons", coupons);

  return (
    <div className="max-w-6xl mx-auto px-8">
      <HeaderLine title="Quản lý Coupon" />

      {coupons?.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-gray-600 text-sm font-medium italic mb-4">
            Không có voucher nào còn hiệu lực hoặc đã hết số lượng.
          </p>
          <Link to="/">
            <Button
              type="primary"
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
            >
              Thu thập ngay
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coupons?.map((coupon) => (
            <VoucherCard
              key={coupon.id}
              voucher={coupon.coupon}
              checkCollected={coupon.accountId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoucherManagement;
