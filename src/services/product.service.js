import createApiClient from "@services/api.service";

class productService {
  constructor(path = "/product") {
    this.api = createApiClient(path);
  }

  // Get all products
  async getAll({ accessToken, type, limit = 8, categoryIds = [] } = {}) {
    const response = await this.api.get("/", {
      params: {
        type, // Bắt buộc (nếu thiếu sẽ bị lỗi "Product query type is missing!")
        limit, // Bắt buộc là số
        categoryIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  //get one by slug
  async getOneBySlug({ accessToken, slug }) {
    const response = await this.api.get(`/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}

export default new productService();
