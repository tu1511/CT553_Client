import HeaderLine from "@components/common/HeaderLine";
import VoucherCard from "@components/common/VoucherCard";
import couponService from "@services/coupon.service";
import { useEffect, useState } from "react";

const CouponsSection = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponService.getAll();
        setCoupons(response.metadata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupons();
  }, []);

  if (coupons.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto p-4">
      <HeaderLine title="Mã giảm giá" />
      <div className="mt-4">
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          <div className="flex gap-4 ">
            {coupons.map((coupon) => (
              <div key={coupon.voucherId} className="flex-shrink-0">
                <VoucherCard voucher={coupon} checkCollected={null} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
