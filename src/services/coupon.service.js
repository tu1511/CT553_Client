import createApiClient from "@services/api.service";

class CouponService {
  constructor(path = "/coupon") {
    this.api = createApiClient(path);
  }

  // get all coupons
  async getAll() {
    const response = await this.api.get("/valid", {});
    return response.data;
  }

  // get collection of coupons
  async getCollected(accessToken) {
    const response = await this.api.get("/collected", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async collectCoupon(accessToken, couponCode) {
    const response = await this.api.post(
      "/collect",
      { couponCode },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
}

export default new CouponService();
