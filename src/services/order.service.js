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
}

export default new OrderService();
