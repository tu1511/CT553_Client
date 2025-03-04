import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { formatDate } from "@helpers/FormatDate";
import couponService from "@services/coupon.service";
import { Button, Progress } from "antd";
import { Gift } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VoucherCard = ({ voucher, checkCollected }) => {
  // Đảm bảo tránh lỗi nếu voucher.currentUse hoặc voucher.quantity không tồn tại
  const percentageUsed =
    voucher?.currentUse && voucher?.quantity
      ? Math.round((voucher.currentUse / voucher.quantity) * 100)
      : 0;
  const accessToken = localStorage.getItem("accessToken");

  const handleCollectCoupon = async (couponCode) => {
    try {
      await couponService.collectCoupon(accessToken, couponCode);
      toast.success("Thu thập voucher thành công!");
    } catch (error) {
      console.error(error.data?.message);
      if (error.data?.message === "Coupon already collected") {
        toast.warn("Bạn đã thu thập coupon này rồi!");
      }
    }
  };

  // Chọn màu dựa trên phần trăm đã sử dụng
  const progressColor =
    percentageUsed >= 75
      ? "#f5222d"
      : percentageUsed >= 50
      ? "#faad14"
      : "#52c41a";

  return (
    <div className="bg-white border border-primary rounded-lg p-6 flex flex-col justify-between transition-all hover:translate-y-[-2px] hover:shadow-2xl">
      {/* Header: Mã Voucher và Hạn sử dụng */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Gift className="text-3xl text-primary" />
          <h3 className="text-xl font-semibold text-primary">
            Mã: {voucher?.code || "N/A"}
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            Hạn sử dụng:{" "}
            <span className="text-gray-800 font-medium">
              {voucher?.endDate
                ? formatDate(voucher.endDate)
                : "Không xác định"}
            </span>
          </p>
        </div>
      </div>

      {/* Thông tin giảm giá và giá trị đơn hàng tối thiểu */}
      <div className="space-y-2 mb-2">
        {voucher?.discountValue && (
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Giảm giá{" "}
            <span className="text-primary">{voucher.discountValue}%</span>{" "}
            {voucher?.minimumPriceToUse != null && (
              <span className="text-black">
                tối thiểu{" "}
                <span className="text-primary">
                  ({toVietnamCurrencyFormat(voucher.minimumPriceToUse)})
                </span>
              </span>
            )}
          </p>
        )}

        {voucher?.minimumPriceToUse != null && (
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Áp dụng giảm cho đơn hàng tối thiểu{" "}
            <span className="text-primary">
              {toVietnamCurrencyFormat(voucher.minimumPriceToUse)}
            </span>
          </p>
        )}
      </div>

      {/* Thanh tiến trình & số lượng đã sử dụng */}
      <div className="space-y-2 ">
        <Progress
          percent={percentageUsed}
          status="active"
          strokeColor={progressColor}
          showInfo={false}
        />
        <div className="flex items-center justify-between ">
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Đã sử dụng: <span className="text-primary">{percentageUsed}%</span>
          </p>
          {checkCollected ? (
            <p className="font-medium text-sm md:text-base text-white border bg-primary rounded-full px-4 py-1">
              Đã thu thập
            </p>
          ) : (
            <Button
              type="primary"
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
              onClick={() => handleCollectCoupon(voucher.code)}
            >
              Thu thập ngay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
