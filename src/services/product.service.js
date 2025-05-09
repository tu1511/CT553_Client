import createApiClient from "@services/api.service";

class productService {
  constructor(path = "/product") {
    this.api = createApiClient(path);
  }

  // Get all products
  async getAll({
    type,
    limit = 8,
    page,
    categoryIds = [],
    filterMinPrice,
    filterMaxPrice,
  } = {}) {
    const response = await this.api.get("/", {
      params: {
        type, // Bắt buộc (nếu thiếu sẽ bị lỗi "Product query type is missing!")
        limit, // Bắt buộc là số
        page,
        categoryIds,
        filterMinPrice,
        filterMaxPrice,
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

  // search product by text
  async search({ search }) {
    const response = await this.api.get("/search", {
      params: {
        search,
      },
    });
    return response.data;
  }

  // search product by image
  async searchImage({ imageUrl }) {
    const response = await this.api.get("/search/image", {
      params: {
        imageUrl,
      },
    });
    return response.data;
  }

  // get recommended products
  async getRecommended({ accessToken }) {
    const response = await this.api.get("/recommend", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}

export default new productService();
