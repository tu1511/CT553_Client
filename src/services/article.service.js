import createApiClient from "@services/api.service";

class articleService {
  constructor(path = "/article") {
    this.api = createApiClient(path);
  }

  // Get all categorys
  async getAll() {
    const response = await this.api.get("/", {});
    return response.data;
  }

  //   get one by slug
  async getOne(slug) {
    const response = await this.api.get(`/${slug}`, {});
    return response.data;
  }
}

export default new articleService();
