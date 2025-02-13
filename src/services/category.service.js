import createApiClient from "@services/api.service";

class categoryService {
  constructor(path = "/category") {
    this.api = createApiClient(path);
  }

  // Get all categorys
  async getAll() {
    const response = await this.api.get("/", {});
    return response.data;
  }

  // get one by slug
  async getOneBySlug({ slug }) {
    const response = await this.api.get(`/${slug}`, {});
    return response.data;
  }

  // get breadcrumb from category
  async getBreadcrumbFromCategory(fromCategoryId) {
    const response = await this.api.get("/breadcrumb", {
      params: {
        fromCategoryId,
      },
    });
    return response.data;
  }
}

export default new categoryService();
