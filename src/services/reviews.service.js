import createApiClient from "@services/api.service";

class reviewService {
  constructor(path = "/review") {
    this.api = createApiClient(path);
  }

  //   create review
  async createReview(accessToken, data) {
    const response = await this.api.post("/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  //   get by id product
  async getReviewByProductId(productId) {
    const response = await this.api.get(`/${productId}`, {
      params: {
        productId,
      },
    });

    return response.data;
  }

  async getTopReviews() {
    const response = await this.api.get("/top");

    return response.data;
  }
}

export default new reviewService();
