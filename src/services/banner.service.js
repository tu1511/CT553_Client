import createApiClient from "@services/api.service";

class bannerService {
  constructor(path = "/banner") {
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

  // Get banner admin
  async getAdmin(accessToken) {
    const response = await this.api.get("/admin", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  //   create banner
  async create(accessToken, data) {
    const response = await this.api.post("/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  //update banner
  async update(accessToken, id, data) {
    const response = await this.api.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        id,
      },
    });
    return response.data;
  }

  //delete banner
  async delete(accessToken, bannerId) {
    const response = await this.api.delete(`/${bannerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        bannerId,
      },
    });
    return response.data;
  }
}

export default new bannerService();
