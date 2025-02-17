import createApiClient from "@services/api.service";

class ProductService {
  constructor(path = "/shippings") {
    this.api = createApiClient(path);
  }

  async getFee({ toDistrictId, toWardCode, weightInGram }) {
    const data = {
      toDistrictId,
      toWardCode,
      weightInGram,
    };

    const response = await this.api.post("/fee", data);
    return response.data; // Trả về dữ liệu nhận được từ API
  }
}

export default new ProductService();
