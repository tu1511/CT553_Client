import { useEffect, useState } from "react";
import { Modal, List, Radio, Button } from "antd";
import { Ticket } from "lucide-react";
import couponService from "@services/coupon.service";
import { toVietnamCurrencyFormat } from "@helpers/ConvertCurrency";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CouponModal = ({ visible, onClose, onSelectCoupon, totalPrice }) => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponService.getCollected(accessToken);
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

  const handleOk = () => {
    if (!selectedCoupon) {
      toast.warning("Vui lòng chọn một mã giảm giá!");
      return;
    }

    const selectedData = coupons.find(
      (coupon) => coupon.coupon.id === selectedCoupon
    );

    if (!selectedData) {
      toast.error("Không tìm thấy mã giảm giá!");
      return;
    }

    const minimumRequired = selectedData.coupon.minimumPriceToUse;

    if (totalPrice < minimumRequired) {
      toast.warning(
        `Đơn hàng cần tối thiểu ${toVietnamCurrencyFormat(
          minimumRequired
        )} để sử dụng mã này!`
      );
      return;
    }

    onSelectCoupon(selectedData);
    onClose();
  };

  return (
    <Modal
      title={
        <span className="flex items-center gap-2 text-primary">
          <Ticket size={20} /> Chọn mã giảm giá
        </span>
      }
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Chọn"
      cancelText="Hủy"
      width={500}
    >
      <Radio.Group
        className="w-full"
        value={selectedCoupon}
        onChange={(e) => setSelectedCoupon(e.target.value)}
      >
        {Array.isArray(coupons) && coupons.length > 0 ? (
          <List
            dataSource={coupons}
            renderItem={(coupon) => (
              <List.Item>
                <Radio value={coupon.coupon.id} className="w-full">
                  <div className="w-[400px] border border-primary p-4 rounded-lg">
                    <div className="font-semibold">
                      Mã: {coupon.coupon.code}{" "}
                    </div>
                    <div className="italic text-gray-500">
                      Giảm {coupon.coupon.discountValue}% cho đơn hàng tối thiểu{" "}
                      {toVietnamCurrencyFormat(coupon.coupon.minimumPriceToUse)}
                    </div>
                  </div>
                </Radio>
              </List.Item>
            )}
          />
        ) : (
          <div className="text-center mt-4 text-gray-500 italic">
            <Button
              type="primary"
              style={{
                backgroundColor: "#c60018",
                borderColor: "#ffffff",
                color: "white",
              }}
              onClick={() => navigate("/")}
            >
              Thu thập ngay
            </Button>
          </div>
        )}
      </Radio.Group>
    </Modal>
  );
};

export default CouponModal;
