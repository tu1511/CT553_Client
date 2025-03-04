import { useEffect, useState } from "react";
import VoucherCard from "@components/common/VoucherCard";
import { Button } from "antd";
import { Link } from "react-router-dom";
import couponService from "@services/coupon.service";

const VoucherManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponService.getCollected(accessToken);
        console.log("response", response);
        setCoupons(response.metadata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupons();
  }, [accessToken]);

  console.log("coupons", coupons);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
        Kho Vouchers
      </h2>

      {coupons?.coupon?.length === 0 ? (
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
          {coupons?.coupon?.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoucherManagement;
