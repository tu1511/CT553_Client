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

  console.log("coupons", coupons);
  return (
    <section className="container mx-auto p-4">
      <HeaderLine title="Mã giảm giá" />
      <div className="">
        <div className="grid grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <VoucherCard key={coupon.voucherId} voucher={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
