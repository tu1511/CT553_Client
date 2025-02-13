import createApiClient from "@services/api.service";

class addressService {
  constructor(path = "/address") {
    this.api = createApiClient(path);
  }

  // Get all addresss
  async getAll({ accessToken } = {}) {
    const response = await this.api.get("/current-account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  // get provinces
  async getProvinces() {
    const response = await this.api.get("/provinces");
    return response.data;
  }

  // get districts
  async getDistricts(provinceId) {
    const response = await this.api.get("/districts", {
      params: {
        provinceId: provinceId,
      },
    });
    return response.data;
  }

  // get wards
  async getWards(districtId) {
    const response = await this.api.get("/wards", {
      params: {
        districtId: districtId,
      },
    });
    return response.data;
  }

  // Create address
  async createAddress(address, accessToken) {
    const response = await this.api.post("/", address, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}

export default new addressService();
