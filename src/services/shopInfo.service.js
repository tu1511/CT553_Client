import createApiClient from "@services/api.service";

class shopInfoService {
  constructor(path = "/shopInfo") {
    this.api = createApiClient(path);
  }

  // Get all categorys
  async getInfo() {
    const response = await this.api.get("/", {});
    return response.data;
  }

  //   create shopInfo
  async create(accessToken, data) {
    const response = await this.api.post("/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  //update shopInfo
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

  //delete shopInfo
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

export default new shopInfoService();
