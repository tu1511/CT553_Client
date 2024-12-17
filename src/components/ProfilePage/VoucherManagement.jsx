import { useState } from "react";
import VoucherCard from "@components/common/VoucherCard";
import { Button } from "antd";
import { Link } from "react-router-dom";

const VoucherManagement = () => {
  const [vouchers] = useState([
    {
      id: 1,
      code: "DISCOUNT10",
      discount: "10%", // Tỷ lệ giảm
      minimumOrder: "200000", // Giá trị đơn hàng tối thiểu
      expiry: "2024-12-31",
      total: 100,
      collected: 45,
      maxDiscount: "20000", // Giảm tối đa là 20000
    },
    {
      id: 2,
      code: "FREESHIP",
      discount: "Miễn phí vận chuyển", // Miễn phí vận chuyển thay thế % giảm
      minimumOrder: "300000",
      expiry: "2024-10-15",
      total: 200,
      collected: 120,
      maxDiscount: null, // Không có giảm tối đa
    },
    // {
    //   id: 3,
    //   code: "WELCOME50",
    //   discount: "50%", // Giá trị giảm trực tiếp
    //   minimumOrder: "500000",
    //   expiry: "2025-09-30",
    //   total: 50,
    //   collected: 10,
    //   maxDiscount: null, // Không có giảm tối đa
    // },
    // {
    //   id: 4,
    //   code: "SAVE20",
    //   discount: "20%", // Tỷ lệ giảm
    //   minimumOrder: "1000000", // Giá trị đơn hàng tối thiểu
    //   expiry: "2025-12-01",
    //   total: 150,
    //   collected: 60,
    //   maxDiscount: "100000", // Giảm tối đa là 100k
    // },
  ]);

  // Lọc các voucher còn hạn và chưa sử dụng hết
  const today = new Date();
  const validVouchers = vouchers.filter(
    (voucher) =>
      new Date(voucher.expiry) > today && voucher.collected < voucher.total
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
        Kho Vouchers
      </h2>

      {validVouchers.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-gray-600 text-sm font-medium italic mb-4">
            Không có voucher nào còn hiệu lực hoặc đã hết số lượng.
          </p>
          <Link to="/">
            <Button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-all">
              Thu thập ngay
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {validVouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoucherManagement;
