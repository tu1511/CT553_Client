import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { formatDate } from "@helpers/FormatDate";
import { Progress } from "antd";
import { Gift } from "lucide-react";

const VoucherCard = ({ voucher }) => {
  // Tính phần trăm đã sử dụng
  const percentageUsed = Math.round((voucher.collected / voucher.total) * 100);

  // Chọn màu cho thanh tiến trình dựa trên % sử dụng
  const progressColor =
    percentageUsed >= 75
      ? "#f5222d"
      : percentageUsed >= 50
      ? "#faad14"
      : "#52c41a";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-all hover:scale-105 hover:shadow-2xl">
      {/* Phần đầu: Mã Voucher và Hạn sử dụng */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Gift className="text-3xl text-primary" />
          <h3 className="text-xl font-semibold text-primary">
            Mã: {voucher?.code}
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            Hạn sử dụng:{" "}
            <span className="text-gray-800 font-medium">
              {formatDate(voucher.expiry)}
            </span>
          </p>
        </div>
      </div>

      {/* Thông tin giảm giá và giá trị đơn hàng tối thiểu */}
      <div className="space-y-2 mb-4">
        {voucher.discount && (
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Giảm giá <span className="text-primary">{voucher.discount}</span>{" "}
            {voucher.maxDiscount && voucher.maxDiscount !== null && (
              <span className="text-black">
                tối đa{" "}
                <span className="text-primary">
                  ({toVietnamCurrencyFormat(voucher?.maxDiscount)})
                </span>
              </span>
            )}
          </p>
        )}

        {voucher.minimumOrder && (
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Áp dụng giảm cho đơn hàng tối thiểu{" "}
            <span className="text-primary">
              {toVietnamCurrencyFormat(voucher?.minimumOrder)}
            </span>
          </p>
        )}
      </div>

      {/* Thanh tiến trình và thông tin đã sử dụng */}
      <div className="space-y-1">
        <Progress
          percent={percentageUsed}
          status="active"
          strokeColor={progressColor}
          showInfo={false}
        />
        <p className="text-gray-700 font-medium text-sm md:text-base">
          Đã sử dụng: <span className="text-primary">{percentageUsed}%</span>
        </p>
      </div>
    </div>
  );
};

export default VoucherCard;
