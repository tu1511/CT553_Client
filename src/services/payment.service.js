import createApiClient from "@services/api.service";

class PaymentService {
  constructor(path = "/payments") {
    this.api = createApiClient(path);
  }

  async getPaymentMethods() {
    const response = await this.api.get("/methods");
    return response.data;
  }
}

export default new PaymentService();
