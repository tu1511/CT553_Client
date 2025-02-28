import createApiClient from "@services/api.service";

class productService {
  constructor(path = "/product") {
    this.api = createApiClient(path);
  }

  // Get all products
  async getAll({ type, limit = 8, page, categoryIds = [] } = {}) {
    const response = await this.api.get("/", {
      params: {
        type, // Bắt buộc (nếu thiếu sẽ bị lỗi "Product query type is missing!")
        limit, // Bắt buộc là số
        page,
        categoryIds,
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

  // search product
  async search({ search }) {
    const response = await this.api.get("/search", {
      params: {
        search,
      },
    });
    return response.data;
  }
}

export default new productService();
