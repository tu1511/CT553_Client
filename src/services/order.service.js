import createApiClient from "@services/api.service";

class OrderService {
  constructor(path = "/order") {
    this.api = createApiClient(path);
  }

  //  create order
  async createOrder(accessToken, data) {
    try {
      const response = await this.api.post("/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  // get order by buyid
  async getOrderByBuyId(accessToken, orderStatusId, limit) {
    try {
      const response = await this.api.get("/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          orderStatusId,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting order by buyId:", error);
    }
  }

  // get order by id
  async getOrderById(accessToken, orderId) {
    try {
      const response = await this.api.get(`customer/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting order by id:", error);
    }
  }
}

export default new OrderService();
