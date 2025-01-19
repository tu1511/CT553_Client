import createApiClient from "@services/api.service";

class categoryService {
  constructor(path = "/category") {
    this.api = createApiClient(path);
  }

  // Get all categorys
  async getAll({ accessToken } = {}) {
    const response = await this.api.get("/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  //get one by slug
  //   async getOneBySlug({ accessToken, slug }) {
  //     const response = await this.api.get(`/slug/${slug}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     return response.data;
  //   }
}

export default new categoryService();
