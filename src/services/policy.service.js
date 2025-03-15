import createApiClient from "@services/api.service";

class policyService {
  constructor(path = "/policy") {
    this.api = createApiClient(path);
  }

  // Get all categorys
  async getAll(accessToken) {
    const response = await this.api.get("/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  // get one by slug
  async getOneBySlug(slug) {
    const response = await this.api.get(`/slug/${slug}`, {
      params: {
        slug,
      },
    });
    return response.data;
  }
}

export default new policyService();
